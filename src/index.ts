import express from "express";
import { hash, number, string, success, z } from "zod";
import { UserModel } from "./schema";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import mongoose, { model } from "mongoose";
import jwt from "jsonwebtoken";
import { Jwt_Paswoord} from './config'
import { userMiddleware } from "./middleware";
import { ContentModel } from './schema'
import { LinkModel } from "./schema";
import Randomhased from "./utils";
import cors from "cors";

const app = express();
app.use(cors({
  origin: ["http://localhost:5173", "http://localhost:5174"], 
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));
app.use(express.json());

const zodSchema = z.object({
  firstName: string().min(2, { message: "first name shouild not be empty" }),
  lastname: string().min(3, { message: "lastname shouild be not empty" }),
  email: string().email({ message: " email is not in the email formate" }),
  username:string().max(10,{message:"not a valid username"}),
  password: string()
    .min(5)
    .max(10, { message: "please enter a valid password" }),
  phoneNumber: number({ message: "please provide an  valid phone number" }),
});

type finalschema = z.infer<typeof zodSchema>;


app.post("/api/v1/signup", async (req, res) => {
  const result = zodSchema.safeParse(req.body);
  if (!result.success) {
    return res.status(411).json({
      success: false,
      message: "error",
      error: result.error,
    });
  }
  const { firstName, lastname, email, phoneNumber, password ,username} = result.data;
  const hashedPassword = await bcrypt.hash(password, 5);
  try {
    const exixtingser = await UserModel.findOne({ email });
    if (exixtingser) {
      return res.status(409).json({
        success: false,
        message: "User already exists with this email, please sign in.",
      });
    }
    await UserModel.create({
      firstName: firstName,
      lastname: lastname,
      email: email,
      username:username,
      phoneNumber: phoneNumber,
      password: hashedPassword,
    });
    res.status(201).json({
      success: true,
      message: "User signup successfully",
    });
  } catch (e: any) {
    res.status(411).json({
      success: false,
      message: e.message || "Something went wrong",
    });
  }
});

app.post("/api/v1/signin", async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    if (!email || !password) {
      return res.status(400).json({
        message: "email and password is required",
      });
    }

    const users = await UserModel.findOne({ email: email });
    if (!users) {
      return res.status(401).json({
        message: "user not found, please signup!",
      });
    }
    console.log(users);

    const matchedpaswoord = await bcrypt.compare(password, users.password);
    if (!matchedpaswoord) {
      return res.status(401).json({
        message: "password mismatched",
      });
    }
    const token = jwt.sign({ id: users._id }, Jwt_Paswoord);
    return res.json({
      token: token,
    });
  } catch (e) {
    console.error("signin error", e);
    return res.status(500).json({ message: "sigin authentation fail" });
  }
});

app.post("/api/v1/content", userMiddleware, async(req, res) => {
  const link = req.body.link;
  const type = req.body.type;
  await ContentModel.create({
    link,
    type,
    userId: req.userId,
    tags:[]
  })
  return res.status(200).json({
    message:"content added"
  })
});

app.get("/api/v1/content/",userMiddleware, async (req,res)=>{
  const userId  = req.userId;
  try{
  const content = await ContentModel.find({
    userId:userId
  }).populate("userId" , "username")
  res.status(200).json({
    content,
  })
}catch(e){
  res.status(401).send({
  message:"error occur"
  })
}
})

app.delete("/api/v1/deleteContent",userMiddleware, async(req, res) => {
 const contentId=req.body.contentId;
 await ContentModel.deleteMany({
  contentId,
  userId: req.userId
 })
 res.status(200).json({
  message:"content is deleted"
 })
});

app.post("/api/v1/braain/share", userMiddleware, async (req, res) => {
  const share = req.body.share;
  try{
      if(share) {
    const hash = Randomhased(10);


    await LinkModel.create({
      userId:req.userId,
      hash:hash
    })
      res.status(200).json({
    message:"updated sharre link",
    hash
  })
  }

  }catch(e){
    await LinkModel.deleteOne({
      userId:req.userId
    })
    res.json({
      message:"remove link"
    })
  }

});

app.post("/api.vi/brain/sharelink", userMiddleware, async (req,res)=>{
  const hashed = req.params.sharelink;

  const link = await LinkModel.findOne({
    hashed
  })
  if(!link){
    res.status(411).json({
      message:'sorry incorrect status'
    })
    return
  }
  const content = await ContentModel.find({
    userId:link.userId
  })
  const user = await UserModel.findOne({
    _id:link.userId
  })
if(!user){
  res.send({
    message:"user not found"
  })
}

  res.send({
    username:user?.username,
    content
  })
})




dotenv.config();

async function main() {
  try {
    await mongoose.connect(process.env.MONGODB_URI as string);
    const port = 3000;
    app.listen(port, function () {
      console.log("app is runnung on " + port);
    });
  } catch (error) {
    console.log("error occure while connecting with mongoose", error);
  }
}
main();
