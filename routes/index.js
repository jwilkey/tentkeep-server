var express = require('express')
var router = express.Router()
var Mailgun = require('mailgun-js')

router.get('/', (req, res, next) => {
  res.render('index', { title: 'Tentkeep server' })
})

router.post('/mail', (req, res) => {
  const apiKey = process.env.MAILGUN_KEY
  const domain = process.env.MAILGUN_DOMAIN
  var mailgun = new Mailgun({apiKey, domain})

  var data = {
    from: process.env.MAILGUN_FROM,
    to: process.env.MAILGUN_TO,
    subject: req.body.subject,
    html: req.body.content
  }

  mailgun.messages().send(data, function (err, body) {
    if (err) {
      console.log(err)
      throw new Error('Error sending message')
    } else {
      res.json({success: true})
    }
  })
})

module.exports = router;
