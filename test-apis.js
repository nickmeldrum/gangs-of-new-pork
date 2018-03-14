const waitroseApi = require('./waitrose-api')

const main = () => {
  const searchTerm = process.argv[2];

  waitroseApi.token(searchTerm);
};

main();
