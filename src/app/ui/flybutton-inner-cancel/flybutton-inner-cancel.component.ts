import { Component, OnInit, Output, EventEmitter, HostListener, Input } from '@angular/core';
import Logger from 'src/app/Utility/Utility';

@Component({
  selector: 'app-flybutton-inner-cancel',
  templateUrl: './flybutton-inner-cancel.component.html',
  styleUrls: ['./flybutton-inner-cancel.component.css']
})
export class FlybuttonInnerCancelComponent implements OnInit {

  @Input() name: string;
  @Output() outflybuttonCancel: EventEmitter<any> = new EventEmitter<any>();

  isOverInnerCancel: boolean;

  constructor() {
    this.isOverInnerCancel = false;
  }

  ngOnInit() {
    Logger.logInfo('  FlybuttonInnerComponent - ngOnInit - name:' + this.name );
  }

  @HostListener('mouseenter') onMouseEnter() {
    Logger.logInfo('FlybuttonInnerComponent - onMouseEnter');
    this.isOverInnerCancel = true;
    this.outflybuttonCancel.emit();
  }
  @HostListener('mouseleave') onMouseLeave() {
    Logger.logInfo('FlybuttonInnerComponent - onMouseLeave');
    this.isOverInnerCancel = false;
  }


}
