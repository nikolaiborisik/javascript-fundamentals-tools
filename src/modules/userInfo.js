import { userStore } from "./userStore";
import "./userInfo.css";

const template = `
   <h2>User info</h2>
    <div class="userInfo-row">
        <div class="userInfo-label">Name:</div>
        <div class="userInfo-value" id="userInfoName"></div>
    </div> 
    <div  class="userInfo-row">
        <div class="userInfo-label">Age:</div>
        <div class="userInfo-value" id="userInfoAge"></div>
    </div> 
    <div  class="userInfo-row">
        <div class="userInfo-label">City:</div>
        <div class="userInfo-value" id="userInfoCity"></div>
    </div> 
    <div  class="userInfo-row">
        <div class="userInfo-label">Street:</div>
        <div class="userInfo-value" id="userInfoStreet"></div>
    </div> 
`;

export function initUserInfo(parent) {
  console.log("User info: init");
  userStore.addChangeListener(updateUserInfo);
  const host = document.createElement("div");
  host.innerHTML = template;
  parent.append(host);
}

function updateUserInfo(user) {
  console.log("User info: update");
  document.getElementById("userInfoName").innerText = user.name;
  document.getElementById("userInfoAge").innerText = user.age;
  document.getElementById("userInfoCity").innerText =
    (user.address && user.address.city) || "";
  // document.getElementById('userInfoStreet').innerText = user.address && user.address.street || '';
  document.getElementById("userInfoStreet").innerText =
    user.address?.street || "";
}

let a = 1;
let b = 2;
let c = a == b;
