const { Schema, model, Types } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const reactionSchema = new Schema(
    {
        reactionId:{
            type:Schema.Types.ObjectId,
            default: () => new Types.ObjectId()
        },
        reactionBody:{
            type:String,
            required:true,
            maxlength: 280,
            minlength: 2
        }, 
        username:{
            type:String,
            required:true
        },
        
        createdAt:{
            type:Date,
            default:Date.now,
            get:createdAtValue => dateFormat(createdAtValue)
        }
        },
        {
            toJSON:{
                getters:true
            }
        }
    
);

const ThoughtSchema = new Schema({
    thoughtText:{
        type:String,
        required: true,
        minlength:1,
        maxlength: 280
    },
    createdAt:{
        type:Date,
        default:Date.now,
        get: (createdAtValue) => dateFormat(createdAtValue)
    },
    username:
    {
        type:String,
        required:true
    },
    userId:{
        type:String,
        required:true
    },
    //Array of nested documents created with the reactionSchema
    reactions:[reactionSchema]
},
{
    toJSON:{
        virtuals: true,
        getters: true
    },
    id:false
}

);

//Create a virtual called reactionCount that retrieves the length of the thought's reactions array field on query.
ThoughtSchema.virtual('reactionLength').get(function(){
    return this.reactions.length;
})
const Thought = model('Thought', ThoughtSchema)

module.exports = Thought;