/*
* @Author: Marte
* @Date:   2018-01-23 09:07:16
* @Last Modified by:   Marte
* @Last Modified time: 2018-01-23 09:12:21
*/

'use strict';
var mongoose = require("mongoose");
var positionSchema = require("../schema/position");
var Position = mongoose.model("positions",positionSchema);


module.exports = Position;