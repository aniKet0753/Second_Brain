import { Button } from "../component/buttonCom";
import ShareIcon from "../icon/shareicon";
import AddIcon from "../icon/addIcon";
import { Card } from "../component/Cards";
import { CreateContentModel } from "../component/CreateContentModel";
import { useEffect, useState } from "react";
import { Sidebar } from "../component/Sidebar";
import { useContent } from "../hooks/useContent";
function Dashboard() {
  const [modelopen, setmodelopen]=useState(false)
  const {contents,refresh} = useContent()
useEffect(()=>{
refresh();
},[modelopen])

  return (
    <>
    <div >
      <Sidebar />
      <div className="p-4 ml-72 min-h-screen bg-gray-100 ">
      <CreateContentModel open={modelopen} onClose={()=>{
        setmodelopen(false)
      }}/>
      <div className="flex justify-end gap-4">
      <Button onClick={()=>{
        setmodelopen(true)
      }}
        variant="primeary"
        text="Add Content"
        startIcon={<AddIcon />}

      />
            <Button
        variant="secoundery"
        text="Share Brain"
        startIcon={< ShareIcon/>}

      />
      </div>
      <div className="flex gap-4 flex-wrap">
{contents.map(({type,link,title})=>
        <Card  type={type} link={link} title={title} />)}

      </div>
      </div>
      </div>
    </>
  );
}

export default Dashboard;
