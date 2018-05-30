const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
    userId: String,
    title: String,
    url: String,
    startDate: String,
    startTime: String,
    endTime: String,
    description: String
});

module.exports = mongoose.model('post', postSchema);