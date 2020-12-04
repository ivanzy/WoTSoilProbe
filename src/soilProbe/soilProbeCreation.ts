import { SoilProbe } from "./soilProbe";
import { SoilProbeProperties } from "./soilProbeProperties";

export class SoilProbeCreation {
  public static generateSoilProbe(id: number): SoilProbe {
    let soilProbe = new SoilProbe(id);
    soilProbe.properties = SoilProbeCreation.generateRandomSoilProbeProperties(id);
    return soilProbe;
  }

  public static generateRandomSoilProbeProperties = (id: number) => {
    let soilProbeProperties = new SoilProbeProperties();
    soilProbeProperties.battery = SoilProbeCreation.getRandomInt(0, 100);
    soilProbeProperties.timestamp = new Date().getTime();
    soilProbeProperties.refManagementZone = `urn:ngsi:ManagementZone:00${SoilProbeCreation.getRandomInt(1, 5)}`;
    soilProbeProperties.temperatureCircuitBoard = SoilProbeCreation.getRandomInt(15, 35);
    soilProbeProperties.soilMoistureRaw = [Math.random(), Math.random(), Math.random()];
    soilProbeProperties.location = {};
    soilProbeProperties.identifier = id;

    return soilProbeProperties;
  };

  private static getRandomInt(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }
}
