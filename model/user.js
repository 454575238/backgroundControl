/*
* @Author: Marte
* @Date:   2018-01-22 09:38:27
* @Last Modified by:   Marte
* @Last Modified time: 2018-01-22 09:40:54
*/

'use strict';
var mongoose = require("mongoose");
var userSchema = require("../schema/user");
var User = mongoose.model("users",userSchema);

module.exports = User;

