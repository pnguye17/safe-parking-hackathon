const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const AdminSchema = new mongoose.Schema({
    name: {type: String, unique: true},
    password: {type: String, required: true},
    email: {type: String, unique: true, required: true}
})


AdminSchema.methods.hashPassword = function(password){
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10)) 
}

AdminSchema.methods.validPassword = function(password){
    return bcrypt.compareSync(password, this.password)
}

AdminSchema.pre("save", function(next){
    if(this.isModified("password")){
        this.password = this.hashPassword(this.password)
    }
    next()
})

