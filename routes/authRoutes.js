const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = mongoose.model("User");
const jwt = require('jsonwebtoken');
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

module.exports = router;