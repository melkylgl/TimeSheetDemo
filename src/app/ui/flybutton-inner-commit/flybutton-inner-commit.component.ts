import { Component, OnInit, Input, Output, EventEmitter, HostListener } from '@angular/core';
import Logger from 'src/app/Utility/Utility';

@Component({
  selector: 'app-flybutton-inner-commit',
  templateUrl: './flybutton-inner-commit.component.html',
  styleUrls: ['./flybutton-inner-commit.component.css']
})
export class FlybuttonInnerCommitComponent implements OnInit {

  @Input() name: string;
  @Output() outflybuttonCommit: EventEmitter<any> = new EventEmitter<any>();

  isOverInnerCommit: boolean;

  constructor() {
    this.isOverInnerCommit = false;
  }

  ngOnInit() {
    Logger.logInfo('  FlybuttonInnerCommitComponent - ngOnInit - name:' + this.name );
  }

  @HostListener('mouseenter') onMouseEnter() {
    Logger.logInfo('FlybuttonInnerCommitComponent - onMouseEnter');
    this.isOverInnerCommit = true;
    this.outflybuttonCommit.emit();
  }
  @HostListener('mouseleave') onMouseLeave() {
    Logger.logInfo('FlybuttonInnerCommitComponent - onMouseLeave');
    this.isOverInnerCommit = false;
  }


}
