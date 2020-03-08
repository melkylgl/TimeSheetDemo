import { Component, OnInit, HostBinding, HostListener, Output, EventEmitter } from '@angular/core';
import Logger from 'src/app/Utility/Utility';
import { FlybuttonEvent } from 'src/app/services/model';

@Component({
  selector: 'app-flybutton',
  templateUrl: './flybutton.component.html',
  styleUrls: ['./flybutton.component.css']
})
export class FlybuttonComponent implements OnInit {

  isOver: boolean;
  isOverCommit: boolean;
  isCommit: boolean;

  @Output() outflybutton: EventEmitter<any>     = new EventEmitter<any>();

  constructor() {
    this.isOver       = false;
    this.isOverCommit = false;
    this.isCommit     = false;
  }

  ngOnInit() {
  }

  // @HostListener('mouseover') onMouseOver() {
  //   this.isOver = !this.isOver;
  // }
  @HostListener('mouseenter') onMouseEnter() {
    Logger.logInfo('FlybuttonComponent - onMouseEnter');
    this.isOver = true;
  }
  @HostListener('mouseleave') onMouseLeave() {
    Logger.logInfo('FlybuttonComponent - onMouseLeave');
    this.isOver = false;
    this.isCommit = false;
  }

  // confirmCommit() {
  //   Logger.logInfo('FlybuttonInnerComponent - onMouseLeave');
  //   this.outflybutton.emit();
  // }
  // cancelCommit() {
  //   Logger.logInfo('FlybuttonInnerComponent - onMouseLeave');
  // }

  flybutton(event: FlybuttonEvent) {
    Logger.logInfo('FlybuttonComponent - flybutton - event: ' + JSON.stringify(event));
    this.outflybutton.emit();
  }

  flybuttoEnter(type: string) {
    this.isOverCommit = type === 'COMMIT';
  }

}
