import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.css']
})
export class CheckboxComponent implements OnInit {

@Input() labe: string;
@Input() checked: boolean;
@Output() outCheck = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit() {
  }

  check(checked: boolean) {
    this.outCheck.emit(checked);
  }

}
