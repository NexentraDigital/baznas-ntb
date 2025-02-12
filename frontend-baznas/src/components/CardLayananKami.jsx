import React, { Children } from "react";
import PrimaryButton from "../elements/PrimaryButton";
import IconLayanan from "../elements/IconLayanan";
import { Link } from "react-router-dom";

export default function CardLayananKami({
  children,
  className = "",
  icon,
  title,
  buttonText,
  link,
  ...props
}) {
  return (
    <div
      className={
        `bg-white w-40 h-[180px] lg:h-56 lg:w-52 rounded-xl flex flex-col p-[10px] justify-end text-center  gap-3 relative` +
        className
      }
    >
      <center>
        <IconLayanan
          icon={icon}
          className=" absolute -top-7 lg:-top-10 lg:left-[32%] left-[34%] shadow-lg shadow-Primary-600/50"
        /> 
      </center>
      <h1 className="font-semibold mt-12">{title}</h1>
      <p className="text-xs lg:text-sm h-24 lg:h-12">{children}</p>
      <Link to={link}><PrimaryButton className="text-[9px] md:text-[10px] lg:text-sm px-2 w-full">{buttonText}</PrimaryButton></Link>
    </div>
  );
}
