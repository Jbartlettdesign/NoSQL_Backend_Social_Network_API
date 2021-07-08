const { Schema, model } = require('mongoose');
const Thought = require('./Thought');

const UserSchema = new Schema({
    username:{
        type:String,
        required: true,
        trim: true,
        unique: true
    }, 
    email:{
        type:String,
        required: true,
        unique:true,
        //validate: [validateEmail, 'Please fill a valid email address'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    //Array of _id values referencing the Thought model
    thoughts:[
        {
            type:Schema.Types.ObjectId,
            ref:'Thought'
        }
    ],
    //Array of _id values referencing the User model (self-reference)
    friends:[
        {
            type:Schema.Types.ObjectId,
            ref:'User'
        }
    ]

    },
    {
        toJSON:{
            virtuals: true,
        },
        id:false
    }
);

//Create a virtual called friendCount that retrieves the length of the user's friends array field on query.
UserSchema.virtual('friendLength').get(function(){
    return this.friends.length
});
const User = model('User', UserSchema);
module.exports = User;
