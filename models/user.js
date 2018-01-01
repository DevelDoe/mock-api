/**
 * @Author: andreeray
 * @Date:   2017-12-31T12:31:48+01:00
 * @Email:  andreeray@live.com
 * @Filename: user.js
 * @Last modified by:   andreeray
 * @Last modified time: 2017-12-31T16:44:13+01:00
 */

/* depandencies */
var mongoose = require('mongoose')


/* user */
var userSchema = new mongoose.Schema({
    name: String,
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    admin: Boolean,
    location: String,
    meta: {
        age: Number,
        website: String
    },
    created_at: Date,
    updated_at: Date
})

module.exports = mongoose.model('User', userSchema)
