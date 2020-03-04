import { Component, ViewChild, ViewContainerRef, ComponentFactoryResolver, ComponentRef } from '@angular/core';
import { StatusbarComponent } from './components/statusbar/statusbar.component';
import { TableDayDetailsComponent } from './components/table-day-details/table-day-details.component';
import Logger from 'src/app/Utility/Utility';
import { Notify, NotifyType } from './services/model';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {


  @ViewChild(TableDayDetailsComponent) table: TableDayDetailsComponent;
  @ViewChild('statusbox', { read: ViewContainerRef }) statusbox: ViewContainerRef;

  title = 'demoTimeSheet';
  statusbar: ComponentRef<StatusbarComponent>;

  constructor(private factoty: ComponentFactoryResolver){
  }

  refreshStatus(event: Notify) {
    Logger.logInfo('AppComponent - refreshStatus :' + JSON.stringify(event));

    if (!this.statusbar) {
      const statusComp = this.factoty.resolveComponentFactory(StatusbarComponent);
      this.statusbar = this.statusbox.createComponent(statusComp);
    }

    this.statusbar.instance.date = event.date;
    this.statusbar.instance.msg  = event.msg;

    if (event.type === NotifyType.OK) {
      this.statusbar.instance.type = 'alert alert-success';
    } else if (event.type === NotifyType.Warning) {
      this.statusbar.instance.type = 'alert alert-dwarning';
    } else if (event.type === NotifyType.Error) {
      this.statusbar.instance.type = 'alert alert-danger';
    } else {
      this.statusbar.instance.type = 'alert alert-info';
    }

    this.statusbar.changeDetectorRef.detectChanges();
    setTimeout(() => this.destroyStatus(), 2000);
  }

  destroyStatus() {
    if (this.statusbar) {
      this.statusbar.destroy();
      delete this.statusbar;
    }
  }

}
