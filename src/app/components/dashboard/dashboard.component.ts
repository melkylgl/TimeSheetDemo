import { Component, OnInit } from '@angular/core';
import { TimeSheetService } from '../../services/time-sheet.service';
import { Workday } from 'src/app/services/model';
import Logger from 'src/app/Utility/Utility';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  details: Array<Workday>;

  constructor(private service: TimeSheetService) {
    console.log('---> Constructor Dashboard');
  }

  private getCallRestAPi() {
    console.log('---> Call Rest API');
    this.service.getTimeSheets().subscribe(details => {
      Logger.logDebug('DashboardComponent - getCallRestAPi - details:' + JSON.stringify(details));
      this.details = details;
    });
  }

  ngOnInit() {
    console.log('---> on Init Dashboard');
    this.getCallRestAPi();
  }

}
