import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-statusbar',
  templateUrl: './statusbar.component.html',
  styleUrls: ['./statusbar.component.css']
})
export class StatusbarComponent implements OnInit {

  @Input() date: Date;
  @Input() type: string;
  @Input() msg: string;


  constructor() { }

  ngOnInit() { }

}
