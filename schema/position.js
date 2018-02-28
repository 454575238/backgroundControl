/*
* @Author: Marte
* @Date:   2018-01-22 09:32:33
* @Last Modified by:   Marte
* @Last Modified time: 2018-01-24 11:16:17
*/

'use strict';
var mongoose = require("mongoose");

var positionSchema = mongoose.Schema({
position:String,
company: String,
experience:String,
type: String,
address: String,
salary:String,
logo:String,
username:String

});

module.exports = positionSchema;