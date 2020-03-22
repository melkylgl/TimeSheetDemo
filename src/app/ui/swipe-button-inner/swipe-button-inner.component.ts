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
    @Input()  confirmLabel: string;
    @Input()  cancelLabel: string;
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

