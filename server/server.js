const express = require('express') ; 
const morgan = require('morgan');
const cors = require('cors');
require('dotenv').config();

const app = express();

const mongoose  = require('mongoose');
//connect to cloud databbase 
mongoose.connect(process.env.DATABASE,{
    useNewUrlParser: true, 
    useUnifiedTopology: false
}).then(()=>{
    console.log("connect to cloud databbase successfully");
}).catch((err)=>{
    console.log(err);
})

//middelware 
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

//route
const blogRoute = require('./routes/blog.js');
const authRoute = require('./routes/auth.js');

app.use('/api', blogRoute)
app.use('/api', authRoute)

//create server
const port = process.env.PORT || 8080 ; 
app.listen(port, (req, res)=> {
    try {
        console.log(`Start server in port ${port}`);
    } 
    catch {
        console.log(`can't connect to Server in port ${port}`);
    }
})
