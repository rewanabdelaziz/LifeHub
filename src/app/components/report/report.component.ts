import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { LanguageService } from 'src/app/services/language.service';

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
  currentLanguage:string='';
  constructor(private http: HttpClient,
    private languageService: LanguageService
  ) {}

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
            console.log(response);

            if(this.applyArabicClass()){
              if(response=="Positive outcome for patient test (likely to have the disease)"){
                this.result="نتيجة ايجابية (لديك مشكلة يرجى مراجعة الطبيب)"
              }else if(response== "Negative outcome for patient test (unlikely to have the disease)"){
                this.result='نتيجة سلبية (ليس لديك أمراض)'
              }
            }else{
              this.result = response.result;
            }
          },
          (error) => {
            console.error('Error uploading image:', error);
            if(this.applyArabicClass()){
              this.result="مشكلة في رفع الملف حاول مره أخرى"
            }else{
              this.result = 'Error uploading image: ' + error.message;
            }

          }
        );
      };
      reader.readAsDataURL(this.selectedFile);
    } else {
      if(this.applyArabicClass()){
        this.result='لم يتم اختيار ملف'
      }else{
        this.result = 'No file selected';
      }

    }
  }

  ngOnInit(): void {
    // language
  this.languageService.currentLanguage$.subscribe(language => {
    this.currentLanguage=language;
    console.log('Current language:', this.currentLanguage);
  });
  }

  switchLanguage(language: string) {
    this.languageService.setLanguage(language);
    console.log(this.applyArabicClass());
  }
  applyArabicClass(): boolean {
    return this.currentLanguage === 'ar';
  }
}
