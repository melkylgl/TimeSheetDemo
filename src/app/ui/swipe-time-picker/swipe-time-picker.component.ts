import { Component, OnInit, HostListener } from '@angular/core';
import Logger from 'src/app/Utility/Utility';
import { SwipeButtonEvent } from 'src/app/services/model';


@Component({
  selector: 'app-swipe-time-picker',
  templateUrl: './swipe-time-picker.component.html',
  styleUrls: ['./swipe-time-picker.component.css']
})
export class SwipeTimePickerComponent implements OnInit {

  _VOID_VALUE = 'void_value';

  selectedDigit: string;
  digitH1: string;
  digitH2: string;
  digitS1: string;
  digitS2: string;

  constructor() {
    this.selectedDigit = this._VOID_VALUE;
    this.digitH1 = '0';
    this.digitH2 = '0';
    this.digitS1 = '0';
    this.digitS2 = '0';
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

  @HostListener('mouseleave')
  onMouseLeave() {
    Logger.logDebug('SwipeTimePickerComponent - onMouseLeave ');
    this.selectedDigit = this._VOID_VALUE;
  }

  swipeButtonEvent(event: SwipeButtonEvent) {
    Logger.logDebug('SwipeTimePickerComponent - swipeButtonEvent - selectDigit:' + this.selectedDigit);
    Logger.logDebug('SwipeTimePickerComponent - swipeButtonEvent - event:' + JSON.stringify(event));

    switch (this.selectedDigit) {
      case 'H1': this.digitH1 = event.info; break;
      case 'H2': this.digitH2 = event.info; break;
      case 's1': this.digitS1 = event.info; break;
      case 's2': this.digitS2 = event.info; break;
      default  :
        Logger.logError(' SwipeTimePickerComponent - swipeButtonEvent - error: selectedDigit not found.');
        break;
    }

  }

}
