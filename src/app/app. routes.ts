import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { TableDayDetailsComponent } from './components/table-day-details/table-day-details.component';

const routes: Routes = [
    {
        path: '',
        component: DashboardComponent
    },
    {
        path: 'tableDayDetails',
        component: TableDayDetailsComponent
    }
];

export const AppRoutes = RouterModule.forRoot(routes);
