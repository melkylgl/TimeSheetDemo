import * as moment from 'moment';
import { FlybuttonEventType, SwipeButtonEventType } from '../services/model';


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

/**
 *
 */
export class FlybuttonEventUty {

    public static isCommitByString(type: string): boolean {
        const val = FlybuttonEventUty.findFlybuttonEventBy(type);
        return val === 'COMMIT';
    }
    public static isCommitByEvent(eventType: FlybuttonEventType): boolean {
        const val = FlybuttonEventUty.getStringTypeBy(eventType);
        return val === 'COMMIT';
    }

    public static getStringTypeBy(eventType: FlybuttonEventType): string {
        switch (eventType) {
            case FlybuttonEventType.COMMIT: return 'COMMIT';
            case FlybuttonEventType.CANCEL: return 'CANCEL';
            default: return 'VOID';
        }
    }

    public static findFlybuttonEventBy(key: string): string {
        const indx = FlybuttonEventType[key];
        if (indx) {
          const val = FlybuttonEventType[indx];
          return val;
        }
        return FlybuttonEventType[-1];
    }

    public static getFlybuttonEventBy(key: string): FlybuttonEventType {
        switch (key) {
            case 'COMMIT':
                return FlybuttonEventType.COMMIT;
            case 'CANCEL':
                return FlybuttonEventType.CANCEL;
            default:
                return FlybuttonEventType.VOID;
        }
    }




}

// ----------------------------------------------------------------------------

export class SwipeButtonUty {

}
