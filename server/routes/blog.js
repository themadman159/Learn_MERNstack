const express = require('express');
const router = express.Router(); 

const {getAllblogs, create, singleblog, removeblog, updateblog} = require('../controllers/blogcontroller')
const { requireLogin } = require('../controllers/authcontroller')


router.get('/blogs',getAllblogs)
router.get('/blog/:slug',singleblog)

//เรียก Route โดยการแนบ Token มาด้วย
router.post('/create',requireLogin,create)
router.delete('/blog/:slug',requireLogin,removeblog)
router.put('/blog/:slug',requireLogin,updateblog)

module.exports = router
