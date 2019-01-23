//mongodb函数封装

//mongodb设置
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require("mongodb").ObjectId;
// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'user';

// 封装获取集合函数

function getcollection(docGather, callback) {
    MongoClient.connect(url, {
        useNewUrlParser: true
    }, function (err, client) {
        // 拿到的数据库db对象
        const db = client.db(dbName);
        // 拿到要操作的集合
        const collection = db.collection(docGather);
        callback(collection)
        client.close();
    })
}


//查询多个
function dofind(docGather, data, callback) {
    getcollection(docGather, collection => {
        collection.find(data).toArray((err, docs) => {
            
            callback(err, docs)
        })
    })
}


//添加一个

const doinsertone=(docGather, data, callback)=>{
    getcollection(docGather, collection => {
        collection.insertOne(data,(err,res)=>{
            callback(err, res)
        })       
    })
}

//删除一个

const dodeleteOne=(docGather, data, callback)=>{
    getcollection(docGather, collection => {
        collection.deleteOne(data,(err,res)=>{
            callback(err, res)
        })       
    })
}

//查找一个

const dofindOne=(docGather, data, callback)=>{
    
    getcollection(docGather, collection => {
        collection.findOne(data,(err,res)=>{
            callback(err, res)
        })       
    })
}

//编辑一个

 const doupdate=(docGather,con, data, callback)=>{
    
    getcollection(docGather, collection => {
        collection.updateOne(con,{$set:data},(err,res)=>{
            callback(err, res)
        })       
    })
}

const doDeleteOne=(docGather,id, callback)=>{
    getcollection(docGather,collection=>{
        collection.deleteOne(id,(err,res)=>{
            callback(err,res)
        })
    })
}

module.exports = {
    dofind: dofind,
    doinsertone,
    dodeleteOne,
    dofindOne,
    ObjectId,
    doupdate,
    doDeleteOne
}