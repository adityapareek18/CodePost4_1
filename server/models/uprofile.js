const mongoose = require('mongoose');
const schema = mongoose.Schema;

const profileSchema = new Schema({
    userId: String,
    bio: String,
    skillsKnown: [String],
    skillsToLearn: [String],
    profilePicDocKey: String,
    aboutMe : String
});

module.exports = mongoose.model('profile', profileSchema);