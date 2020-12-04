import * as WoT from "wot-typescript-definitions";
import { SoilProbe } from "./soilProbe";
import { soilProbeTDFactory } from "./soilProbeTDFactory";
import { registerObserver } from "../observer/WoTEnablerObserver";

const request = require("request");

export class SoilProbeWoT implements Observer.Interfaces.IObserver {
  public thing: WoT.ExposedThing;
  public wot: WoT.WoT;
  public td: any;
  private soilProbe: SoilProbe;
  constructor(WoT: WoT.WoT, soilProbe: SoilProbe, tdDirectory?: string) {
    this.soilProbe = soilProbe;
    this.wot = WoT;
    this.wot.produce(soilProbeTDFactory(soilProbe)).then((exposedThing) => {
      this.thing = exposedThing;
      this.td = exposedThing.getThingDescription();
      this.add_properties();
      this.add_actions();
      this.thing.expose();
      if (tdDirectory) this.register(tdDirectory);
    });
    registerObserver({ id: this.soilProbe.id, observer: this });
  }

  public receiveNotification(message: object): void {
    this.thing.invokeAction("setProperties", message);
  }

  public register(directory: string) {
    console.log("Registering TD in directory: " + directory);
    request.post(directory, { json: this.thing.getThingDescription() }, (_error: any, _response: any, _body: any) => {
      if (!_error && _response.statusCode < 300) {
        console.info("TD registered!");
      } else {
        console.debug(_error);
        console.debug(_response);
        return;
      }
    });
  }

  private add_actions() {
    this.thing.setActionHandler("getAllProperties", async () => Promise.resolve(this.soilProbe.getAllProperties()));

    this.thing.setActionHandler("setProperties", async (input) => {
      await this.soilProbe.setProperties(input);
      this.thing.emitEvent("change", input);
      this.thing.emitEvent("ngsiOutput", this.soilProbe.ngsiFormatter());
      return Promise.resolve("set properties action performed with success");
    });
  }

  private add_properties() {
    for (const key in this.soilProbe.properties) {
      this.thing.writeProperty(key, this.soilProbe.properties[key]);
      this.thing.setPropertyReadHandler(key, async () => this.soilProbe.properties[key]);
    }
  }
}
