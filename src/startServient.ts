import { SoilProbeWoT } from "./soilProbe/soilProdeTD";
import { Servient } from "@node-wot/core";
import { HttpServer } from "@node-wot/binding-http";
import { SoilProbeCreation } from "./soilProbe/soilProbeCreation";
import * as config from "./config/default.json";

module.exports.startServients = async () => {
  const numberOfProbes = await config.number_of_soil_probes;
  const servient = new Servient();
  servient.addServer(new HttpServer(config.http_configurations));
  const wot = await servient.start();
  for (let id = 1; id <= numberOfProbes; id++) {
    let soilProbe = await SoilProbeCreation.generateSoilProbe(id);
    console.info(soilProbe);
    await new SoilProbeWoT(wot, soilProbe);
  }
  return Promise.resolve("all servients were created");
};
