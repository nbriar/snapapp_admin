var fs = require('fs')

var config = {
  "AUTH0_CLIENT_ID": process.env.AUTH0_CLIENT_ID,
  "AUTH0_CLIENT_DOMAIN": process.env.AUTH0_CLIENT_DOMAIN
}

var json = JSON.stringify(config)

fs.writeFile('config.json', json, 'utf8', function(err) {
    if (err) throw err
    console.log('Created config.json')
})
