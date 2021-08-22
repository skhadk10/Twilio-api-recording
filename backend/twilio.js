const twilio = require("twilio");
const VoiceResponse = require("twilio/lib/twiml/VoiceResponse");

class Twilio {
  phoneNumber = "+61253012361";
  phoneNumberSid = "PN5236a7ac466bf523b996838976cbb70c";
  tokenSid = "SK91212f7fefb6e89cb7bef6e9e7f6d91a";
  tokenSecret = "5pduOFDoOTZUNHDDAKQOJKz23beyC1py";
  verify = "VA05343f46a240a7cee22301b15750502f";
  accountSid = "AC039214bb5add629c9a3b255606e495b0";
  client;

  constructor() {
    this.client = twilio(this.tokenSid, this.tokenSecret, {
      accountSid: this.accountSid,
    });
  }
  getTwilio() {
    this.client;
  }
  async sendVerifyAsync(to, channel) {
    const data = await this.client.verify
      .services(this.verify)
      .verifications.create({ to, channel });

    return data;
  }
  async VerifyCodeAsync(to, code) {
    const data = await this.client.verify
      .services(this.verify)
      .verificationChecks.create({ to, code });
    return data;
  }

  voiceResponse(message) {
    const twiml = new VoiceResponse();
    twiml.say(
      {
        voice: "Polly.Aditi",
        loop: 2,
      },
      message
    );
    return twiml;
  }
}
const instance = new Twilio();
Object.freeze(instance);

module.exports = instance;
