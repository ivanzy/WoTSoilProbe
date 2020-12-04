export class SoilProbeProperties {
  battery: number;
  timestamp: number;
  soilMoistureRaw: number[];
  refManagementZone?: string;
  temperatureCircuitBoard: number;
  location?: object;
  identifier?: number;
}