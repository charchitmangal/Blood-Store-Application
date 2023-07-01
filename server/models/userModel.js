const mongoose=require('mongoose');

const userSchema = new mongoose.Schema({
    userType: {
        type: String,
        required: true,
        enum: ['donar', 'organization', 'hospital', 'admin']
    },
    name:{
        type: String,
        required: function(){
            if(this.userType=="admin" || this.userType == "donar"){
                return true;
            } else{
                return false;
            }
        }
    },
    hospitalName:{
        type: String,
        required: function(){
            if(this.userType=="hospital"){
                return true;
            } else{
                return false;
            }
        }
    },
    organizationName:{
        type: String,
        required: function(){
            if(this.userType=="organization"){
                return true;
            } else{
                return false;
            }
        }
    },
    website: {
        type:String,
        required: function(){
            if(this.userType=="organization" || this.userType=="hospital"){
                return true;
            } else{
                return false;
            }
        },
        unique:false,
        sparse:true
    },
    address: {
        type:String,
        required: function(){
            if(this.userType=="organization" || this.userType=="hospital"){
                return true;
            } else{
                return false;
            }
        },
        unique:false,
        sparse:true
    },
    email: {
        type:String,
        required: true,
        unique: true
    },
    password: {
        type:String,
        required: true,
        unique: true
    },
    phone: {
        type:String,
        required: true,
        unique: true
    }
},
{
    timestamps:true
})

module.exports = mongoose.model("users", userSchema);
