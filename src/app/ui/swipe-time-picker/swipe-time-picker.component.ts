import { Component, OnInit, HostListener, ViewChild, ViewContainerRef, ComponentFactoryResolver,
         ComponentRef, AfterViewInit } from '@angular/core';
import Logger from 'src/app/Utility/Utility';
import { SwipeButtonEvent } from 'src/app/services/model';
import { StatusbarComponent } from 'src/app/components/statusbar/statusbar.component';
import * as moment from 'moment';
import { CONSTANTS } from 'src/app/constants/constants';


@Component({
  selector: 'app-swipe-time-picker',
  templateUrl: './swipe-time-picker.component.html',
  styleUrls: ['./swipe-time-picker.component.css']
})
export class SwipeTimePickerComponent implements OnInit, AfterViewInit {

  readonly _ADESSO = CONSTANTS._ADESSO;
  readonly _AZZERA = CONSTANTS._AZZERA;
  readonly _AGGIUNGI = CONSTANTS._AGGIUNGI;

  @ViewChild('errorbox', { read: ViewContainerRef }) errorbox: ViewContainerRef;

  errorboxRef: ComponentRef<StatusbarComponent>;

  selectedDigit: string;
  digitH1: string;
  digitH2: string;
  digitS1: string;
  digitS2: string;

  constructor(private factory: ComponentFactoryResolver) {
    this.resetSelectedDigit();
    this.setToNow();
  }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
  }

  private resetSelectedDigit() {
    this.selectedDigit = CONSTANTS._VOID_VALUE;
  }

  private setToNow() {
    const now = moment();
    this.setDigitByMoment(now);
    this.resetSelectedDigit();
  }
  private resetTime() {
    const now = moment();
    this.setDigitByString('00:00');
    this.resetSelectedDigit();
  }

  private setDigitByMoment(now: moment.Moment) {
    const str = now.format('HH:mm');
    this.setDigitByString(str);
  }
  private setDigitByString(str: string) {
    this.digitH1 = str.substring(0, 1);
    this.digitH2 = str.substring(1, 2);
    this.digitS1 = str.substring(3, 4);
    this.digitS2 = str.substring(4, 5);
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

  selectDigit(digit: string): string {
    this.selectedDigit = digit;
    return this.selectedDigit;
  }

  deselectDigit(digit: string) {
    Logger.logDebug('SwipeTimePickerComponent - deselectDigit - digit:' + digit);
  }

  activeNumericBoard() {
    return this.selectedDigit !== CONSTANTS._VOID_VALUE;
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    Logger.logDebug('SwipeTimePickerComponent - onMouseLeave ');
    this.resetSelectedDigit();
  }

  swipeButtonEvent(event: SwipeButtonEvent) {
    return this.executeActionBy(event.info);
  }

  private executeActionBy(selectedAction: string) {

    switch (selectedAction) {
      case CONSTANTS._ADESSO: {
        this.setToNow();
        return;
      }
      case CONSTANTS._AZZERA: {
        this.resetTime();
        return;
      }
      case CONSTANTS._ADD_ONE_HOUR: {
        this.addOneHour();
        return;
      }
      default: {
        Logger.logError(' SwipeTimePickerComponent - swipeButtonEvent - error: selectedDigit not found.');
        break;
      }
    }

    switch (this.selectedDigit) {
      case 'H1': {
        this.checkTimeInserted(selectedAction, this.digitH2, this.digitS1, this.digitS2);
        break;
      }
      case 'H2': {
        this.checkTimeInserted(this.digitH1, selectedAction, this.digitS1, this.digitS2);
        break;
      }
      case 's1': {
        this.checkTimeInserted(this.digitH1, this.digitH2, selectedAction, this.digitS2);
        break;
      }
      case 's2': {
        this.checkTimeInserted(this.digitH1, this.digitH2, this.digitS1, selectedAction);
        break;
      }
      default: {
        Logger.logError(' SwipeTimePickerComponent - swipeButtonEvent - error: selectedDigit not found.');
        break;
      }
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

  private addOneHour() {
    let date = this.convertToDate(this.digitH1, this.digitH2, this.digitS1, this.digitS2);
    if (date.isValid()) {
      date = date.add(1, 'h');
    }
    this.setDigitByMoment(date);
  }

  private convertToDate(h1: string, h2: string, s1: string, s2: string) {
    const value = `${h1}${h2}${s1}${s2}`;
    let date = moment(value, 'hmm');
    if (!date.isValid()) {
      date = null;
    }
    return date;
  }

  getNow(): Date {
    return new Date();
  }
  getType(): string {
    return 'alert alert-danger';
  }

}

