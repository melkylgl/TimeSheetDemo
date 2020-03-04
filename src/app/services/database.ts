// import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Workday } from './model';

/**
 *
 */
export class Database // implements InMemoryDbService 
{

    createDb() {

        const timeSheets: Workday[] = [
            {
                // id: 101,
                entrance: '2020-01-01T08:55:59+01:00', permission: '1', workable: '8', worked: '',
                exit: '2020-01-01T18:55:59+01:00', 
                // difference: '', 
                balance: '', negative: ''
            }
        ];
        return { timeSheets };
    }

}
