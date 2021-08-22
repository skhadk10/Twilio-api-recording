// require("dotenv").config();
const express = require("express");
const twilio = require("./Twilio");
const cors = require("cors");
const http = require("http");
const socketIo = require("socket.io");
const jwt = require("./utils/Jwt.js");

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

io.on("connection", (socket) => {
  console.log("socket connected", socket.id);
  socket.on("diconnection", (socket) => {
    console.log("socket diconnected", socket.id);
  });
});

// parse application/json
app.use(express.json());
app.use(cors());
const PORT = 8000;
// const accountSid = process.env.TWILIO_ACCOUNT_SID;
// const authToken = process.env.TWILIO_AUTH_TOKEN;

// const client = require("twilio")(accountSid, authToken);
app.get("/test", (req, res) => {
  res.send("hello there");
});

// login
app.post("/login", async (req, res) => {
  console.log("login");
  const { to, username, channel } = req.body;
  const data = await twilio.sendVerifyAsync(to, channel);
  res.send(data);
});

// verify the code
app.post("/verify", async (req, res) => {
  console.log("verify");
  const { to, code, username } = req.body;
  const data = await twilio.VerifyCodeAsync(to, code);
  if (data.status === "approved") {
    const token = jwt.createJwt(username);
    return res.send({ token });
  }
  res.status(401).send("Invalid token");
});

// new call process
app.post("/makecall", (req, res) => {
  console.log("receive new calls",req.body);
  io.emit('makecall',{data:req.body})
  const response = twilio.voiceResponse("Thank you for your call");
  res.type("text/xml");
  res.send(response.toString());
});

//  call status
app.post("/callStatusChanged", (req, res) => {
  console.log("call status changed");
  res.send("ok");
});
server.listen(PORT, () => {
  console.log("Now listening on port 8000. ");
});
