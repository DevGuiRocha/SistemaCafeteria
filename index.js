const express = require('express')
const exphbs = require('express-handlebars')
const session = require('express-session')
const FileStrore = require('session-file-store')(session)
const flash = require('express-flash')

const app = express()

const conn = require('./db/conn')

//Models
const Usuario = require('./models/Usuario')
const Compra = require('./models/Compra')

// Import Routes
const cafeRotas = require('./routes/cafeRotas')
const authRotas = require('./routes/authRotas')

// Import Controller
const cafeController = require('./controllers/cafeController')

//template engine
app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')

//receber a resposta do body
app.use(
    express.urlencoded({
        extended: true
    })
)

app.use(express.json())

//Session middleware
app.use(
    session({
        name: 'session',
        secret: "nosso_segredo",
        resave: false,
        saveUninitialized: false,
        store: new FileStrore({
            logFn: function () {},
            path: require('path').join(require('os').tmpdir(), 'sessions')
        }),
        cookie: {
            secure: false,
            maxAge: 3000,
            expires: new Date(Date.now() + 360000),
            httpOnly: true
        }
    })
)

//flash messages
app.use(flash())

//public path
app.use(express.static('public'))

//set session to reset
app.use((req, res, next) => {
    if (req.session.userid){
        res.locals.session = req.session
    }

    next()
})

//Rotas
app.use('/cafe', cafeRotas)
app.use('/', authRotas)

//Controllers
app.get('/', cafeController.showCafe)

conn
    //.sync({force: true})
    .sync()
    .then(() =>{
        app.listen(3000)
    })
    .catch((err)=> console.log(err))