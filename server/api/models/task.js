const mongoose = require('mongoose');

const taskSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    tasks: {
        type: Array,
        required: true
    },
    category: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("Task", taskSchema);
