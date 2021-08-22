import axios from "./utils/Axios.js";
import socket from "./utils/Socketio.js";
import Login from "./component/Login.js";
import { useImmer } from "use-immer";
import { useEffect, useState } from "react";
import useLocalStorage from "./component/hooks/useLocalStorage";
import NavBar from "./component/NavBar.js";
import CallCanter from "./component/CallCanter.js";
function App() {
  const [storetoken, setStoretoken] = useLocalStorage("token", null);
  useEffect(() => {
    socket.on("disconnect", () => {
      console.log("socket disconnected");
    });
  }, []);

  const [user, setUser] = useImmer({
    username: "",
    mobileNumber: "",
    verificationCode: "",
    verificationSent: false,
  });
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    console.log({ name, value });
    setUser({ ...user, [name]: value });
  };

  const sendSmsCode = async () => {
    console.log("sending Sms");
    const data = await axios.post("/login", {
      to: user.mobileNumber,
      username: user.username,
      channel: "sms",
    });

    setUser((draft) => {
      draft.verificationSent = true;
    });
    console.log("app smscode", data);
  };

  const sentVerificationCode = async () => {
    console.log("sent verificationCode");
    const response = await axios.post("/verify", {
      to: user.mobileNumber,
      code: user.verificationCode,
      username: user.username,
    });
    console.log("receive token response", response.data.token);
    setStoretoken(response.data.token);
  };

  return (
    <div>
      {storetoken ? (
        <CallCanter />
      ) : (
        <Login
          user={user}
          handleOnChange={handleOnChange}
          sendSmsCode={sendSmsCode}
          sentVerificationCode={sentVerificationCode}
        />
      )}
    </div>
  );
}

export default App;
