import { Component, ElementRef, OnInit, Type, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { FtrOf1Service } from 'src/app/services/ftr-of1-service/ftr-of1.service';
@Component({
  selector: 'app-ftr-of1-page',
  templateUrl: './ftr-of1-page.component.html',
  styleUrls: ['./ftr-of1-page.component.scss'],
})
export class FtrOf1PageComponent implements OnInit {
  @ViewChild('picker') picker!: ElementRef;
  @ViewChild('textInput') textInput!: ElementRef;

  updateTextInputValue() {
    const pickerValue = this.picker.nativeElement.value; // ดึงค่าจาก #picker
    this.textInput.nativeElement.value = pickerValue; // กำหนดค่าใน <input>
  }

  sectionOne: any;
  sectionTwo: any;

  @ViewChild('etcRadio') etcRadio!: ElementRef<HTMLInputElement>;
  @ViewChild('etcBudget') etcBudget!: ElementRef<HTMLInputElement>;
  @ViewChild('passRadio') passRadio!: ElementRef<HTMLInputElement>;

  @ViewChild('failRadio') failRadio!: ElementRef<HTMLInputElement>;
  @ViewChild('noResultRadio') noResultRadio!: ElementRef<HTMLInputElement>;
  @ViewChild('trainingRadio') trainingRadio!: ElementRef<HTMLInputElement>;
  @ViewChild('getResultRadio') getResultRadio!: ElementRef<HTMLInputElement>;
  @ViewChild('testRadio') testRadio!: ElementRef<HTMLInputElement>;
  @ViewChild('getCertificateRadio')
  getCertificateRadio!: ElementRef<HTMLInputElement>;

  @ViewChild('trainingDate') trainingDate!: ElementRef<HTMLInputElement>;
  @ViewChild('getResultDate') getResultDate!: ElementRef<HTMLInputElement>;
  @ViewChild('testDate') testDate!: ElementRef<HTMLInputElement>;
  @ViewChild('getCertificateDate')
  getCertificateDate!: ElementRef<HTMLInputElement>;

  startDate!: Date;
  endDate!: Date;
  showAlert: boolean = false;

  onTextareaClick() {
    this.etcRadio.nativeElement.checked = true;
  }

  onInputTextClick(typeResult: string) {
    if (typeResult === 'fail') {
      this.failRadio.nativeElement.checked = true;
    } else if (typeResult === 'noResult') {
      this.noResultRadio.nativeElement.checked = true;
    }
  }

  onDateClick(typeRadio: string) {
    if (typeRadio === 'training') {
      this.trainingRadio.nativeElement.checked = true;
      this.dateSelected(typeRadio);
      this.sectionOne
        .get('actionDate')
        .setValue(this.trainingDate.nativeElement.value);
    } else if (typeRadio === 'getResult') {
      this.getResultRadio.nativeElement.checked = true;
      this.dateSelected(typeRadio);
      this.sectionOne
        .get('actionDate')
        .setValue(this.getResultDate.nativeElement.value);
    } else if (typeRadio === 'test') {
      this.testRadio.nativeElement.checked = true;
      this.dateSelected(typeRadio);
      this.sectionOne
        .get('actionDate')
        .setValue(this.testDate.nativeElement.value);
    } else if (typeRadio === 'getCertificate') {
      this.getCertificateRadio.nativeElement.checked = true;
      this.dateSelected(typeRadio);
      this.sectionOne
        .get('actionDate')
        .setValue(this.getCertificateDate.nativeElement.value);
    }
  }

  dateSelected(action: String) {
    switch (action) {
      case 'training':
        this.getCertificateDate.nativeElement.value = '';
        this.getResultDate.nativeElement.value = '';
        this.testDate.nativeElement.value = '';
        break;
      case 'getResult':
        this.getCertificateDate.nativeElement.value = '';
        this.trainingDate.nativeElement.value = '';
        this.testDate.nativeElement.value = '';
        break;
      case 'test':
        this.getCertificateDate.nativeElement.value = '';
        this.trainingDate.nativeElement.value = '';
        this.getResultDate.nativeElement.value = '';
        break;
      case 'getCertificate':
        this.getResultDate.nativeElement.value = '';
        this.trainingDate.nativeElement.value = '';
        this.testDate.nativeElement.value = '';
        break;
    }
  }

  // sectionOne = new FormGroup({
  //   code: new FormControl('')
  // });

  constructor(private fb: FormBuilder, private ftrService: FtrOf1Service) {}

  ngOnInit(): void {
    (this.sectionOne = this.fb.group({
      deptCode: ['', Validators.required],
      dept: ['', Validators.required],
      date: [this.formatDate(new Date()), Validators.required],
      topic: ['Introduction to Spring Framework รุ่น 9', Validators.required],
      objt: ['พัฒนาทักษะด้าน Spring Framework', Validators.required],
      startDate: [this.formatDate(new Date()), Validators.required],
      endDate: [this.formatDate(new Date()), Validators.required],
      fee: ['0.00', Validators.required],
      company: ['บริษัท โปรเฟสชั่นนัล คอมพิวเตอร์ จำกัด', Validators.required],
      location: ['PCC3', Validators.required],
      budget: ['อยู่ในงบประมาณ'],
      empCode: ['', Validators.required],
      empName: ['ณิชธิตรา เมฆาพงศ์พันธุ์', Validators.required],
      empRole: ['Programmer', Validators.required],
      action: ['training'],
      actionDate: [''],
    })),
      (this.sectionTwo = this.fb.group({
        evaluatorName: ['', Validators.required],
        evaluatorRole: ['', Validators.required],
        evaluatorDept: ['', Validators.required],
        evaluatorSector: ['', Validators.required],
        resultOne: ['pass'],
        resultTwo: ['pass'],
        resultThree: ['pass'],
        resultFour: ['pass'],
        resultFive: ['pass'],
        resultSix: ['pass'],
        resultSeven: ['pass'],
        comment: [''],
        result: [''],
        cause: [''],
        plan: [''],
      }));
  }

  save() {
    this.RangeDateForMat()
    let Dataset = Object.assign(this.sectionOne.value,this.sectionTwo.value)
    
    this.ftrService.saveData(Dataset).subscribe(
      (response) => {
        console.log('บันทึกข้อมูลสำเร็จ:', response);
      },
      (error) => {
        console.error('เกิดข้อผิดพลาดในการบันทึกข้อมูล:', error);
      }
    );
    
    console.log(this.sectionOne.valid, this.sectionTwo.valid);
    console.log(this.sectionOne.value);
    console.log(this.sectionTwo.value);
    this.calculateResult();
  }

  // onSubmit(){
  //   console.log(this.sectionOne.value);
  // }

  formatDate(date: Date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // เพิ่ม 0 ถ้าเป็นเลขเดียว
    const day = String(date.getDate()).padStart(2, '0'); // เพิ่ม 0 ถ้าเป็นเลขเดียว
    return `${year}-${month}-${day}`;
  }

  onTextareaChange() {
    if (this.sectionOne.get('budget').value != 'อยู่ในงบประมาณ') {
      this.sectionOne
        .get('budget')
        .setValue(this.etcBudget.nativeElement.value);
    } else {
      this.sectionOne.get('budget').setValue('อยู่ในงบประมาณ');
    }
  }

  RangeDateForMat() {
    this.sectionOne.get('startDate').setValue(this.formatDate(this.startDate));
    this.sectionOne.get('endDate').setValue(this.formatDate(this.endDate));
  }

  onRadioChange() {
    this.showAlert = true;
  }

  onTextareaInput() {
    if (this.sectionOne.get('etcDetails')?.value) {
      this.showAlert = true;
    } else {
      this.showAlert = false;
    }
  }

  notPass: Boolean = false;
  calculateResult() {
    let radioLabel = ['One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven'];
    let pass = 0;
    for (let index = 0; index < radioLabel.length; index++) {
      if (this.sectionTwo.get('result' + radioLabel[index]).value === 'pass') {
        pass++;
      }
    }
    if (pass >= 4) {
      this.passRadio.nativeElement.disabled = false;
      this.sectionTwo.get('result').setValue('pass');
      this.notPass = false;
    } else {
      this.sectionTwo.get('result').setValue('fail');
      this.passRadio.nativeElement.disabled = true;
      this.notPass = true;
    }
  }

  onBudgetClick() {
    this.etcBudget.nativeElement.value = '';
  }
}
