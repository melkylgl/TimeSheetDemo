import { Component, OnInit, HostBinding, HostListener, Output, EventEmitter } from '@angular/core';
import Logger from 'src/app/Utility/Utility';

@Component({
  selector: 'app-flybutton',
  templateUrl: './flybutton.component.html',
  styleUrls: ['./flybutton.component.css']
})
export class FlybuttonComponent implements OnInit {

  isOver: boolean;
  @Output() outflybutton: EventEmitter<any>     = new EventEmitter<any>();

  constructor() {
    this.isOver = false;
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
  }

  confirmCommit() {
    Logger.logInfo('FlybuttonInnerComponent - onMouseLeave');
    this.outflybutton.emit();
  }
  cancelCommit() {
    Logger.logInfo('FlybuttonInnerComponent - onMouseLeave');
  }

  flybutton() {
    Logger.logInfo('FlybuttonComponent - flybutton');
    this.outflybutton.emit();
  }

}
