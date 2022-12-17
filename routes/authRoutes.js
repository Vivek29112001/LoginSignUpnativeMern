const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = mongoose.model("User");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

//
require('dotenv').config();
//

router.post('/signup', (req,res) => {
    // res.send('This is signup page');
    console.log('send by clint - ', req.body);
    const{name,email,password,dob } = req.body;
    if (!email || !password || !name || !dob) {
        return res.status(422).send({error: "Please fill all the fields "});
    }

    User.findOne({email:email})
        .then( async (savedUser) => {
                if(savedUser){
                    return res.status(422).send({error: "Invalid Credential" });
                }
                const user = new User({
                    name,
                    email,
                    password,
                    dob
                })

                try{
                    await user.save();
                    // res.send({ message: " User saved successfully"});
                    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
                    res.send({token});
                }
                catch (err) {
                    console.log('db error', err);
                    return res.status(422).send({ error: err.message });
                }
            }
        )
})


router.post('/signin', async (req, res) => {
    const {email , password} =req.body;
    if(!email || !password) {
        return res.status(422).json({error: " Please add Email and Password "});
    }
    const savedUser = await User.findOne({ email: email})

    if (!savedUser){
        return res.status(422).json({error:"Invalid Credentials" });
    }

    try{
        bcrypt.compare(password, savedUser.password, (err, result) =>{
            if(result){
                console.log("Password Match");
                const token = jwt.sign({_id: savedUser._id }, process.env.JWT_SECRET);
                res.send({token});
            }
            else{
                console.log('Password does not match');
                return res.status(422).json({ error: " Invalid Credentials"});
            }
        })
    }
    catch(err){

    }
})

module.exports = router;