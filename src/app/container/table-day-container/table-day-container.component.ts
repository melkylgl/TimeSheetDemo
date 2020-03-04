import { Component, OnInit, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Workday, Notify, NotifyType } from 'src/app/services/model';
import { TimeSheetService } from 'src/app/services/time-sheet.service';
import Logger from 'src/app/Utility/Utility';


@Component({
  selector: 'app-table-day-container',
  templateUrl: './table-day-container.component.html',
  styleUrls: ['./table-day-container.component.css']
})
export class TableDayContainerComponent implements OnInit {

  workdays: Observable<Workday[]>;

  @Output() outNotify: EventEmitter<Notify> = new EventEmitter<Notify>();

  constructor(private service: TimeSheetService) {
    Logger.logInfo('TableDayContainerComponent - constructor');
    this.workdays = this.service.getTimeSheets();
  }

  ngOnInit() {
    Logger.logInfo('TableDayContainerComponent - ngOnInit');
    this.workdays = this.service.getTimeSheets();
  }

  refresh() {
    Logger.logDebug('TableDayContainerComponent - refresh');
    const notify: Notify = {msg: 'richiesta Refresh avviata', date: new Date(), type: NotifyType.Info };
    this.outNotify.emit(notify);
    this.service.loadAllDocuments();
  }

  entrance(workday: Workday) {
    Logger.logDebug('TableDayContainerComponent - entranceNoSub');
    this.service.addWorkday(workday)
    .then(
      (resp) => {
        Logger.logDebug('TableDayContainerComponent - entrance - resp:' + JSON.stringify(resp));
        const notify: Notify = {msg: 'Entrata registrata correttamente', date: new Date(), type: NotifyType.OK };
        this.outNotify.emit(notify);
        this.service.loadAllDocuments();
      },
      (err) => {
        Logger.logDebug('TableDayContainerComponent - entrance - err:' + JSON.stringify(err));
      }
    );
  }

  exit(workday: Workday) {
    Logger.logDebug('TableDayContainerComponent - exit');
    this.service.updateWorkday(workday)
    .then(
      (resp) => {
        Logger.logDebug('TableDayContainerComponent - exit - resp:' + JSON.stringify(resp));
        const notify: Notify = { msg: 'Uscita registrata correttamente', date: new Date(), type: NotifyType.Error };
        this.outNotify.emit(notify);
        this.service.loadAllDocuments();
      },
      (err) => {
        Logger.logDebug('TableDayContainerComponent - exit - err:' + JSON.stringify(err));
      }
    );
  }

  remove(workday: Workday) {
    Logger.logDebug('TableDayContainerComponent - remove');
    this.service.deleteWorkday(workday)
    .then(
      (resp) => {
        Logger.logDebug('TableDayContainerComponent - remove - resp:' + JSON.stringify(resp));
        const notify: Notify = { msg: 'Eliminazione conclusa in modo corretto', date: new Date(), type: NotifyType.Error };
        this.outNotify.emit(notify);
        this.service.loadAllDocuments();
      },
      (err) => {
        Logger.logDebug('TableDayContainerComponent - remove - err:' + JSON.stringify(err));
      }
    );

  }

  update(workday: Workday) {
    Logger.logDebug('TableDayContainerComponent - update');
    this.service.updateWorkday(workday)
    .then(
      (resp) => {
        Logger.logDebug('TableDayContainerComponent - update - resp:' + JSON.stringify(resp));
        const notify: Notify = { msg: 'Aggiornamento concluso in modo corretto', date: new Date(), type: NotifyType.Warning };
        this.outNotify.emit(notify);
        this.service.loadAllDocuments();
      },
      (err) => {
        Logger.logDebug('TableDayContainerComponent - update - err:' + JSON.stringify(err));
      }
    );

  }

}
