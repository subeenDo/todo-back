const mongoose = require('mongoose')
const Schema = mongoose.Schema

//Schema = 작업지시서
const taskSchema = Schema({
    task:{
        type : String,
        required:true
    },
    isComplete:{
        type : Boolean,
        required:true
    },
    author:{
        type:Schema.Types.ObjectId,
        required : true,
        ref: "User"
    },
},
{timestamps:true}
);

// model
const Task = mongoose.model("Task", taskSchema);

module.exports = Task;

