const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan');
const userRoutes = require('./routes/usersRouts');
const blogRoutes = require('./routes/blogRouts');
require('./config/db');


//midleware 
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

//rout
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/blog', blogRoutes );



//rout error
app.use((req,res,next)=>{
    res.status(404).json({message:"Route not found"});
    }
    );
    //server error
    app.use((err, req, res, next)=>{
    res.status(500).json({message:"something is broken"});
    }
    );
    


module.exports=app;