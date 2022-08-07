const express = require('express')
const serverStatic = require('serve-static')
const path = require('path')
const history = require('connect-history-api-fallback');


const app = express()
const port = process.env.PORT || 3000
app.use(history());


// SERVES FILES from our dist directory which now contains out index.html
app.use('/', serverStatic(path.join(__dirname, '/dist')))
app.listen(port)
console.log('Listening on port:' + port)
// app.get('/', (req, res) => res.send('Hello World!'))
// app.listen(port, () => console.log(`Example app listening on port port!`))



