//导包
const express = require('express')
const path = require('path')
var bodyParser = require('body-parser')
var session = require('express-session')



//创建app
const app = express()
//使用 body-parser
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: false
}))

// parse application/json
app.use(bodyParser.json())

//使用express-session

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 600000
    }
}))

//创建静态页面根目录
app.use(express.static(path.join(__dirname, '/public')))

//权限控制
app.all('/*', (req, res, next) => {
    if (req.url.includes('account')) {
        next()
    } else {
        if (req.session.username) {
            next()
        } else {
            res.send(`<script>alert('您还没有登录，请先登录!');location.href='/account/login'</script>`)
        }
    }

})
//导入路由对象
const accountRouter = require(path.join(__dirname, 'routers/accountRouter.js'))


const studentRouter = require(path.join(__dirname, 'routers/studentRouter.js'))
//处理请求
app.use('/account', accountRouter)
app.use('/student', studentRouter)



//启动
app.listen(3000, '127.0.0.1', err => {
    if (err) {
        console.log(err)
    }


    console.log("start ok")
})