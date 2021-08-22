// const express = require("express");
// const VoiceResponse = require("twilio").twiml.VoiceResponse;

// const app = express();

// app.post("/voice", (request, response) => {
//   const twiml = new VoiceResponse();
//   twiml.say("hello there thanks for calling , we will get back to you shorty");

//   // Render the response as XML in reply to the webhook request
//   res.type("text/xml");
//   res.send(twiml.toString());
// });

// // Create an HTTP server and listen for requests on port 3000
// app.listen(1337, () => {
//   console.log(
//     "Now listening on port 1337. " +
//       "Be sure to restart when you make code changes!"
//   );
// });
