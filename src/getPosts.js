module.exports = () => {

  // GETS USER
  const QUERY = 'http://104.236.71.66:8080/api/posts';

    const requestObj = {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      }
    };

    return fetch(QUERY, requestObj)
    .then((response) => {
      return response.json();
    })
    .then((posts) => {
      return posts;
    })
    .catch(err => console.log(err));

};