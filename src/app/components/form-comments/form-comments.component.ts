import { Component, OnInit, Input, HostListener } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Workday } from 'src/app/services/model';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import Logger from 'src/app/Utility/Utility';



@Component({
  selector: 'app-form-comments',
  templateUrl: './form-comments.component.html',
  styleUrls: ['./form-comments.component.css']
})
export class FormCommentsComponent implements OnInit {

  _COMPONENT_NAME = 'FormCommentsComponent';

  @Input() workday: Workday;
  commentForm: FormGroup;

  constructor(public activeModal: NgbActiveModal,
              private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.commentForm = this.formBuilder.group({
      newComment: ''
    });
  }

  @HostListener('window:keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent) {
    Logger.logInfo(this._COMPONENT_NAME + ' - handleKeyDown : ' + JSON.stringify(event));
  }
  @HostListener('click', ['$event'])
  onClick(btn) {
    Logger.logInfo(this._COMPONENT_NAME + ' - onClick -  : ' + JSON.stringify(btn));
 }

  submitForm() {
    Logger.logInfo(this._COMPONENT_NAME + ' - submitForm - form.value' + JSON.stringify(this.commentForm.value));
    this.activeModal.close(this.commentForm.value);
  }

  closeModal() {
    Logger.logInfo('Modal Closed');
    this.activeModal.close('Modal Closed');
  }

  echo(detail: Workday) {
    this.workday = detail;
    Logger.logInfo(this._COMPONENT_NAME + ' - Modal Echo: ' + this.workday.id);
  }

  remove (workday: Workday, index: number ) {
    Logger.logInfo(this._COMPONENT_NAME + ' - remove from workday: '
                 + this.workday._id + ' comment: '
                 + JSON.stringify(workday.comments[index]));

    workday.comments.splice(index, 1);
    this.workday = workday;

  }

}
