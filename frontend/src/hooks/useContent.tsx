import axios from "axios";
import { useEffect, useState } from "react";
import { BACKAND_URL } from "../config";

export function useContent(){
  const [contents, setcontents] = useState([])
function refresh(){
axios.get(`${BACKAND_URL}/api/v1/content`,{
      headers: {
        "Authorization": localStorage.getItem("token")
      }
    }).then((response)=>{
      setcontents(response.data.content)
    })

}

  useEffect(()=>{
    refresh()
    let interval = setInterval(()=>{
      refresh()
    },10*1000)
    return () =>{
      clearInterval(interval)
    }
  },[])
  return {contents,refresh};
}