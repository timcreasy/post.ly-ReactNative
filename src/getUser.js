module.exports = (token) => {

  // GETS USER
  const QUERY = 'http://localhost:3000/api/users';

    const requestObj = {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'x-auth': token
      }
    };

    return fetch(QUERY, requestObj)
    .then((response) => {
      return response.json();
    })
    .then((userData) => {
      return userData;
    })
    .catch(err => console.log(err));

};