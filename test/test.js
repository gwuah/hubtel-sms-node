const hubtel = require('../lib')({
  clientId: "id here",
  clientSecret: "secret here"
});

let payload = {
  from: "Ronny",
  to: '+233244151524',
  registeredDelivery: true,
  message: 'Yo, this should work.. hehe'
}

hubtel.sendSMS(payload).then((response) => {
  console.log(response)
}).catch(error => {
  console.log(error.message)
})