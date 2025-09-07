import { useRef } from "react";
import { Input } from "../component/Input";
import { Button } from "../component/buttonCom";
import { BACKAND_URL } from "../config";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function Signin() {


  const emailref = useRef<HTMLInputElement>(null);
  const passwordref = useRef<HTMLInputElement>(null);
  const navigate= useNavigate()
   async  function signin() {

    const email = emailref.current?.value;
    const password = passwordref.current?.value;
    const response =await axios.post(BACKAND_URL + "/api/v1/signin",{
        email:email,
        password:password,
    },{
        headers: { "Content-Type": "application/json" }
    })
    const jwt=response.data.token;
    localStorage.setItem("token",jwt)
    navigate("/dashboard")
  }

  return (
    <div className="h-screen w-screen bg-gradient-to-br from-blue-100 to-indigo-200 flex justify-center items-center">
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Sign In
        </h2>

        <div className="space-y-4  text-center">
          <Input ref={emailref} placeholder="Email" />
          <Input ref={passwordref}placeholder="Password" />
        </div>
        <div className="flex justify-center cursor-pointer">
        <Button
        onClick={signin}
          variant="secoundery"
          text="Sign in" loading={false} fullwidth={true}
        />
        </div>
      </div>
    </div>
  );
}
