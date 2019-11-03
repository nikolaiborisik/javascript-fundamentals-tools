let currentUser;
const changeListeners = [];

function emitUserUpdate() {
  console.log("Emit updates");
  changeListeners.map(cb => cb(currentUser));
}

export const userStore = {
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
