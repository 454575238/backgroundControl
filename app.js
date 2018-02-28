/*
* @Author: Marte
* @Date:   2018-01-22 09:07:03
* @Last Modified by:   Marte
* @Last Modified time: 2018-01-25 16:29:31
*/

'use strict';
var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var upload = require("./util/upload")
var app = express();
var User = require("./model/user");
var Position = require("./model/position")

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static("pages"));
app.use(express.static("static"));
app.use(express.static("uploadcache"));
app.use(express.static("./"));
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://127.0.0.1:27017/project")
.then(function(db){
    console.log("连接数据库成功");
});
//账号是否存在验证
app.post("/check/username",function(req,res){
    let {username} = req.body;

    User.find({username},function(err,doc){
        if(err){
            console.log(err);
            return;

        }else{
            if(doc.length!==0){
                res.json({
                     code:1,
                     msg:"你输入到用户已经被使用了"

                })
            }else{
                res.json({
                     code:0,
                     msg:"该用户可用"

                })
            }
        }
    })



})
//用户注册将账号添加到数据库
app.post("/register",function(req,res){



     let{username,password,email} = req.body;
     var u = new User({username,password,email});
     u.save(function(err,doc){
        if(err){
            console.log(err)
        }else{
            res.json({
                code:0,
                msg:"注册成功"
            })
        }
     })
})

//实现用户登录

 app.post("/login",function(req,res){

      let {username,password} = req.body;
      User.find({username,password},function(err,doc){

                 if(err){
                    console.log(err)
                    return;
                 }else{
                    if(doc.length===0){
                        res.json({
                            code:1,
                            msg:"你输入到账号密码不正确"
                        })
                    }else{
                             res.json({
                            code:0,
                            msg:"登录成功",
                            doc:doc[0].username
                        })
                        }
                 }
      })
 })

//图片的传输
app.post("/img",function(req,res){
    upload.upload(req,res);
})
//

//向数据库中获取职位信息
var len = 0;
var len2 = 0;
var users;
app.post("/api/position",function(req,res){
  var index2 = req.body.index2-0||1;
  var index = req.body.index-0||1;
 User.find({},function(err,doc){
      len2 = doc.length;
 });

 User.find({},function(err,doc){
      users = doc;

 }).skip((index2-1)*5).limit(5);



       let   {username} = req.body;




   Position.find({username},function(err,doc){

               len = doc.length

   });

      Position.find({username},function(err,doc){

           res.json({

            list:doc,
             len:len,
             len2:len2,
             msg:index,
             msg2:index2,
             users:users
           })

      }).skip((index-1)*5).limit(5);

})

//向数据库中添加职位信息
app.post("/position",function(req,res){

     let{position,company,experience,type,address,
salary,logo,username}=req.body
   var p = new Position({position,company,experience,type,address,
salary,logo,username});
   p.save(function(err,doc){
         if(err){
            console.log(err);
            return
         }else{
            res.json({
                code:0,
                msg:doc
            })
         }
   })




})

//删除某个职位信息
app.post("/delete",function(req,res){
    let{_id}  = req.body;
 Position.findOneAndRemove({_id},function(err,doc){
       if(err){
        console.log(err)
       }else{
        res.json({
            code:0,
            msg:"删除成功"
        })
       }
 });





})
//删除用户信息
app.post("/users/delete",function(req,res){
   let{_id}  = req.body;
User.findOneAndRemove({_id},function(err,doc){
       if(err){
        console.log(err)
       }else{
        res.json({
            code:0,
            msg:"删除成功"
        })
       }
 })
})







//修改某个职位信息
app.post("/update",function(req,res){
   let{position,company,experience,type,address,
salary,logo,_id} = req.body;

Position.findOneAndUpdate({_id},{position,company,experience,type,address,
salary,logo},{new:true},function(err,doc){

       if(err){
        console.log(err);
        return;

       }else{
        res.json({
            code:0,
            msg:doc
        })
       }
})


})


app.listen(8090,function(){
    console.log("成功");
})
