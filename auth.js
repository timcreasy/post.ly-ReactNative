let _currentUser = null;

module.exports = {
  setUser(username) {
    _currentUser = username;
  },
  getUser() {
    return _currentUser;
  }
};