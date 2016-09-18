module.exports = (username, password) => {

  // CREATES SESSION TOKEN
  const QUERY = 'http://104.236.71.66:8080/api/sessions';

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
    .then((data) => {
      return data.token;
    })
    .catch(err => console.log(err));

};