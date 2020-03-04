import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import Logger, { DateUty } from '../Utility/Utility';
import { Workday, ElasticWorkdayDto } from './model';
import { BehaviorSubject } from 'rxjs';
import { Client } from 'elasticsearch-browser';
import * as moment from 'moment';


const _ELSTAIC_INDEX = 'melky_timesheet_demo_1';

@Injectable()
export class TimeSheetService {

  private timeSheets = new BehaviorSubject<Workday[]>([]);

  private client: Client;

  constructor(private http: HttpClient) {
    Logger.logInfo('TimeSheetService  - constructor ');
    if (!this.client) {
      this.connect();
    }
    this.loadAllDocuments();
  }

  private connect() {
    this.client = new Client({
      host: 'localhost:9200',
      // log: 'trace',
      apiVersion: '7.5', // use the same version of your Elasticsearch instance
    });
  }

  loadAllDocuments(): any {

    const queryalldocs = {
      query: { match_all: {} },
      sort: [ { entrance: 'asc' } ]
    };

    this.client.search({
      index: _ELSTAIC_INDEX,
      body: queryalldocs
    }).then(
      (resp) => {
        const arrayList: Array<Workday> = resp.hits.hits.map(elem => {
          const workday: Workday = elem._source;
          workday._id = elem._id;
          return workday;
        });
        Logger.logDebug('TimeSheetService - loadAllDocuments - arrayList length:' + arrayList.length);
        this.timeSheets.next(arrayList);
      },
      (err) => {
        Logger.logDebug('TimeSheetService - loadAllDocuments - err:' + JSON.stringify(err));
      }
    );
  }

  getTimeSheets() {
    Logger.logDebug('TimeSheetService - getTimeSheets ');
    return this.timeSheets.asObservable();
  }

  addWorkday(workday: Workday) {
    Logger.logInfo('TimeSheetService - addWorkdayNoSubscribe');

    delete workday.exit;

    const comment = {
      author: 'Luca',
      text: 'prova commento 1'
    };

    workday.comments = [
      comment
    ];

    return this.client.index({
      index: 'melky_timesheet_demo_1',
      refresh: 'wait_for',
      body: workday
    });
  }


  updateWorkday(workday: Workday) {
    Logger.logInfo('TimeSheetService - updateWorkday - workday: ' + JSON.stringify(workday));

    const idTemp = workday._id;
    delete workday._id;
    return this.client.index({
      index: _ELSTAIC_INDEX,
      refresh: 'wait_for',
      id: idTemp,
      body: workday
    });
  }

  deleteWorkday(workday: Workday) {
    Logger.logInfo('TimeSheetService - deleteWorkday - workday: ' + JSON.stringify(workday));

    return this.client.delete({
      index: _ELSTAIC_INDEX,
      id: workday._id,
      refresh: 'wait_for'
    });
  }

}
