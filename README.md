# hubtel-sms-node
A node wrapper around hubtel sms api. [WIP]

### Installation

```bash
yarn add hubtel-sms-node
```

### Usage

Making a payment request

```javascript

const hubtel = require('hubtel-sms-node')({
  ClientId: 'your key here',
  ClientSecret:  'your secret here'
});

let payload = {
  from: "Sample Message",
  to: '2330244161819',
  registeredDelivery: true,
  message: 'Yo, this should work.. hehe'
}

hubtel.sendSMS(payload).then((response) => {
 /* play with response */
}).catch(error => {
  /* handle errors here */
})
```

### Todo
- [ ] Update docs to include type of response recieved after making request.
- [ ] Check status of messages sent (add new method)
- [ ] Add a 5 second break between requests to make sure we are following api rules.
- [x] Sanitize and encode input
- [x] Write tests for library
- [x] Use a seperate method to build url
