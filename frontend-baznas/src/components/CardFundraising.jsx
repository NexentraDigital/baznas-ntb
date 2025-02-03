import React from "react";
import PrimaryButton from "../elements/PrimaryButton";
import ProgressBar from "../elements/ProgresBar";

export default function CardFundraising({
  title,
  className = "",
  img,
  ...props
}) {
  return (
    <div className={`bg-white rounded-[20px] p-4 w-80` + className}>
      <center>
        <img
          src={img}
          alt=""
          className="h-26 rounded-2xl bg-cover"
        />
      </center>
      <h1 className="text-base font-semibold mt-3 text-start h-16 text-wrap overflow-hidden">{title}</h1>
      <ProgressBar progres={100} />
      <div className="flex justify-between mt-4">
        <div>
          <h2 className="font-semibold text-start">Rp. 1.000.000</h2>
          <h3 className="text-start">Dana Terkumpul</h3>
        </div>
        <div className="text-end">
          <h2 className="font-semibold">0</h2>
          <h3>Hari Tersisa</h3>
        </div>
      </div>
      <div className="flex justify-center mt-6">
        <PrimaryButton className="font-semibold px-5">Donasi</PrimaryButton>
      </div>
    </div>
  );
}
