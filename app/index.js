const util = require("./utilis/dataGenerateUtil");

var connectionString =
  "HostName=TB-IOT-SERVICE.azure-devices.net;DeviceId=TB23_MOB-0001;SharedAccessKey=933y6ArrN8KdUZ+Zyf3Ab1sYgx9j4/RnnfZ2K0AMD9g";

var clientFromConnectionString =
  require("azure-iot-device-http").clientFromConnectionString;

// AMQP-specific factory function returns Client object from core package
var client = clientFromConnectionString(connectionString);

// use Message object from core package
var Message = require("azure-iot-device").Message;

const sendMessage = () => {
  const msgBody = {
    Athor: "Jakub",
    date: Date.now(),
    HR: util.generateRandomHR(),
  };
  const msgBodyString = JSON.stringify(msgBody);
  var msg = new Message(msgBodyString);
  client.sendEvent(msg, function (err) {
    if (err) {
      console.log(err.toString());
    } else {
      console.log("Message sent:\n" + msgBodyString);
    }
  });
};

var connectCallback = function (err) {
  if (err) {
    console.error("Could not connect: " + err);
  } else {
    console.log("Client connected");
    setInterval(sendMessage, 10000);
  }
};

client.open(connectCallback);

client.close();
//console.log("Woriking");
