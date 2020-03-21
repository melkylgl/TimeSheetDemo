import { Component, OnInit, HostListener } from '@angular/core';
import Logger from 'src/app/Utility/Utility';


@Component({
  selector: 'app-swipe-time-picker',
  templateUrl: './swipe-time-picker.component.html',
  styleUrls: ['./swipe-time-picker.component.css']
})
export class SwipeTimePickerComponent implements OnInit {

  _VOID_VALUE = 'void_value';

  selectedDigit: string;

  constructor() {
    this.selectedDigit = this._VOID_VALUE;
  }

  ngOnInit() {
  }

  selectDigit(digit: string) {
    Logger.logDebug('SwipeTimePickerComponent - selectDigit - digit:' + digit);
    this.selectedDigit = digit;
    Logger.logDebug('SwipeTimePickerComponent - selectDigit - digit:' + this.selectedDigit);
  }

  deselectDigit(digit: string) {
    Logger.logDebug('SwipeTimePickerComponent - deselectDigit - digit:' + digit);
  }

  activeNumericBoard() {
    return this.selectedDigit !== this._VOID_VALUE;
  }

  @HostListener('mouseleave') onMouseLeave() {
    Logger.logDebug('SwipeTimePickerComponent - onMouseLeave ');
    this.selectedDigit = this._VOID_VALUE;
  }


}
