import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { Workday, Notify, NotifyType } from 'src/app/services/model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Logger, { DateUty } from 'src/app/Utility/Utility';
import * as moment from 'moment';
import { FormModalComponent } from '../form-modal/form-modal.component';
import { FormCommentsComponent } from '../form-comments/form-comments.component';

@Component({
  selector: 'app-table-workdays',
  templateUrl: './table-workdays.component.html',
  styleUrls: ['./table-workdays.component.css']
})
export class TableWorkdaysComponent implements OnInit, OnChanges {

  private _COMPONENT_NAME = 'TableWorkdaysComponent' ;

  @Output() outEntrance: EventEmitter<Workday>  = new EventEmitter<Workday>();
  @Output() outExit: EventEmitter<Workday>      = new EventEmitter<Workday>();
  @Output() outUpdate: EventEmitter<Workday>    = new EventEmitter<Workday>();
  @Output() outRemove: EventEmitter<Workday>    = new EventEmitter<Workday>();
  @Output() outRefresh: EventEmitter<any>       = new EventEmitter<any>();
  @Output() outflybutton: EventEmitter<any>     = new EventEmitter<any>();

  @Input()  workdays: Workday[];

  constructor(public modalService: NgbModal) { }

  ngOnInit() {
    Logger.logInfo(this._COMPONENT_NAME + '- ngOnInit - details:' + JSON.stringify(this.workdays));
  }

  ngOnChanges(changes: SimpleChanges): void {
    Logger.logInfo(this._COMPONENT_NAME + '- ngOnChanges.');
  }

  entrance() {
    const now = DateUty.getFormatted(moment());
    const newWorkday: Workday  = {
      entrance: now, permission: '1', workable: '8', worked: '', exit: '', balance: '',  negative: '' };
    Logger.logInfo('TableDayDetailsComponent - Action-entrance');
    this.outEntrance.emit(newWorkday);
  }

  exit(workday: Workday) {
    Logger.logInfo(this._COMPONENT_NAME + ' - Action-exit - workday: ' + JSON.stringify(workday));
    const now = moment();
    const workdayUpd = this.getAndCalcExit(workday, now);
    this.outExit.emit(workdayUpd);
  }

  refresh() {
    Logger.logDebug(this._COMPONENT_NAME + '- refresh');
    this.outRefresh.emit();
  }

  remove(workday: Workday) {
    Logger.logInfo(this._COMPONENT_NAME + ' - Action-remove - workday: ' + JSON.stringify(workday));
    this.outRemove.emit(workday);
  }

  update(workday: Workday) {
    Logger.logInfo(this._COMPONENT_NAME + ' - Action-update - workday: ' + JSON.stringify(workday));
    let exit: moment.Moment;
    if (workday.exit) {
      exit = moment(workday.exit);
    } else {
      exit = moment();
    }
    const workdayUpd = this.getAndCalcExit(workday, exit);
    this.outUpdate.emit(workdayUpd);
  }

  openFormModal(workday: Workday) {
    const notify: Notify = { msg: 'Aperto Pannello Modifica', date: new Date(), type: NotifyType.Info };
    this.outRefresh.emit(notify);
    Logger.logInfo(this._COMPONENT_NAME + ' - openFormModal - emit onrefresh event ');

    const modalRef = this.modalService.open(FormModalComponent);
    modalRef.componentInstance.detail = workday;
    modalRef.componentInstance.echo(workday);
    modalRef.result.then((result) => {
      Logger.logInfo(this._COMPONENT_NAME + ' - openFormModal - result: ' + JSON.stringify(result));
      workday.entrance = result.entrance;
      workday.exit     = result.exit;
      workday.workable = result.workable;
      this.update(workday);
    }).catch((error) => {
      Logger.logInfo(this._COMPONENT_NAME + ' - openFormModal - error: ' + JSON.stringify(error));
    });
  }

  openCommentsModal(workday: Workday) {
    const notify: Notify = { msg: 'Aperto Pannello Commenti', date: new Date(), type: NotifyType.Info };
    this.outRefresh.emit(notify);
    Logger.logInfo(this._COMPONENT_NAME + ' - openCommentsModal - emit onrefresh event ');

    const modalRef = this.modalService.open(FormCommentsComponent);
    modalRef.componentInstance.detail = workday;
    modalRef.componentInstance.echo(workday);
    modalRef.result.then((result) => {
      if ( result.newComment !== '') {
        workday.comments.push({ text: result.newComment, author: 'my' });
      }
      Logger.logInfo(this._COMPONENT_NAME + ' - openCommentsModal - workday: ' + JSON.stringify(workday));
      this.update(workday);
    }).catch((error) => {
      Logger.logInfo(this._COMPONENT_NAME + ' - openCommentsModal - error: ' + JSON.stringify(error));
    });
  }

  flybutton() {
    this.outflybutton.emit();
  }


  private getAndCalcExit(workday: Workday, exit: moment.Moment) {

    const formattmp = 'HH:mm:ss';

    const workdayTmp: Workday = { ...workday };
    workdayTmp.exit = exit.utc().format();

    const entrance  = moment(workdayTmp.entrance);

    let assumed = entrance.clone();
    assumed = assumed.add(workdayTmp.workable, 'hours');
    assumed = assumed.add(workdayTmp.permission, 'hours');
    Logger.logDebug(this._COMPONENT_NAME + ' calcExit - assumed: ' + assumed.toJSON());

    const diffWorkedPos  = exit.diff(entrance);
    if (diffWorkedPos < 0) {
      const diffWorkedNeg  = entrance.diff(exit);
      workdayTmp.worked = moment(diffWorkedNeg).utc().format(formattmp);
    } else {
      workdayTmp.worked = moment(diffWorkedPos).utc().format(formattmp);
    }

    const diffBalancePos = exit.diff(assumed);
    if ( diffBalancePos < 0) {
      const diffBalanceNeg = assumed.diff(exit);
      workdayTmp.balance  =  moment(diffBalanceNeg).utc().format(formattmp);
      workdayTmp.negative = 'NEGATIVO';
    } else {
      workdayTmp.balance  =  moment(diffBalancePos).utc().format(formattmp);
      workdayTmp.negative = 'POSITIVO';
    }
    return workdayTmp;
  }



}
