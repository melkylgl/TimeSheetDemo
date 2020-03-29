import { Component, OnInit, Input, Output, EventEmitter, HostListener } from '@angular/core';
import { SwipeButtonInnerEvent, SwipeButtonInnerNotify } from 'src/app/services/model';
import Logger from 'src/app/Utility/Utility';

@Component({
  selector: 'app-swipe-button-inner',
  templateUrl: './swipe-button-inner.component.html',
  styleUrls: ['./swipe-button-inner.component.css']
})
export class SwipeButtonInnerComponent implements OnInit {

    @Input()  buttonLabel: string;
    @Input()  selectLabel: string;
    @Input()  confirmLabel: string;
    @Input()  cancelLabel: string;
    @Output() outInnerEvent: EventEmitter<SwipeButtonInnerEvent> = new EventEmitter<SwipeButtonInnerEvent>();
    @Output() outInnerNotify: EventEmitter<SwipeButtonInnerNotify> = new EventEmitter<SwipeButtonInnerNotify>();

    isOverInner: boolean;
    isCommit: boolean;

    constructor() {
      this.isCommit = false;
      this.isOverInner = false;
    }

    ngOnInit() {
      if(!this.confirmLabel) this.confirmLabel  = "Conferma";
      if(!this.selectLabel) this.selectLabel    = "Seleziona";
      if(!this.cancelLabel) this.cancelLabel    = "Annulla";
    }

    wichButton(type: string) {
      this.isCommit = type === 'COMMIT';
      this.outInnerNotify.emit(new SwipeButtonInnerNotify(type));
    }

    confirmButton() {
        Logger.logDebug('FlybuttonInnerComponent - onMouseLeave');
        if (this.isCommit) {
          Logger.logDebug('FlybuttonInnerComponent - isCommit');
          this.outInnerEvent.emit(new SwipeButtonInnerEvent('COMMIT'));
        }
        this.isOverInner = false;
    }

    notify(type: string) {
      Logger.logDebug('FlybuttonInnerComponent - notify - eventType - value: ' + type);
      this.isCommit = type === 'COMMIT';
      this.outInnerNotify.emit(new SwipeButtonInnerNotify(type));
    }

  }

