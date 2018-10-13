const {
  isValidTelephoneNumber, 
  extractValidProps, 
  trimUndefinedProps
} = require('./utils');
const qs = require('query-string');
const axios = require('axios');


function Hubtel({clientId, clientSecret}) {

  if (!(this instanceof Hubtel)) {
    return new Hubtel({clientId, clientSecret})
  };

  if (!clientId) {
    throw new Error('Required clientId prop not present')
  }
  
  if (!clientSecret) {
    throw new Error('Required clientSecret prop not present')
  }

  this.opts = {};
  this.opts.clientId = clientId;
  this.opts.clientSecret = clientSecret;
  this.opts.baseUrl= 'https://api.hubtel.com/v1/messages';
  this.opts.messageEndpoint = 'https://api.hubtel.com/v1/messages/send';

  // https://api.hubtel.com/v1/messages/send?From={From}&To={To}&Content={Content}&ClientId={ClientId}&ClientSecret={ClientSecret}&RegisteredDelivery={RegisteredDelivery}

}

Hubtel.prototype.buildUrl = function(
  {from, to, message, registeredDelivery, reference}
) {
  const {clientId, clientSecret, messageEndpoint} = this.opts;
  const payload = {
    From: from,
    To: to,
    Content: message,
    RegisteredDelivery: registeredDelivery || true,
    ClientId: clientId,
    ClientSecret: clientSecret,
    ClientReference: reference
  };

  this.queryUrl = `${messageEndpoint}?${qs.stringify(payload)}`;

  console.log(this.queryUrl)

  return this.queryUrl

}

Hubtel.prototype.sendSMS = function(args) {
  const validProps = ["from", "to", "message", "registeredDelivery"];
  const newObject = extractValidProps({body: args, validProps});
  const cleanObject = trimUndefinedProps(newObject);


  // i'm only validating to's because sometimes, from can be a string.
  if (!isValidTelephoneNumber(cleanObject.to)) {
    throw new Error(`Invalid phone number passed >> ${cleanObject.to}`)
  }

  const queryUrl = this.buildUrl(cleanObject);

  return new Promise((res, rej) => {
    axios.get(queryUrl)
    .then(({data}) => res(data))
    .catch(rej)
  })

}

module.exports = Hubtel;