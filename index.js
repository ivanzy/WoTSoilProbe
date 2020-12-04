const WotEnabler = require("./dist/wot-enabler/mqtt/subscribe.js");
const SwampServient = require("./dist/startServient.js");

WotEnabler.mqttSubscriber();
SwampServient.startServients().then(console.info);
