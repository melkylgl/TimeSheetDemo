import { Component, OnInit, HostListener, Output, EventEmitter } from '@angular/core';
import Logger, { FlybuttonEventUty } from 'src/app/Utility/Utility';
import { FlybuttonEvent, FlybuttonEventType, NotifyType } from 'src/app/services/model';
import { FlybuttonComponent } from '../flybutton/flybutton.component';

@Component({
  selector: 'app-flybutton-inner',
  templateUrl: './flybutton-inner.component.html',
  styleUrls: ['./flybutton-inner.component.css']
})
export class FlybuttonInnerComponent implements OnInit {

  @Output() outflybuttonEvent: EventEmitter<FlybuttonEvent>;
  @Output() outflybuttonEnter: EventEmitter<string>;

  isOverInner: boolean;
  isCommit: boolean;

  constructor() {
    this.isCommit = false;
    this.isOverInner = false;
    this.outflybuttonEvent = new EventEmitter<FlybuttonEvent>();
    this.outflybuttonEnter = new EventEmitter<string>();
  }

  ngOnInit() {
  }

  @HostListener('mouseenter')
  onMouseEnter(type: string) {
    Logger.logInfo('FlybuttonInnerComponent - onMouseEnter - eventType - value: ' + type);
    this.isOverInner = true;
    this.isCommit = false;
    this.outflybuttonEnter.emit(type);
  }
  @HostListener('mouseleave')
  onMouseLeave() {
    Logger.logInfo('FlybuttonInnerComponent - onMouseLeave');
    if (this.isCommit) {
      Logger.logInfo('FlybuttonInnerComponent - isCommit');
      this.outflybuttonEvent.emit({ event: FlybuttonEventType.COMMIT });
    }
    this.isOverInner = false;
  }

  /**
   * 
   * @param type 
   */
  flybuttonEvent(type: string) {
    Logger.logInfo('FlybuttonInnerComponent - flybuttonEvent - eventType - value: ' + type);
    const val = FlybuttonEventUty.findFlybuttonEventBy(type);
    this.isCommit = val === 'COMMIT';
    this.outflybuttonEnter.emit(type);
  }

}
