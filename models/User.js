const mongoose =require('mongoose');

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        require: true
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    password:{
        type: String,
        required: true
    },
    dob:{
        type: String,
        required: true
    },
})

// const User = mongoose.model('User', userSchema);
mongoose.model("User", userSchema);