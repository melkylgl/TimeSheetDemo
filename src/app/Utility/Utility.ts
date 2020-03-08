import * as moment from 'moment';
import { FlybuttonEventType } from '../services/model';


/**
 * 
 * 
 */
export default class Logger {
    
    public static ERROR_LOG = 'ERROR_LOG';
    public static INFO_LOG = 'INFO_LOG';
    public static DEBUG_LOG = 'DEBUG_LOG';

    public static OUTCOME_FAIL = 'FAIL';
    public static OUTCOME_ERROR = 'ERROR';
    public static OUTCOME_SUCCESSFULL = 'SUCCESSFULL';
    public static OUTCOME_SUCCESSFULL_DELETE = 'SUCCESSFULL_DELETE';
    public static OUTCOME_SUCCESSFULL_DRAFT = 'SUCCESSFULL_DRAFT';
    public static OUTCOME_SUCCESSFULL_PUBLISH = 'SUCCESSFULL_PUBLISH';

    public static logInfo(msg: string) {
        this.log(msg, this.INFO_LOG);
    }

    public static logDebug(msg: string) {
        this.log(msg, this.DEBUG_LOG);
    }

    public static logError(msg: string) {
        this.log(msg, this.ERROR_LOG);
    }

    private static log(msg: string, logtype: string) {
        const now: Date = new Date();
        console.log('---> '.concat('[', now.toLocaleString(), '] - [', logtype, '] - ', msg));
    }
}

/**
 *
 */
export class DateUty {

    public static getFormatted(momentDate: moment.Moment): string {
        return momentDate.clone().format('YYYY-MM-DDTHH:mm:ssZ');
    }

}

export class FlybuttonEventUty {

    public static findFlybuttonEventBy(key: string): string {
        const indx = FlybuttonEventType[key];
        if (indx) {
          const val = FlybuttonEventType[indx];
          return val;
        }
        return FlybuttonEventType[-1];
    }

}
