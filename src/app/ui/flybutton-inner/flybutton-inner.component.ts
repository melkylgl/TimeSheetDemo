import { Component, OnInit, HostListener, Output, EventEmitter } from '@angular/core';
import Logger from 'src/app/Utility/Utility';

@Component({
  selector: 'app-flybutton-inner',
  templateUrl: './flybutton-inner.component.html',
  styleUrls: ['./flybutton-inner.component.css']
})
export class FlybuttonInnerComponent implements OnInit {

  @Output() outflybutton: EventEmitter<any>     = new EventEmitter<any>();

  isOverInner: boolean;
  isCommit: boolean;

  constructor() {
    this.isOverInner = false;
    this.isCommit = false;
  }

  ngOnInit() {
  }

  @HostListener('mouseenter') onMouseEnter() {
    Logger.logInfo('FlybuttonInnerComponent - onMouseEnter');
    this.isOverInner = true;
    this.isCommit = false;
  }
  @HostListener('mouseleave') onMouseLeave() {
    Logger.logInfo('FlybuttonInnerComponent - onMouseLeave');
    if (this.isCommit) {
      Logger.logInfo('FlybuttonInnerComponent - isCommit');
      this.outflybutton.emit();
    }
    this.isOverInner = false;
  }

  confirmCommit() {
    Logger.logInfo('FlybuttonInnerComponent - onMouseLeave');
    this.isCommit = true;
  }
  cancelCommit() {
    Logger.logInfo('FlybuttonInnerComponent - onMouseLeave');
    this.isCommit = false;
  }

}
