var express = require("express"),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    override = require("method-override"),
    app = express()
    app.use(bodyParser.urlencoded({ extended: true }))
    mongoose.connect(process.env.DATABASEURL || "mongodb://localhost/blogsite")
    app.set("view engine","ejs")
    app.use(express.static("public")) 
    app.use(override('_method'))
    
    var blogSchema = new mongoose.Schema({
        title:String,
        image:String,
        discription : String,
        posted:{type:Date, default:Date.now}
        
    })
    var Blog = mongoose.model("Blog",blogSchema)
    
    
app.get("/",function(req,res){
    res.redirect("/blog")
})

app.get("/blog",function(req,res){
    Blog.find({},function(err,blog){
        if(err){console.log("error occured")} else{
             res.render("blog",{blog:blog})
        }
    })
   
})
    
app.get("/blog/new",function(req,res){
    res.render("form")
})

app.post("/blog",function(req,res){
    Blog.create(req.body.blog,function(err,body){
        if(err){console.log("error  occured")} else {
            res.redirect("/blog")
        }
    })
})

app.get("/blog/:id",function(req,res){
  Blog.findById(req.params.id,function(err,foundData){
      if(err){console.log("erroe")}else {
          res.render("show",{id:foundData})
      }
  })
})

app.get("/blog/:id/edit",function(req,res){
    Blog.findById(req.params.id,function(err,id){
        if(err){console.log("error")}else{
            res.render("updateForm",{id:id})
        }
    })
    
})

app.put("/blog/:id",function(req,res){
    Blog.findByIdAndUpdate(req.params.id,req.body.blog,function(err,found){
        if(err){console.log("error")}else{
            res.redirect("/blog/"+req.params.id)
        }
    })
})

app.delete("/blog/:id",function(req,res){
    Blog.findByIdAndRemove(req.params.id,function(err,del){
        if(err){console.log("error")} else{
            res.redirect("/")
        }
    })
})
app.listen(process.env.PORT,process.env.IP,function(){
    console.log("blog server connected")
})