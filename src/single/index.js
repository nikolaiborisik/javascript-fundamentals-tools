const userStore = (function() {
  let currentUser;

  const changeListeners = [];

  function emitUserUpdate() {
    console.log("Emit updates");
    changeListeners.map(cb => cb(currentUser));
  }

  return {
    getUser() {
      return currentUser;
    },

    setUser(user) {
      currentUser = user;
      emitUserUpdate(user);
    },

    addChangeListener(callback) {
      changeListeners.push(callback);
    }
  };
})();

const initUserForm = function() {
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

  return function initUserForm(parent) {
    console.log("UserForm: init");
    const host = document.createElement("div");
    host.innerHTML = template;
    parent.append(host);
    host.querySelector("#saveButton").addEventListener("click", event => {
      console.log("UserForm: save button click");
      event.preventDefault();
      userStore.setUser(getFormData());
    });
  };
};

const initUserInfo = (function() {
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

  function updateUserInfo(user) {
    console.log("User info: update");
    document.getElementById("userInfoName").innerText = user.name;
    document.getElementById("userInfoAge").innerText = user.age;
    document.getElementById("userInfoCity").innerText =
      (user.address && user.address.city) || "";
    document.getElementById('userInfoStreet').innerText = user.address && user.address.street || '';
    // document.getElementById("userInfoStreet").innerText =
    //   user.address?.street || "";
  }

  return function initUserInfo(parent) {
    console.log("User info: init");
    userStore.addChangeListener(updateUserInfo);
    const host = document.createElement("div");
    host.innerHTML = template;
    parent.append(host);
  };
})();

const initApp = () => {
  document.addEventListener("DOMContentLoaded", () => {
    console.log("Init application");
    initUserForm(document.getElementById("userForm"));
    initUserInfo(document.getElementById("userInfo"));
  });
};

initApp();
