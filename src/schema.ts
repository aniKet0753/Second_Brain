import { Express } from "express";

import bcrypt from "bcrypt";

// import data from '../src/index'
import mongoose, { model } from "mongoose";
import { number, optional, Schema, string } from "zod";
import { required } from "zod/v4/core/util.cjs";

const schema = mongoose.Schema;
const objectId = mongoose.Types.ObjectId;

//schema
const userschema = new schema({
  firstName: { type: String, required: true },
  lastname: { type: String, require: true },
  username: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password:{type: String,required:true},
  phoneNumber: { type: Number, require: true },
});
export const UserModel = model("User", userschema);

//schema of contenet
const contentSchema = new schema({
  title:{type:String},
  link:{type:String},
  tags:[{type:mongoose.Types.ObjectId,ref:'Tag'}],
  userId:{type: mongoose.Types.ObjectId, ref:'User', required:true},
  type:{type:String}
})
export const ContentModel = model("content",contentSchema)

const LinkSchema = new schema({
  hash:{string},
  userId:{type: mongoose.Types.ObjectId, ref:'User', required:true ,unique: true}
})
export const LinkModel = model("link" ,LinkSchema)