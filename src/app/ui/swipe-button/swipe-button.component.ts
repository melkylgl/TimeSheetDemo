import { Component, OnInit, HostBinding, HostListener, Output, EventEmitter, Input } from '@angular/core';
import Logger, { FlybuttonEventUty, SwipeButtonUty } from 'src/app/Utility/Utility';
import { SwipeButtonInnerEvent, SwipeButtonInnerNotify, SwipeButtonEvent } from 'src/app/services/model';

@Component({
  selector: 'app-swipe-button',
  templateUrl: './swipe-button.component.html',
  styleUrls: ['./swipe-button.component.css']
})
export class SwipeButtonComponent implements OnInit {

  isOver: boolean;
  isCommit: boolean;
  isOverCommit: boolean;

  @Input()  buttonLabel: string;
  @Input()  confirmLabel: string;
  @Input()  cancelLabel: string;
  @Output() outSwipeButtonEvent: EventEmitter<SwipeButtonEvent>;

  constructor() {
    this.isOver       = false;
    this.isOverCommit = false;
    this.isCommit     = false;
    this.outSwipeButtonEvent = new EventEmitter<SwipeButtonEvent>();
  }

  ngOnInit() {
  }

  @HostListener('mouseenter') onMouseEnter() {
    Logger.logDebug('SwipeButtonComponent - onMouseEnter');
    this.isOver = true;
  }

  @HostListener('mouseleave') onMouseLeave() {
    Logger.logDebug('SwipeButtonComponent - onMouseLeave');
    this.isOver = false;
    this.isCommit = false;
  }

  innerEvent(event: SwipeButtonInnerEvent) {
    Logger.logDebug('SwipeButtonComponent - innerEvent - type: ' + event.type);
    const eventmsg = new SwipeButtonEvent(event.type);
    eventmsg.info = this.buttonLabel;
    this.outSwipeButtonEvent.emit(eventmsg);
  }

  innerNotify(event: SwipeButtonInnerNotify) {
    Logger.logDebug('SwipeButtonComponent - innerNotify - event: ' + JSON.stringify(event));
    this.isOverCommit = event.type === 'COMMIT';
  }

}
