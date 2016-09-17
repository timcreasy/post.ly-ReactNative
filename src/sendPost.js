module.exports = (body, username) => {

  // CREATES SESSION TOKEN
  const QUERY = 'http://localhost:3000/api/posts';

    const requestObj = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: username,
        body: body
      })
    };

    return fetch(QUERY, requestObj)
    .then((response) => {
      return response.json();
    })
    .then((post) => {
      return post;
    })
    .catch(err => console.log(err));

};