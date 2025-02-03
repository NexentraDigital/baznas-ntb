import React, { Children } from "react";
import PrimaryButton from "../elements/PrimaryButton";
import IconLayanan from "../elements/IconLayanan";

export default function CardLayananKami({
  children,
  className = "",
  icon,
  title,
  buttonText,
  ...props
}) {
  return (
    <div
      className={
        `bg-white w-44 h-52 rounded-xl flex flex-col p-4 justify-end text-center  gap-3 relative` +
        className
      }
    >
      <center>
        <IconLayanan
          icon={icon}
          className=" absolute -top-7 left-[33%] shadow-lg shadow-Primary-600/50"
        />
      </center>
      <h1 className="text-lg font-semibold mt-12">{title}</h1>
      <p className="text-xs h-24">{children}</p>
      <PrimaryButton className="text-[9px] px-2">{buttonText}</PrimaryButton>
    </div>
  );
}
