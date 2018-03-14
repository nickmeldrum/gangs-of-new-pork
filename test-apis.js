const waitroseApi = require('./waitrose-api')

const main = () => {
  const searchTerm = process.argv[2];

  waitroseApi.login()
    .then(() => {
      return waitroseApi.token()
        .then(data => {
          console.log('umwat', data)
        })
    })
    .catch(err => console.error(err))
};

main();
