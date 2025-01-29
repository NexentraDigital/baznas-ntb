import React, { Children } from "react";
import PrimaryButton from "../elements/PrimaryButton";
import IconLayanan from "../elements/IconLayanan";

export default function CardLayananKami({
  children,
  className = "",
  ...props
}) {
  return (
    <div className={`bg-pink-700 w-40 h-44 rounded-xl flex flex-col p-4 justify-end text-center  gap-3 relative` + className}>
    <IconLayanan icon={"/icon-zakat.svg"} className=" absolute -top-7 right-12 shadow-lg shadow-Primary-500/50"/>
      <h1 className="text-lg font-semibold">Zakat</h1>
      <p className="text-xs">Lorem ipsum, dolor sit amet consectetur </p>
      <PrimaryButton className="text-[9px] px-2">Bayar Zakat Sekarang</PrimaryButton>
    </div>
  );
}
