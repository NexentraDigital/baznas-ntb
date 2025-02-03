import React from "react";
import { FaArrowRightLong } from "react-icons/fa6";

export default function CardCeritaAksi({ children, title, img }) {
  return (
    <div className="p-5 bg-Primary-50 rounded-2xl w-80 mt-3 flex flex-col items-start">
      <img src={img} alt="" className="h-[154px] w-full rounded-2xl" />
      <h2 htmlFor="" className="text-Primary-50 bg-neutral-950 py-2 px-4 rounded-full my-4 w-fit ">Cerita Aksi</h2>
      <h1 className="text-xl font-semibold h-14 overflow-hidden text-start">{title}</h1>
      <p className="mt-2 text-sm h-14 text-wrap overflow-hidden text-start">{children}</p>
      <button className=" text-Primary-600 mt-2 flex items-center gap-2 font-semibold hover:underline">Baca Selengkapnya <FaArrowRightLong /></button>
    </div>
  );
}
