module.exports = (username, password) => {

  const QUERY = 'http://localhost:3000/api/users';

    const requestObj = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: username,
        password: password
      })
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