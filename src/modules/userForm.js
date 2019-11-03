import { userStore } from "./userStore";
import "./userForm.css";

const template = `
<h2>User form</h2>
<div class="userForm-item">
    <label class="userForm-label" for="name">Name:</label>
    <input type="text" id="name"/>
</div>
<div class="userForm-item">
    <label class="userForm-label" for="age">Age:</label>
    <input type="text" id="age"/>
</div>
<h5>Address</h5>
<div class="userForm-item">
    <label class="userForm-label" for="city">City:</label>
    <input type="text" id="city"/>
</div>
<div class="userForm-item">
    <label class="userForm-label" for="street">Street:</label>
    <input type="text" id="street"
    />
</div>
<button id="saveButton">Save</button>
`;

function getFormData() {
  const name = document.getElementById("name").value;
  const age = document.getElementById("age").value;
  const city = document.getElementById("city").value;
  const street = document.getElementById("street").value;
  const user = { name, age };
  if (city || street) {
    user.address = {
      ...(city && { city }),
      ...(street && { street })
    };
  }

  return user;
}

export function initUserForm(parent) {
  console.log("UserForm: init");
  const host = document.createElement("div");
  host.innerHTML = template;
  parent.append(host);
  host.querySelector("#saveButton").addEventListener("click", event => {
    console.log("UserForm: save button click");
    event.preventDefault();
    userStore.setUser(getFormData());
  });
}

let unusedVariable;
