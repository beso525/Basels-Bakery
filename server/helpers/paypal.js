const paypal = require('paypal-rest-sdk')

paypal.configure({
  mode: 'sandbox',
  client_id: 'AeNvz712ZcZbIkwJz1bHFnKasHo6dD4cW8zafY1Les1ro6ISevRLN64E9p4PN2AFPrkIP3VgW_DXDnff',
  client_secret : 'EKqEAJSI2hX4nY4l0QtlOKKA1V0PbpGYqDib4O1ToT_mtKMsp4p-Ke9A_2Rzwa2WSHdNn-aZRhhCd9H_',
})

module.exports = paypal;