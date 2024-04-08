import { Component } from '@angular/core';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
})
export class ServicesComponent {

  num1: Boolean = false;
  num2: Boolean = false;
  num3: Boolean = false;
  num4: Boolean = false;
  num5: Boolean = false;

  loginSuccess: Boolean = false;


  value = sessionStorage.getItem("token") !== null;


  constructor(){

  }


  onFileSelected(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const fileList: FileList | null = inputElement.files;

    if (fileList && fileList.length > 0) {
      const fileName = fileList[0].name;
      console.log("Selected file:", fileName);
      // You can perform further operations with the selected file here
    }
  }


  showService1() {
    this.num1 = true;
    this.num2 = false;
    this.num3 = false;
    this.num4 = false;
    this.num5 = false;
  }
  showService2() {
    this.num1 = false;
    this.num2 = true;
    this.num3 = false;
    this.num4 = false;
    this.num5 = false;
  }
  showService3() {
    this.num1 = false;
    this.num2 = false;
    this.num3 = true;
    this.num4 = false;
    this.num5 = false;
  }
  showService4() {
    this.num1 = false;
    this.num2 = false;
    this.num3 = false;
    this.num4 = true;
    this.num5 = false;
  }
  showService5() {
    this.num1 = false;
    this.num2 = false;
    this.num3 = false;
    this.num4 = false;
    this.num5 = true;
  }


}
