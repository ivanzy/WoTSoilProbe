import { SoilProbeProperties } from "../soilProbe/soilProbeProperties";
import { LoRaMessage } from "./loraMessage";
import { notify } from "../observer/WoTEnablerObserver";

module.exports.processMessage = (topic: string, message: LoRaMessage) => {
  //LoRa code messages using base64, decoding to ascii and removing null chars
  let decodedData = decode64toAscii(message.data).replace("\u0000", "");
  //translate LoRa UL to JSON object
  let wotMessage = strutcAttributes(decodedData);
  let deviceId = extractId(topic);
  console.info({ id: deviceId, message: wotMessage });
  if (notEmpty(wotMessage)) notify({ id: deviceId, data: wotMessage });
};

const attributes = [
  { object_id: "ts", name: "timestamp" },
  { object_id: "m", name: "soilMoistureRaw" },
  { object_id: "b", name: "battery" },
  { object_id: "t", name: "temperatureCircuitBoard" },
];

//the device ID is in the third part of the topic (e.g. application/application_id/device/device_id/rx)
const extractId = (topic: string): number => parseInt(topic.split("/")[3]);

const decode64toAscii = (data: string): string => Buffer.from(data, "base64").toString("ascii");

const strutcAttributes = (attr: string): SoilProbeProperties => {
  let attributes_structured = new SoilProbeProperties();
  const split_data = attr.split("|");
  for (let i = 0; i <= split_data.length; i++) {
    if (i % 2 == 0) {
      for (let attribute of attributes) {
        if (attribute.object_id == split_data[i]) {
          ++i;
          attributes_structured[attribute.name] = split_data[i][0] == "[" ? JSON.parse(split_data[i]) : split_data[i];
        }
      }
    }
  }

  attributes_structured["IoTimestamp"] = new Date().getTime().toString();
  return attributes_structured;
};
const notEmpty = (wotMessage: SoilProbeProperties) => Object.keys(wotMessage).length;
