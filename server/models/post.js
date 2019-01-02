const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
    userId: String,
    title: String,
    url: String,
    startDate: { year: Number, month: Number, day: Number },
    startTime: { hour: Number, minute: Number, second: Number },
    endTime: { hour: Number, minute: Number, second: Number },
    description: String
});

module.exports = mongoose.model('post', postSchema);