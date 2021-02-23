const express = require('express')
const app = express()
const logger = require('morgan')
const bodyParser = require('body-parser')
const mainNavigation = require('./src/routes')
const multer = require('multer')
const { port } = require('./src/configs')
const cors = require('cors')
const swaggerUi = require('swagger-ui-express'),
    swaggerDocument = require('./swagger.json');
// const redis = require('redis')

// var corsOptions = {
//     origin: 'http://192.168.1.6:4000/pos/search',
//     optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
// }

// app.get('/pos/search/', cors()rs, function (req, res, next) {
//     res.json({ msg: 'This is CORS-enabled for only example.com' })
// })

app.listen(port, () => console.log(`This is server running ${port}`))
app.use(cors('*'))
// app.listen(80, function () {
//     console.log('CORS-enabled web server listening on port 80')
// })
var whitelist = ['http://localhost:3000/', 'http://example2.com']
var corsOptions = {
    origin: function (origin, callback) {
        if (whitelist.indexOf(origin) !== -1) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    }
}


app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}))

app.use('/', mainNavigation, swaggerUi.serve, swaggerUi.setup(swaggerDocument))