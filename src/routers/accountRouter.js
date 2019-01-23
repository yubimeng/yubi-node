//导包
const express=require("express")
const path=require("path")

//创建路由对象

const accountRouter=express.Router()

//导入控制器模块
const accountController=require(path.join(__dirname,"../controllers/accountController"))

//MVC
//获取注册页面的请求
accountRouter.get('/register',accountController.getRegisterPage)
//注册请求
accountRouter.post('/register',accountController.register)
//获取登录的请求
accountRouter.get('/login',accountController.getLoginPage)
//处理登录按钮请求
accountRouter.post('/login',accountController.doLogin)
//处理图片获取请求
accountRouter.get('/scode',accountController.getScode)
//退出账号
accountRouter.get('/logout',accountController.logout)


module.exports=accountRouter