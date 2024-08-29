const express = require('express');
const cors=require("cors")
const mongoose=require("mongoose")
const UserModel =require('./models/Users')
const bcrypt = require('bcrypt');
const { sendMail } = require('./mailsend/Mailsend');
const jwt = require('jsonwebtoken');
require('dotenv').config();


const app=express();
require("dotenv").config();
app.use(express.json());
app.use(cors());

app.get('/',(req,res)=>{
    UserModel.find({})
    .then(users=>res.json(users))
    .catch(err=>res.json(err))
})

app.post("/createUser",(req,res)=>{
    UserModel.create(req.body)
    .then(users=>res.json(users))
    .catch(err=>res.json(err))
})


app.get('/getUser/:id',(req,res)=>{
    const id=req.params.id;
    UserModel.findById({_id:id})
    .then(users=>res.json(users))
    .catch(err=>res.json(err))
}) 

app.put('/updateUser/:id',(req,res)=>{
    const id=req.params.id;
    UserModel.findByIdAndUpdate({_id:id },{
        name:req.body.name,
        email:req.body.email,
        age:req.body.age})
    .then(users=>res.json(users))
    .catch(err=>res.json(err)) 
})

app.delete('/deleteUser/:id',(req,res)=>{
    const id=req.params.id;
    UserModel.findByIdAndDelete({_id:id})
    .then(users=>res.json(users))
    .catch(err=>res.json(err))
})


mongoose.connect(process.env.MONGO_URL,{


}).then(()=>{
    console.log("DB connection succesfully")
})


app.post('/register', async (req, res) => {
    const { name, email, phone, username, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new UserModel({
            name,
            email,
            phone,
            username,
            password: hashedPassword,
        });
        const savedUser = await newUser.save();
        sendMail(email,"Welcome to this our website! Please Confirm Your Email Addres",`Hi, ${name} Thank you for signing up with this website! We're excited to have you on board.Your email id :${email} and your password is  : ${password }`,`<h1>Dear ${name} , </h1>
            <P>Thank you for SignUp up Our website! </p>
            <P> We're excited to have you on board. Use This eamil Id when You login again</p>
            <P>your email id is :${email}</>
            <P>your Login Password is:${password}</>
            `)
        res.json(savedUser);
    } catch (err) {
        console.error('Error during registration', err);
        res.status(500).json({ message: 'Error registering user', error: err });
    }
});



app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    
    try {
        
        const user = await UserModel.findOne({
            $or: [{ email: email }],
        });
     
        if (!user) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }
        
        
        const isMatch =bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }
        
        
        const payload = {
            user: {
                id: user._id,
                username: user.username,
            },
        };
     
        
        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: '1h' },
            (err, token) => {
                if (err) throw err;
                res.json({ token });
            }
        );
        
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});


app.get('/', (req, res) => {
    const token = req.header('Authorization').replace('Bearer ', '');
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        res.json({ message: 'Welcome to the dashboard', user: decoded.user });
    } catch (err) {
        res.status(401).json({ msg: 'Token is not valid' });
    }
});



app.listen(3001,()=>{
    console.log("server is running");
})
