const path =require('path')
const template = require("art-template");
//mongodb设置
const MongoClient = require('mongodb').MongoClient;
 
// Connection URL
const url = 'mongodb://localhost:27017';
 
// Database Name
const dbName = 'user';

//获取页面
exports.getstudentPage=(req,res)=>{
    MongoClient.connect(url, { useNewUrlParser: true },function(err, client) {
     // 拿到的数据库db对象
        const db = client.db(dbName);
       // 拿到要操作的集合
      const collection = db.collection("student");
    //   查询多条
      collection.find({}).toArray((err,docs)=>{
          const html=template(path.join(__dirname,'../public/views/list.html'),{students:docs})
          res.send(html)
      })
        client.close();
      });
}
