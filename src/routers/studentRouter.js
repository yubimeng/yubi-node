const express=require('express')
const path=require('path')

//创建路由对象
const studentRouter=express.Router()
//导入控制台
const studentController=require(path.join(__dirname,'../controllers/studentController'))

studentRouter.get('/manager',studentController.getstudentPage)






module.exports=studentRouter