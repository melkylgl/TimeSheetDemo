import { Component, OnInit, ViewChild, Input, EventEmitter, Output, OnChanges
       , SimpleChanges, ChangeDetectionStrategy } from '@angular/core';
import { MatPaginator, MatTableDataSource} from '@angular/material';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormModalComponent } from '../form-modal/form-modal.component';
import Logger, { DateUty } from 'src/app/Utility/Utility';
import { Workday, Notify, NotifyType } from 'src/app/services/model';
import * as moment from 'moment';


@Component({
  selector: 'app-table-day-details',
  templateUrl: './table-day-details.component.html',
  styleUrls: ['./table-day-details.component.css']
})

export class TableDayDetailsComponent implements OnInit, OnChanges {

  @Input()  details: Workday[];

  @Output() outEntrance: EventEmitter<Workday> = new EventEmitter<Workday>();
  @Output() outExit: EventEmitter<Workday> = new EventEmitter<Workday>();
  @Output() outUpdate: EventEmitter<Workday> = new EventEmitter<Workday>();
  @Output() outRemove: EventEmitter<Workday> = new EventEmitter<Workday>();
  @Output() outRefresh: EventEmitter<any> = new EventEmitter<any>();

  @Output() outEntranceNoSub: EventEmitter<Workday> = new EventEmitter<Workday>();

  @ViewChild(MatPaginator)  paginator: MatPaginator;

  displayedColumns:
    string[] = ['_id', 'day', 'entrance', 'exit', 'difference'
               , 'workable', 'permission'
               , 'worked', 'balance', 'negative', 'actions'];

  matTableDataSource: MatTableDataSource<Workday>;

  constructor( public modalService: NgbModal) {
    Logger.logInfo('TableDayDetailsComponent - constructor - details:' + JSON.stringify(this.details));
  }

  ngOnInit() {
    Logger.logInfo('TableDayDetailsComponent - ngOnInit - details:' + JSON.stringify(this.details));
  }

  ngOnChanges(changes: SimpleChanges): void {
    Logger.logInfo('TableDayDetailsComponent - ngOnChanges - details:' + JSON.stringify(this.details));
    this.matTableDataSource = new MatTableDataSource<Workday>(this.details);
    this.matTableDataSource.paginator = this.paginator;
  }

  entrance() {
    const now = DateUty.getFormatted(moment());
    const newWorkday: Workday  = {
      entrance: now, permission: '1', workable: '8', worked: '', exit: '', balance: '',  negative: '' };
    Logger.logInfo('TableDayDetailsComponent - Action-entrance');
    this.outEntrance.emit(newWorkday);
  }

  entranceNoSub() {
    const now = DateUty.getFormatted(moment());
    const newWorkday: Workday  = {
      entrance: now, permission: '1', workable: '8', worked: '', exit: '', balance: '',  negative: '' };
    Logger.logInfo('TableDayDetailsComponent - Action-entranceNoSub');
    this.outEntranceNoSub.emit(newWorkday);
  }


  exit(workday: Workday) {
    Logger.logInfo('TableDayDetailsComponent - Action-exit - workday: ' + JSON.stringify(workday));
    const now = moment();
    const workdayUpd = this.getAndCalcExit(workday, now);
    this.outExit.emit(workdayUpd);
  }

  refresh() {
    Logger.logDebug('TableDayDetailsComponent - refresh');
    this.outRefresh.emit();
  }

  remove(workday: Workday) {
    Logger.logInfo('TableDayDetailsComponent - Action-remove - workday: ' + JSON.stringify(workday));
    this.outRemove.emit(workday);
  }

  update(workday: Workday) {
    Logger.logInfo('TableDayDetailsComponent -Action-update - workday: ' + JSON.stringify(workday));
    let exit: moment.Moment;
    if (workday.exit) {
      exit = moment(workday.exit);
    } else {
      exit = moment();
    }
    const workdayUpd = this.getAndCalcExit(workday, exit);
    this.outUpdate.emit(workdayUpd);
  }

  openFormModal(detail: Workday) {
    const notify: Notify = { msg: 'Aperto Pannello Modifica', date: new Date(), type: NotifyType.Info };
    Logger.logInfo('TableDayDetailsComponent - openFormModal - emit onrefresh event ');

    const modalRef = this.modalService.open(FormModalComponent);
    modalRef.componentInstance.detail = detail;
    modalRef.componentInstance.echo(detail);

    modalRef.result.then((result) => {
      Logger.logInfo('TableDayDetailsComponent - openFormModal - result: ' + JSON.stringify(result));
      detail.entrance = result.entrance;
      detail.exit     = result.exit;
      detail.workable = result.workable;
      this.update(detail);
    }).catch((error) => {
      Logger.logInfo('TableDayDetailsComponent - openFormModal - error: ' + JSON.stringify(error));
    });
  }

  private getAndCalcExit(workday: Workday, exit: moment.Moment) {

    const formattmp = 'HH:mm:ss';

    const workdayTmp: Workday = { ...workday };
    workdayTmp.exit = exit.utc().format();

    const entrance  = moment(workdayTmp.entrance);

    let assumed = entrance.clone();
    assumed = assumed.add(workdayTmp.workable, 'hours');
    assumed = assumed.add(workdayTmp.permission, 'hours');
    Logger.logDebug('TableDayDetailsComponent calcExit - assumed: ' + assumed.toJSON());

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

