module.exports = (newPost) => {

  const userToken = require('./userAuth').getUser();

  // CREATES SESSION TOKEN
  const QUERY = 'http://104.236.71.66:8080/api/posts';

    const requestObj = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'x-auth': userToken
      },
      body: JSON.stringify({
        body: newPost.body
      })
    };


    console.log("REQUESTOBJ", requestObj);

    return fetch(QUERY, requestObj)
    .then((response) => {
      console.log("RESPONSE", response);
      return response.json();
    })
    .then((post) => {
      return post;
    })
    .catch(err => console.log(err));

};