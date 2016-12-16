import { getApiConfig } from '../rules-core/config/api';

module.exports = function getAccessByApikey(req, res, next) {
  if (req.query.apikey === getApiConfig('apiKey')) {
    next();
  } else {
    res.status(401).send('Wrong API Key!');
  }
};
