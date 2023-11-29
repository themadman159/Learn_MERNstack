//ติดต่อ database

// import models 
const Blogs = require("../models/blog");
const slugify = require('slugify')
const { v4 : uuidv4 }  = require('uuid');


//บันทึกข้อมูล
exports.create = (req, res) => {
    const {title, content, author} = req.body
    let slug = slugify(title)

    if ( !slug ) slug = uuidv4();
    // validate blog
    switch ( true ) { 
        case !title :
            return res.status(400).json({error: "กรุณาป้อนชื่อบทความ"});
            break;
        case !content :
            return res.status(400).json({error: "กรุณาป้อนบทความ"});
            break;
    }
    // บันทึกข้อมูลลง database 
    Blogs.create({ title , content , author, slug} , (err,blog)=> {
        if ( err ) res.status(400).json({error:"มีบทความนี้อยู่แล้ว"})
        res.json(blog);
    })
}

//ดึงข้อมูลมาแสดง
exports.getAllblogs = (req, res) => {
    Blogs.find({}).exec((err, blogs) => {
        res.json(blogs)
    })
}

//ดึงบทความที่สนใจ
exports.singleblog = (req , res) => {
    const {slug} = req.params
    Blogs.findOne({slug}).exec((err, blog) => {
        res.json(blog)
    })
}

//ลบข้อมูล
exports.removeblog = (req, res) =>  {
    const {slug} = req.params
    Blogs.findOneAndDelete({slug}).exec((err, blog)=>{
        if (err) console.log(err);
        res.json({
            message : "ลบข้อมูลเรียบร้อย"
        })
    })
}

//update blog
exports.updateblog = (req, res) => {
    const {slug} = req.params
    //export data to new blog
    const { title, content, author } = req.body
    Blogs.findOneAndUpdate({slug},{title, content, author},{new:true}).exec((err, blog)=> {
        if (err) console.log(err)
        res.json(blog)
    })
}

