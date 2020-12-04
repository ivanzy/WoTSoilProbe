import { SoilProbe } from "./soilProbe";

export function soilProbeTDFactory(soilProbe: SoilProbe): object {
  return {
    "@context": ["https://www.w3.org/2019/wot/td/v1", { "@language": "en" }],
    id: `urn:ngsi:SoilProbe:${soilProbe.id}`,
    title: soilProbe.title,
    description: soilProbe.description,
    properties: {
      battery: {
        description: "soil probe battery from 0 to 100",
        type: "integer",
        observable: true,
        readOnly: true,
        minimum: 0,
        maximum: 100,
      },
      timestamp: {
        description: "soil probe timestamp of the last measurement",
        type: "integer",
        observable: true,
        readOnly: true,
      },
      soilMoistureRaw: {
        description: "soil probe moisture in three depths",
        type: "array",
        observable: true,
        readOnly: true,
      },
      refManagementZone: {
        description: "Reference to the Management Zone where this soil probe is located",
        type: "string",
        observable: true,
        readOnly: true,
      },
      temperatureCircuitBoard: {
        description: "Circuit board temperature of the soil probe",
        type: "number",
        observable: true,
        readOnly: true,
        unit: "celsius",
        minimum: 0,
      },
      location: {
        description: "the geo location of a given soil probe",
        type: "object",
        observable: true,
        readOnly: true,
      },
      identifier: {
        description: "the hardware identification of a given probe",
        type: "integer",
        observable: true,
        readOnly: true,
      },
    },
    actions: {
      getAllProperties: {
        title: "getAllProperties",
        description: "return all the properties of the SoilProbe in a single JSON",
        out: {
          type: "object",
        },
      },
      setProperties: {
        title: "setProperties",
        description: "update the properties values",
        input: {
          type: "object",
        },
      },
    },
    events: {
      change: {
        description: "change event",
        descriptions: {
          en: "change event",
        },
      },
      ngsiOutput: {
        description: "When a property is updated is triggered and sends the entire SoilProbe JSON (all properties) formatted in NGSI data structurewhen a properties is updated, this event is triggered and sends the entire SoilProbe JSON (all properties) formatted in NGSI data structure",
        descriptions: {
          en: "change event",
        },
      },
    },
  };
}
