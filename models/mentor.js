const mongoose = require('mongoose');

const mentorSchema = new mongoose.Schema({
   mentor_Id:{
       type:Number,
       required: true
   },
    name: {
        type: String,
        required: true
    },
});

const Mentor = mongoose.model("Mentor",mentorSchema);
module.exports = Mentor;
