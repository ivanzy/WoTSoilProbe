export class LoRaMessage {
  private _applicationId: string;
  private _applicationName: string;
  private _deviceName: string;
  private _devEui: string;
  private _fCnt: number;
  private _txInfo: object;
  private _adr: boolean;
  private _fport: number;
  private _data: string;
  private _createDate: Date;

  public get createDate(): Date {
    return this._createDate;
  }
  public set createDate(value: Date) {
    this._createDate = value;
  }

  public get data(): string {
    return this._data;
  }
  public set data(value: string) {
    this._data = value;
  }

  public get fport(): number {
    return this._fport;
  }
  public set fport(value: number) {
    this._fport = value;
  }

  public get adr(): boolean {
    return this._adr;
  }
  public set adr(value: boolean) {
    this._adr = value;
  }

  public get fCnt(): number {
    return this._fCnt;
  }
  public set fCnt(value: number) {
    this._fCnt = value;
  }

  public get txInfo(): object {
    return this._txInfo;
  }
  public set txInfo(value: object) {
    this._txInfo = value;
  }

  public get devEui(): string {
    return this._devEui;
  }
  public set devEui(value: string) {
    this._devEui = value;
  }

  public get deviceName(): string {
    return this._deviceName;
  }
  public set deviceName(value: string) {
    this._deviceName = value;
  }

  public get applicationName(): string {
    return this._applicationName;
  }
  public set applicationName(value: string) {
    this._applicationName = value;
  }

  public get applicationId(): string {
    return this._applicationId;
  }
  public set applicationId(value: string) {
    this._applicationId = value;
  }
}
