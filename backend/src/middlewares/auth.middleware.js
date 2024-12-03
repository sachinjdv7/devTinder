const auth = (req, res, next) => {
  console.log('middleware checked...');
  const token = 'sachin';
  const isAdmin = token === 'sachin';
  if (!isAdmin) res.status(401).send('user is not valid');
  next();
};

const userAuth = (req, res, next) => {
  console.log('middleware checked...');
  const token = 'sachin';
  const isAdmin = token === 'sachin';
  if (!isAdmin) res.status(401).send('user is not valid');
  next();
};

module.exports = {
  auth,
  userAuth,
};
