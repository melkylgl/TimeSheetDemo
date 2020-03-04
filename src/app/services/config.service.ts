export class ConfigService {

  private _devmode: string;

  static set(property, value) {
    this['_' + property] = value;
  }
  static get(property) {
    return this['_' + property];
  }

  constructor() { }
}
