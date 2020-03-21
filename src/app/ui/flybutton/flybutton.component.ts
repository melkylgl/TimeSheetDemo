import { Component, OnInit, HostBinding, HostListener, Output, EventEmitter, Input } from '@angular/core';
import Logger, { FlybuttonEventUty, SwipeButtonUty } from 'src/app/Utility/Utility';
import { FlybuttonEvent, SwipeButtonEventType, SwipeButtonEvent, SwipeButtonInnerNotify, SwipeButtonInnerEvent } from 'src/app/services/model';

@Component({
  selector: 'app-flybutton',
  templateUrl: './flybutton.component.html',
  styleUrls: ['./flybutton.component.css']
})
export class FlybuttonComponent implements OnInit {

  isOver: boolean;
  isCommit: boolean;
  isOverCommit: boolean;

  @Input()  buttonLabel: string;
  @Input()  confirmLabel: string;
  @Input()  cancelLabel: string;

  // @Output() outflybutton: EventEmitter<any>     = new EventEmitter<any>();
  @Output() outSwipeButtonEvent: EventEmitter<SwipeButtonEvent> = new EventEmitter<SwipeButtonEvent>();

  constructor() {
    this.isOver       = false;
    this.isOverCommit = false;
    this.isCommit     = false;
  }

  ngOnInit() {
  }

  @HostListener('mouseenter') onMouseEnter() {
    Logger.logDebug('FlybuttonComponent - onMouseEnter');
    this.isOver = true;
  }

  @HostListener('mouseleave') onMouseLeave() {
    Logger.logDebug('FlybuttonComponent - onMouseLeave');
    this.isOver = false;
    this.isCommit = false;
  }

  // flyButtonNotify(event: FlybuttonEvent) {
  //   Logger.logDebug('FlybuttonComponent - flyButtonNotify - event: ' + JSON.stringify(event));
  //   this.isOverCommit = FlybuttonEventUty.isCommitByEvent(event.event);
  // }
  // flyButtonEvent(event: FlybuttonEvent) {
  //   Logger.logDebug('FlybuttonComponent - flyButtonEvent - event: ' + JSON.stringify(event));
  //   if (FlybuttonEventUty.isCommitByEvent(event.event)) {
  //     this.outflybutton.emit();
  //   }
  // }

  innerEvent(event: SwipeButtonInnerEvent) {
    Logger.logDebug('FlybuttonComponent - innerEvent - type: ' + event.type);
    this.outSwipeButtonEvent.emit(event);
  }

  innerNotify(event: SwipeButtonInnerNotify) {
    Logger.logDebug('FlybuttonComponent - innerNotify - event: ' + JSON.stringify(event));
    this.isOverCommit = event.type === 'COMMIT';
  }

}
