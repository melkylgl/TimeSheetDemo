import { Component, OnInit, HostListener, Output, EventEmitter, Input } from '@angular/core';
import Logger, { FlybuttonEventUty } from 'src/app/Utility/Utility';
import { FlybuttonEvent, FlybuttonEventType, NotifyType } from 'src/app/services/model';
import { FlybuttonComponent } from '../flybutton/flybutton.component';

@Component({
  selector: 'app-flybutton-inner',
  templateUrl: './flybutton-inner.component.html',
  styleUrls: ['./flybutton-inner.component.css']
})
export class FlybuttonInnerComponent implements OnInit {

  @Input()  buttonLabel: string;
  @Input()  confirmLabel: string;
  @Input()  cancelLabel: string;
  @Output() outflybuttonNotify: EventEmitter<FlybuttonEvent>;
  @Output() outflybuttonEvent: EventEmitter<FlybuttonEvent>;

  isOverInner: boolean;
  isCommit: boolean;

  constructor() {
    this.isCommit = false;
    this.isOverInner = false;
    this.outflybuttonEvent  = new EventEmitter<FlybuttonEvent>();
    this.outflybuttonNotify = new EventEmitter<FlybuttonEvent>();
  }

  ngOnInit() {
    Logger.logDebug('FlybuttonInnerComponent - ngOnInit - confirmLabel: ' + this.confirmLabel);
    Logger.logDebug('FlybuttonInnerComponent - ngOnInit - cancelLabel: ' + this.cancelLabel);
  }

  @HostListener('mouseenter')
  onMouseEnter(type: string) {
    Logger.logDebug('FlybuttonInnerComponent - onMouseEnter - eventType - value: ' + type);
    this.isOverInner = true;
    this.isCommit = false;
    const flyButtonType = FlybuttonEventUty.getFlybuttonEventBy(type);
    this.outflybuttonNotify.emit({ event: flyButtonType });
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    Logger.logDebug('FlybuttonInnerComponent - onMouseLeave');
    if (this.isCommit) {
      Logger.logDebug('FlybuttonInnerComponent - isCommit');
      this.outflybuttonEvent.emit({ event: FlybuttonEventType.COMMIT });
    }
    this.isOverInner = false;
  }

  flyInnerButtonEvent(type: string) {
    Logger.logDebug('FlybuttonInnerComponent - flybuttonEvent - eventType - value: ' + type);
    const val = FlybuttonEventUty.findFlybuttonEventBy(type);
    this.isCommit = FlybuttonEventUty.isCommitByString(val);
    const flyButtonType = FlybuttonEventUty.getFlybuttonEventBy(val);
    this.outflybuttonNotify.emit({ event: flyButtonType });
  }

}
