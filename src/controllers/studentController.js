const path = require('path')
const template = require("art-template");
//mongodb设置
// const MongoClient = require('mongodb').MongoClient;
// //导入mongodb操作tool

const databasetool = require(path.join(__dirname, '../tools/databasetool'))
// // Connection URL
// const url = 'mongodb://localhost:27017';

// // Database Name
// const dbName = 'user';

//获取页面
exports.getstudentPage = (req, res) => {

  const keyword = req.query.keyword || ''

  databasetool.dofind('student', {
    name: {
      $regex: keyword
    }
  }, (arr, docs) => {

    const html = template(path.join(__dirname, '../public/views/list.html'), {
      students: docs,
      keyword
    })
    res.send(html)
  })
}
//获取学生添加页面
exports.getaddPage = (req, res) => {
  var html = template(path.join(__dirname, '../public/views/add.html'), {})
  res.send(html)
}

//学生添加功能

exports.doAddStudent = (req, res) => {
  databasetool.doinsertone("student", req.body, (err, docs) => {
    if (docs) {
      res.send("<script>location.href='/student/list'</script>")
    } else {
      res.send("<script>alert('注册失败')</script>")
    }
  })
}


//删除学生信息
exports.deleteStudent = (req, res) => {
 const _id = databasetool.ObjectId(req.params.id)
databasetool.doDeleteOne('student',{_id},(err,doc)=>{
  if (doc) {
    res.send("<script>location.href='/student/list'</script>")
  } else {
    res.send("<script>alert('删除失败')</script>")
  }
})
}

//获取编辑学生信息

exports.editStudent = (req, res) => {
  const _id = databasetool.ObjectId(req.params.id);

  databasetool.dofindOne('student', {
    _id
  }, (err, docs) => {
    console.log(docs);

    const html = template(path.join(__dirname, '../public/views/edit.html'), docs)
    res.send(html)
  })
}

//修改学生信息

exports.updatestudent = (req, res) => {
  const _id = databasetool.ObjectId(req.params.id);
  databasetool.doupdate("student", {_id}, req.body, (err, doc) => {

    if (doc) {
      res.send("<script>location.href='/student/list'</script>")
    } else {
      res.send("<script>alert('修改失败')</script>")
    }
  })

}

//删除学生信息
