/*
* @Author: Marte
* @Date:   2018-01-22 09:35:23
* @Last Modified by:   Marte
* @Last Modified time: 2018-01-22 10:18:37
*/

'use strict';
var mongoose = require("mongoose");
var userSchema = mongoose.Schema({
    username:String,
    password:String,
    mail:String
})


module.exports = userSchema;