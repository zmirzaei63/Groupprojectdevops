var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
// Define a new 'TaskSchema'
var TaskSchema = new Schema({
    chatId: { type: String},
    prompt: String,
    response: String,
    createdDate: {
        type: Date,
        // Create a default 'created' value
        default: Date.now
    },
    
     chatTitle:String,
    upVotes:Number,
    downVotes:Number
});
// Create the 'Task' model out of the 'TaskSchema'
mongoose.model('Task', TaskSchema);
