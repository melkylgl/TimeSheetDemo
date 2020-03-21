import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal, NgbDateStruct, NgbCalendar, NgbTimeStruct } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, ReactiveFormsModule  } from '@angular/forms';
import { Workday } from 'src/app/services/model';
import Logger from 'src/app/Utility/Utility';

@Component({
  selector: 'app-form-modal',
  templateUrl: './form-modal.component.html',
  styleUrls: ['./form-modal.component.css']
})
export class FormModalComponent implements OnInit {

  @Input() workday: Workday;

  myForm: FormGroup;

  // Test.DatePicker
  model: NgbDateStruct;
  time: NgbTimeStruct = {hour: 13, minute: 30, second: 0};
  date: {year: number, month: number};

  constructor(public activeModal: NgbActiveModal,
              private formBuilder: FormBuilder,
              private calendar: NgbCalendar) {
  }

  ngOnInit() {
    this.model = this.calendar.getToday();
    this.myForm = this.formBuilder.group({
      entrance: this.workday.entrance,
      exit    : this.workday.exit,
      workable: this.workday.workable,
      datePickerTest: this.workday.exit
    });
  }

  selectToday(event) {
    Logger.logDebug('FormModalComponent - selectToday - event:' + JSON.stringify(event));
    this.model = this.calendar.getToday();
    event.stopPropagation();
    console.log('click inside input');
  }

  submitModalForm() {
    Logger.logInfo('FormModalComponent - submitForm - form.value' + JSON.stringify(this.myForm.value));
    Logger.logInfo('FormModalComponent - submitForm - model' + JSON.stringify(this.model));
    this.activeModal.close(this.myForm.value);
  }

  closeModal() {
    Logger.logInfo('Modal Closed');
    this.activeModal.close('Modal Closed');
  }

  echo(detail: Workday) {
    this.workday = detail;
    Logger.logInfo('FormModalComponent - Modal Echo: ' + this.workday.id);
  }
}
