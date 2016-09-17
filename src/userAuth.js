let _currentUser = null;

module.exports = {
  setUser(token) {
    _currentUser = token;
  },
  getUser() {
    return _currentUser;
  }
};
