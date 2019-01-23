const express=require('express')
const path=require('path')

//创建路由对象
const studentRouter=express.Router()
//导入控制台
const studentController=require(path.join(__dirname,'../controllers/studentController'))

studentRouter.get('/list',studentController.getstudentPage)
studentRouter.get('/list/:id',studentController.deleteStudent)
studentRouter.get('/edit/:id',studentController.editStudent)
studentRouter.post('/edit/:id',studentController.updatestudent)
studentRouter.get('/add',studentController.getaddPage)
studentRouter.post('/add',studentController.doAddStudent)







module.exports=studentRouter