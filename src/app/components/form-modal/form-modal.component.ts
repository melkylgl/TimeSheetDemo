import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
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

  constructor(public activeModal: NgbActiveModal,
              private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.myForm = this.formBuilder.group({
      entrance: this.workday.entrance,
      exit    : this.workday.exit,
      workable: this.workday.workable
    });
  }

  submitForm() {
    Logger.logInfo('FormModalComponent - submitForm - form.value' + JSON.stringify(this.myForm.value));
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
