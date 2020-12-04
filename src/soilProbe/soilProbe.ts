import { SoilProbeProperties } from "./soilProbeProperties";

export class SoilProbe {
  private _properties: SoilProbeProperties;
  private _id: number;
  private _title: string;
  private _description: string;

  constructor(id: number) {
    this._id = id;
    this._properties = new SoilProbeProperties();
    this._description = "SWAMP Soil Probe";
    this._title = "soil-probe-" + id;
  }

  public get id(): number {
    return this._id;
  }
  public get title(): string {
    return this._title;
  }
  public get description(): string {
    return this._description;
  }

  public get properties(): SoilProbeProperties {
    return this._properties;
  }

  public set properties(soilProbeProperties: SoilProbeProperties) {
    this._properties = soilProbeProperties;
  }

  public getAllProperties(): SoilProbeProperties {
    return this.properties;
  }
  public setProperties(soilProbeProperties: object): void {
    for (const key in soilProbeProperties) {
      if (key in this._properties) this._properties[key] = soilProbeProperties[key];
    }
  }

  public ngsiFormatter() {
    let ngsiSoilProbe = {};
    ngsiSoilProbe["id"] = `urn:ngsi:SoilProbe:${this.id}`;
    ngsiSoilProbe["type"] = `SoilProbe`;
    for (const key in this._properties) ngsiSoilProbe[key] = { value: this._properties[key] };
    console.info(ngsiSoilProbe);
    return ngsiSoilProbe;
  }
}
