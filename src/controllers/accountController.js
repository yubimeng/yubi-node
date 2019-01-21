const path = require('path')
const MongoClient = require('mongodb').MongoClient;

var captchapng = require('captchapng');

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'user';


//导出一个获取页面的方法

exports.getRegisterPage = (req, res) => {
    res.sendFile(path.join(__dirname, '../public/views/register.html'))
}

//导出注册的方法

exports.register = (req, res) => {
    const result = {
        status: 0,
        message: '注册成功' 
    }
    //拿到浏览器的数据  
    const {username} = req.body
    console.log(username)
    //先判断用户名是否重复,如果存在,返回mongo提示
    // Use connect method to connect to the server
    MongoClient.connect(url, {
        useNewUrlParser: true
    }, function (err, client) {

        //console.log("Connected successfully to server");

        const db = client.db(dbName);
        //拿到集合
        const collection = db.collection('users')
        //查询一个
        collection.findOne({
            username
        }, (err, doc) => {
            if (doc) {
                result.status = 1,
                    result.message = '用户名已经存在'
            } else {
                 //3、如果用户名不存在，插入到数据库中
                collection.insertOne(req.body, (err, res) => {
                    if (!res) {
                        res.stult = 2,
                            res.message = '注册失败'
                    }

                })
            }
            //关闭数据库
            client.close();
            //返回
            res.json(result)
        })

    });

}
//处理获取登录页面
exports.getLoginPage=(req,res)=>{
    res.sendFile(path.join(__dirname,'../public/views/login.html'))
}
//处理图片获取
exports.getScode=(req,res)=>{
        const num=parseInt(Math.random()*9000+1000)
        req.session.scode=num
        var p = new captchapng(80,30,num); // width,height,numeric captcha        
        p.color(0, 0, 0, 0);  // First color: background (red, green, blue, alpha)
        p.color(80, 80, 80, 255); // Second color: paint (red, green, blue, alpha)
        var img = p.getBase64();
        var imgbase64 =Buffer.from(img,'base64');    
           
        res.writeHead(200, {
            'Content-Type': 'image/png'
        });
        res.end(imgbase64);
}

exports.doLogin=(req,res)=>{
    const result={
        status:0,
        message:'登录成功'
    }
    const {username,password,scode}=req.body
    //验证码错误
    if(scode!=req.session.scode){
        result.status=1
        result.message='验证码错误'
        res.json(result)
        return
    }
    //验证码正确,继续验证账号和密码
    MongoClient.connect(url, function(err, client) {
            
        const db = client.db(dbName);
        const collection = db.collection('users')
        collection.findOne({username,password},(err,doc)=>{
            if(!doc){
                result.status=2,
                result.message='账号或者密码错误'
            }
            res.json(result)
        })
        client.close();
      });
}