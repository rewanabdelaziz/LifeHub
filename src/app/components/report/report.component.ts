import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-report',
  // standalone: true,
  // imports: [],
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent {
  selectedFile: File | null = null;
  result: string | null = null;
  imageUrl: string | null = null;

  constructor(private http: HttpClient) {}

  onFileChange(event: any) {
    const file = event.target.files[0];
    this.selectedFile = file ? file : null;
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imageUrl = e.target.result;
      };
      reader.readAsDataURL(file);
    } else {
      this.imageUrl = null;
    }
  }

  uploadImage() {
    if (this.selectedFile) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const base64Image = e.target.result.split(',')[1];
        const payload = { image: base64Image };

        this.http.post('http://localhost:5000/predict', payload).subscribe(
          (response: any) => {
            this.result = response.result;
          },
          (error) => {
            console.error('Error uploading image:', error);
            this.result = 'Error uploading image: ' + error.message;
          }
        );
      };
      reader.readAsDataURL(this.selectedFile);
    } else {
      this.result = 'No file selected';
    }
  }
}
