import type { ReactElement } from "react";

interface ButtonProps {
  variant:"primeary" | "secoundery";
  text:string;
  startIcon ?: ReactElement;
  endIcon?:ReactElement;
  onClick?:()=> void;
  fullwidth?:boolean;
  loading?:boolean;
}
const variantClass={
  "primeary":"bg-purple-500 text-white",
  "secoundery":"bg-blue-200 text-white "
  
}
const defaultStyle ="px-1 py-1 rounded-md fonr-light flex items-center"

 
export const Button = ({variant,text,startIcon,onClick,fullwidth,loading}: ButtonProps) => {
  return (
    <button onClick={onClick} className={variantClass[variant] + " " + defaultStyle +`${fullwidth ? " w-full flex justify-center cursor-pointer": ""} ${
      loading ? "opacity-45" : ""
    }`}disabled={loading} >
      {startIcon}
      {text}
      
    </button>
  );
};
