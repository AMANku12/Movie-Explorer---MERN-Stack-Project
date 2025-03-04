const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const User = require('./models/UserSchema');
const jwt = require('jsonwebtoken');
const cookieParser = require("cookie-parser");


app.use(cors());
app.use(express.json());
app.use(cookieParser());

mongoose.connect("mongodb://127.0.0.1:27017/MovieProject").then(()=>{
    console.log("Connected to MongoDB");
}).catch((err)=>{
    console.log("Error connecting to MongoDB", err);
})

// middleware to verify token
const verifyToken = (req,res,next)=>{
  const token = req.header("Authorization");
  if(!token) return res.status(401).json({error: "Access denied"});

  try {
    const verified = jwt.verify(token.split(" ")[1],"shhhh");
    req.user = verified;
    next();
  } catch (error) {
    res.status(400).json({error:"Invalid token"});
  }
}

// protected route
app.get("/api/mywatchlist",verifyToken, async(req,res)=>{
  try {
    const userId = req.user.Id;
    const user = await User.findById(userId);

    if (!user) return res.status(404).json({ error: "User not found" });

    res.json(user.watchlist);
    console.log("User watchlist:", user.watchlist);

  } catch (error) {
    console.error("Error fetching watchlist:", error);
    res.status(500).json({ error: "Server error" });
  }
})

// another protected route
app.post("/api/addtowatchlist", async(req,res)=>{
  const {user, newmovie} = req.body;
  console.log(user._id);
  console.log(newmovie);
  try {
    const existingUser = await User.findById(user._id);
    if(!existingUser) return res.status(404).json({error: "user not found"});

    existingUser.watchlist.push(newmovie);
    await existingUser.save();

    console.log(existingUser);
    res.json({message:"Added to watchlist", user: existingUser});

  } catch (error) {
    res.status(500).json({error: "Server error"});
  }
})

app.post("/api/register", async (req,res)=>{
  try{
    const {name, username, email, password} = req.body;
    console.log("data recieved in backend on register",username, email, password);
    if(!(name && username && email && password)){
      res.status(400).json({error:"All fields are required"});
      return;

    }
    const existingUser = await User.findOne({username:username, email:email})
    if(existingUser){
      res.status(400).json({error:"Username or email already exists"});
      return;
    }
    const newUser = await User.create({name, username, email, password});
    
    // create a token for the user and send it to the client
    const token = jwt.sign(
      {Id: newUser._id},
      "shhhh",
      {expiresIn: "24h"},
    )
    newUser.token = token;
    newUser.password = undefined; // don't send password to the client
    console.log("new user created", newUser);
    res.status(201).json(newUser);
  }catch(err){
    console.log("error in registering user", err);
    res.status(500).json({error:"Internal server error"});
  }
})

app.post('/api/login', async(req, res) => {
  console.log("Received login request with body:", req.body);
  try {
    const {username, password} = req.body;
    if(!(username && password)){
      res.status(400).json("All fields are requires");
      return;
    }
    const user = await User.findOne({username});
    if(user){
      if(user.password===password){
        const token = jwt.sign(
          {Id: user._id},
          "shhhh",
          {expiresIn: "24h"}, 
        );
        user.token = token;
        user.password = undefined;

        // send token in user cookie
        const options = {
          expires: new Date(Date.now()+ 2* 24* 60* 60* 1000), // days,hours,mins,secs,millisecs
          httpOnly: true
        };
        res.status(200).cookie("token", token, options).json({message:"Success",user,token});
      }else{
        res.json({message:"wrong password"});
      }
    }else{
      res.json({message:"No username found"});
    }
  } catch (error) {
    console.log(error);
  }
});

app.get('/api/movies' , (req,res)=>{
    const jsonMovies  = require("./movies-250.json");
    res.json(jsonMovies);
});

app.get('/', (req, res) => {
    res.send('Hello World');
});

const PORT = 3001; // or any other available port

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});