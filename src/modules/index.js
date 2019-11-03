import "./index.css";
import { initUserInfo } from "./userInfo.js";
import { initUserForm } from "./userForm";

const initApp = () => {
  document.addEventListener("DOMContentLoaded", () => {
    console.log("Init application");
    initUserForm(document.getElementById("userForm"));
    initUserInfo(document.getElementById("userInfo"));
  });
};

initApp();
