 const express=require("express");
const app=express();
const mongoose=require('mongoose');
const bodyParser=require('body-parser');
var cookieParser=require('cookie-parser');
const morgan=require('morgan');
const expressValidator=require('express-validator');
const fs=require('fs');
const cors=require('cors');
const dotenv=require('dotenv');
dotenv.config()

// db
mongoose.connect(
	             process.env.MONGO_URI, 
	             { useNewUrlParser: true }

	            )
               .then(()=> console.log('DB Connected'))

mongoose.connection.on('error',err=>{
   console.log(`DB Connection error:${err.message}`);
});

// Bring in routes
const postRoutes=require('./routes/post');
const authRoutes=require('./routes/auth');
const userRoutes=require('./routes/user');

//apiDocs
app.get('/', (req,res) => {
  fs.readFile('docs/apiDocs.json', (err,data) => {
    if(err) {
      res.status(400).json({
        error: err
      })
    }
    const docs = JSON.parse(data)
    res.json(docs)
  })
})

/* const myOwnMiddleware=(req,res,next)=>{
	console.log("Middleware Applied!!!");
	next();
}; */

// Middleware
app.use(morgan("dev"));
/* app.use(myOwnMiddleware); */
app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressValidator());
app.use(cors());
app.use('/', postRoutes); //postRoutes will work as middleware
app.use('/', authRoutes); 
app.use('/', userRoutes);
app.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    res.status(401).json({error: "Unauthorized!"});
  }
});

 const port=process.env.PORT || 8080;
app.listen(port,()=>{
  	console.log(`A Node Js API is listening on port: ${port}`); 
});