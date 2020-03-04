
export interface Comment {
  author?: string;
  text?: string;
}

/**
 *
 */
export interface Workday {
    _id?: string;
    id?: number;
    entrance?: string;
    permission?: string;
    workable?: string;
    worked?: string;
    exit?: string;
    balance?: string;
    negative?: string;
    comments?: Array<Comment>;
  }

export interface WorkdayLess {
  entrance?: string;
  permission?: string;
  workable?: string;
  worked?: string;
  exit?: string;
  difference?: string;
  balance?: string;
  negative?: string;
}

export interface ElasticHit {
  _index: string;
  _type: string;
  _id: string;
  _score: string;
  _source: any;
}

export interface ElasticWorkdayDto {
    hits: {
      total?: { value? }
      max_score?: number
      hits?: ElasticHit []
    };
}

export interface Notify {
  date: Date;
  type: NotifyType;
  msg: string;
}

export const enum NotifyType {
  Info = 0,
  Warning ,
  Error,
  OK
}

