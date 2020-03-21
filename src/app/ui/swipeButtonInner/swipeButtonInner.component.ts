import { Component, OnInit, HostListener, Output, EventEmitter, Input } from '@angular/core';
import Logger, { FlybuttonEventUty, SwipeButtonUty } from 'src/app/Utility/Utility';
import { FlybuttonEvent, FlybuttonEventType, NotifyType, SwipeButtonInnerNotify, SwipeButtonInnerEvent } from 'src/app/services/model';
import { FlybuttonComponent } from '../flybutton/flybutton.component';

@Component({
  selector: 'app-swipe-button-inner',
  templateUrl: './swipeButtonInner.component.html',
  styleUrls: ['./swipeButtonInner.component.css']
})
export class SwipeButtonInnerComponent implements OnInit {

  @Input()  buttonLabel: string;
  @Input()  confirmLabel: string;
  @Input()  cancelLabel: string;

  // @Output() outflybuttonNotify: EventEmitter<FlybuttonEvent>;
  // @Output() outflybuttonEvent: EventEmitter<FlybuttonEvent>;

  @Output() outInnerEvent: EventEmitter<SwipeButtonInnerEvent> = new EventEmitter<SwipeButtonInnerEvent>();
  @Output() outInnerNotify: EventEmitter<SwipeButtonInnerNotify> = new EventEmitter<SwipeButtonInnerNotify>();

  isOverInner: boolean;
  isCommit: boolean;

  constructor() {
    this.isCommit = false;
    this.isOverInner = false;
    // this.outflybuttonEvent  = new EventEmitter<FlybuttonEvent>();
    // this.outflybuttonNotify = new EventEmitter<FlybuttonEvent>();
  }

  ngOnInit() {
  }

  // @HostListener('mouseenter')
  // onMouseEnter(action: string, type: string) {
  //   Logger.logDebug('FlybuttonInnerComponent - onMouseEnter - actionLabel - value: ' + action);
  //   Logger.logDebug('FlybuttonInnerComponent - onMouseEnter - eventType   - value: ' + type);
  //   this.isOverInner = true;
  //   this.isCommit = false;
  //   const flyButtonType = FlybuttonEventUty.getFlybuttonEventBy(type);
  //   this.outflybuttonNotify.emit({ event: flyButtonType });
  // }

  @HostListener('mouseleave')
  onMouseLeave() {
    Logger.logDebug('FlybuttonInnerComponent - onMouseLeave');
    if (this.isCommit) {
      Logger.logDebug('FlybuttonInnerComponent - isCommit');
      // this.outflybuttonEvent.emit({ event: FlybuttonEventType.COMMIT });
      this.outInnerEvent.emit(new SwipeButtonInnerEvent('COMMIT'));
    }
    this.isOverInner = false;
  }

  // flyInnerButtonEvent(type: string) {
  //   Logger.logDebug('FlybuttonInnerComponent - flybuttonEvent - eventType - value: ' + type);
  //   const val = FlybuttonEventUty.findFlybuttonEventBy(type);
  //   this.isCommit = FlybuttonEventUty.isCommitByString(val);
  //   const flyButtonType = FlybuttonEventUty.getFlybuttonEventBy(val);
  //   this.outflybuttonNotify.emit({ event: flyButtonType });
  // }

  wichButton(type: string) {
    this.isCommit = type === 'COMMIT';
    this.outInnerNotify.emit(new SwipeButtonInnerNotify(type));
  }
  notify(type: string) {
    Logger.logDebug('FlybuttonInnerComponent - notify - eventType - value: ' + type);
    this.isCommit = type === 'COMMIT';
    this.outInnerNotify.emit(new SwipeButtonInnerNotify(type));
  }

}
