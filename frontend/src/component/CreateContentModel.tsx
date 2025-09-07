import { CrossIcon } from "../icon/CrossIcon";
import { useRef, useState } from "react";
import { Button } from "../component/buttonCom";
import {Input} from "../component/Input";
import axios from "axios";
import { BACKAND_URL } from "../config";

enum contenttype {
  Youtube = "youtube",
  Twitter = "twitter"
}

export function CreateContentModel({open,onClose}){
  const titleref = useRef<HTMLInputElement>(null);
  const linkref = useRef<HTMLInputElement>(null);
    const [type, settype]= useState(contenttype.Youtube);

async function addcontent(){
  const title = titleref.current?.value;
  const link = linkref.current?.value;
axios.post(`${BACKAND_URL}/api/v1/content`,{
  link,
  title,
  type
},{
  headers:{
    "Authorization": localStorage.getItem("token")
  }
})
onClose();

}
  return <div>
    {open && <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="flex flex-col justify-center">
      <span className="bg-white opacity-100 p-4 rounded ">
        <div className="flex justify-end">
          <div onClick={onClose} className="cursor-pointer">
          <CrossIcon />
          </div>
        </div>
        <div >
          <Input ref={titleref} placeholder={"title"}/>
          <Input ref={linkref} placeholder={"link"}/>
        </div>
<div>
  <h1>Type</h1>
  <div className="flex  gap-17 p-4">
  <Button variant={type === contenttype.Youtube ? "primeary" : "secoundery"} text="YouTube" onClick={()=>{
    settype(contenttype.Youtube)
  }} ></Button>
  <Button variant={type === contenttype.Twitter ? "primeary" : "secoundery"} text="Twitwer" onClick={()=>{
    settype(contenttype.Twitter)}} ></Button>
</div>
</div>
        <div className="flex justify-center">
                  <Button onClick={addcontent} variant="primeary" text="Submit" />
        </div>
        </span>
        </div>
    </div>}
  </div>
}



