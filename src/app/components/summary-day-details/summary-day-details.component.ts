import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-summary-day-details',
  templateUrl: './summary-day-details.component.html',
  styleUrls: ['./summary-day-details.component.css']
})
export class SummaryDayDetailsComponent implements OnInit {

  @Input() dayDetail: any;

  constructor() { }

  ngOnInit() {
  }

}
