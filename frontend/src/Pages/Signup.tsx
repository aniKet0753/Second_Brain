import { useRef } from "react";
import { Input } from "../component/Input";
import { Button } from "../component/buttonCom";
import axios from "axios"
import { BACKAND_URL } from "../config";
import { useNavigate } from "react-router-dom";

export function Signup() {
  const firstnameref = useRef<HTMLInputElement>(null);
  const lastnameref = useRef<HTMLInputElement>(null);
  const emailref = useRef<HTMLInputElement>(null);
  const usernameref = useRef<HTMLInputElement>(null);
  const passwordref = useRef<HTMLInputElement>(null);
  const phonnumref = useRef<HTMLInputElement>(null);
const navigate = useNavigate()

   async  function signup() {
    const firstname = firstnameref.current?.value;
    const lastname = lastnameref.current?.value;
    const email = emailref.current?.value;
    const username = usernameref.current?.value;
    const password = passwordref.current?.value;
    const phonenumber = phonnumref.current?.value;
    await axios.post(BACKAND_URL + "/api/v1/signup",{
        firstName:firstname,
        lastname:lastname,
        email:email,
        username:username,
        password:password,
        phoneNumber:Number(phonenumber)
    },{
        headers: { "Content-Type": "application/json" }
    })
    navigate("/signin")
    alert("you ae signup!!")
  }

  return (
    <div className="h-screen w-screen bg-gradient-to-br from-blue-100 to-indigo-200 flex justify-center items-center">
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Create an Account
        </h2>

        <div className="space-y-4  text-center">
          <Input ref={firstnameref} placeholder="First Name" />
          <Input ref={lastnameref} placeholder="Last Name" />
          <Input ref={emailref} placeholder="Email" />
          <Input ref={usernameref} placeholder="Username" />
          <Input ref={passwordref} placeholder="Password" />
          <Input ref={phonnumref} placeholder="Phone Number" />
        </div>
        <div className="flex justify-center cursor-pointer">
          <Button
            onClick={signup}
            variant="secoundery"
            text="Sign Up"
            loading={false}
            fullwidth={true}
          />
        </div>

        <p className="text-sm text-gray-600 text-center mt-4">
          Already have an account?{" "}
          <a
            href="/login"
            className="text-indigo-600 font-semibold hover:underline"
          >
            Login
          </a>
        </p>
      </div>
    </div>
  );
}
