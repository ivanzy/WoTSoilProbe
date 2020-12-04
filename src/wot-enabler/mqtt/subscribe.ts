const processor = require("../process");
const mqtt = require("mqtt");
import * as config from "../../config/default.json";

module.exports.mqttSubscriber = () => {
  console.log(`Subscribing to all application/ topics...`);

  const client = mqtt.connect(config.mqtt_configurations);
  
  //subscribing to all MQTT /applications topics of a given broker (/application is the root topic where LoRa App Server sends messages) 
  client.subscribe("application/#");

  topicMonitor(client);
};

const topicMonitor = (client: any) => {
  //message event
  client.on("message", (topic: string, message: any) => {
    console.log(`${topic} ${message.toString()}`);

    //process a new message (translate to NGSI)
    processor.processMessage(topic, JSON.parse(message));
  });
};
