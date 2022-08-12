import  express  from "express"
import config from "./config"
const nunjucks = require('nunjucks')
const indexRouter = require('./routes/index')
const advertRouter = require('./routes/advert')
const bodyParser = require('body-parser')
const app = express()
const port = 3000

app.use('/node_modules',express.static(config.node_modules_path))
app.use('/public',express.static(config.public_path))

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))
//当extended
//为false的时候，键值对中的值就为'String'或'Array'形式，
//为true的时候，则可为任何数据类型

// parse application/json
app.use(bodyParser.json())

nunjucks.configure(config.viewPath, { 
    autoescape: true ,
    express: app ,
    noCache: true
})

app.use(indexRouter)
app.use(advertRouter)

app.use((err,req,res,next)=>{
    res.json({
        code:500,
        message:err.message
    })
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))