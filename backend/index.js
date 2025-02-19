const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const User = require('./models/UserSchema');



app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/MovieProject").then(()=>{
    console.log("Connected to MongoDB");
}).catch((err)=>{
    console.log("Error connecting to MongoDB", err);
})




app.post("/api/register", (req,res)=>{
    const {username, email, password} = req.body;
    console.log("data recieved in backend on register",username, email, password);
    User.findOne({username:username}).then((user)=>{
        if(!user){
            User.create(req.body)
            .then((user)=>{
                res.json("Success");
                console.log("user created", user);
            })
            .catch(err => res.status(400).json('Error: ' + err));
        }else{
            res.json("Username already exists");
            console.log("username already exists", user);
        }
    }).catch((err)=>{
        console.log("error in registering user", err);
    })
})

app.post('/api/login', (req, res) => {
  console.log("Received login request with body:", req.body);
  const { username, password } = req.body;
  
  User.findOne({ username: username }).then((user) => {
    if (user) {
      if (user.password === password) {
        // Send user data (excluding sensitive information)
        res.json({
          status: "Success",
          user: {
            username: user.username,
            email: user.email,
            // Don't send password
          }
        });
      } else {
        res.json({ status: "Error", message: "Invalid password" });
      }
    } else {
      res.json({ status: "Error", message: "User not found" });
    }
  });
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