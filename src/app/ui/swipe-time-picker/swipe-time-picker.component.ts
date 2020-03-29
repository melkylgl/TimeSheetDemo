import { Component, OnInit, HostListener, ViewChild, ViewContainerRef, ComponentFactoryResolver, ComponentRef, AfterViewInit } from '@angular/core';
import Logger from 'src/app/Utility/Utility';
import { SwipeButtonEvent } from 'src/app/services/model';
import { StatusbarComponent } from 'src/app/components/statusbar/statusbar.component';
import * as moment from 'moment';


@Component({
  selector: 'app-swipe-time-picker',
  templateUrl: './swipe-time-picker.component.html',
  styleUrls: ['./swipe-time-picker.component.css']
})
export class SwipeTimePickerComponent implements OnInit, AfterViewInit {

  _VOID_VALUE = 'void_value';

  @ViewChild('errorbox', { read: ViewContainerRef }) errorbox: ViewContainerRef;

  errorboxRef: ComponentRef<StatusbarComponent>;

  selectedDigit: string;
  digitH1: string;
  digitH2: string;
  digitS1: string;
  digitS2: string;

  constructor(private factory: ComponentFactoryResolver) {
    this.resetSelectedDigit();
    this.resetTime();
  }

  private resetSelectedDigit() {
    this.selectedDigit = this._VOID_VALUE;
  }

  private resetTime() {
    const now = moment();
    Logger.logDebug(' SwipeTimePickerComponent - resetTime - now:' + now.format('HH:ss'));
    const str = now.format('HH:mm');
    this.digitH1 = str.substring(0, 1);
    this.digitH2 = str.substring(1, 2);
    this.digitS1 = str.substring(3, 4);
    this.digitS2 = str.substring(4, 5);
  }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
  }

  private createErrorbox(errorMsg: string) {
    this.destroyErrorbox();
    const componentResolver = this.factory.resolveComponentFactory(StatusbarComponent);
    this.errorboxRef = this.errorbox.createComponent(componentResolver);
    this.errorboxRef.instance.date = this.getNow();
    this.errorboxRef.instance.type = this.getType();
    this.errorboxRef.instance.msg = errorMsg;
    this.errorboxRef.changeDetectorRef.detectChanges();
    setTimeout(() => this.destroyErrorbox(), 3000);
  }

  private destroyErrorbox(): void {
    if (this.errorboxRef) {
      this.errorboxRef.destroy();
      delete this.errorboxRef;
    }
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
    this.resetSelectedDigit();
  }

  swipeButtonEvent(event: SwipeButtonEvent) {
    Logger.logDebug('SwipeTimePickerComponent - swipeButtonEvent - selectDigit:' + this.selectedDigit);
    Logger.logDebug('SwipeTimePickerComponent - swipeButtonEvent - event:' + JSON.stringify(event));

    if(event.info === 'Azzera') {
      this.resetTime();
      return;
    }

    switch (this.selectedDigit) {
      case 'H1': this.checkTimeInserted(event.info, this.digitH2, this.digitS1, this.digitS2); break;
      case 'H2': this.checkTimeInserted(this.digitH1, event.info, this.digitS1, this.digitS2); break;
      case 's1': this.checkTimeInserted(this.digitH1, this.digitH2, event.info, this.digitS2); break;
      case 's2': this.checkTimeInserted(this.digitH1, this.digitH2, this.digitS1, event.info); break;
      default  :
        Logger.logError(' SwipeTimePickerComponent - swipeButtonEvent - error: selectedDigit not found.');
        break;
    }

  }

  private checkTimeInserted(h1: string, h2: string, s1: string, s2: string) {
    const value = `${h1}${h2}${s1}${s2}`;
    if (moment(value, 'hmm').isValid()) {
      this.digitH1 = h1;
      this.digitH2 = h2;
      this.digitS1 = s1;
      this.digitS2 = s2;
    } else {
      this.createErrorbox(`Attenzione data non valida: ${h1}${h2}:${s1}${s2}`);
    }
    this.resetSelectedDigit();
  }

  getNow(): Date {
    return new Date();
  }
  getType(): string {
    return 'alert alert-danger';
  }
}
