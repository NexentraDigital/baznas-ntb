import React, { useState } from "react";
import { HiOutlineMenu } from "react-icons/hi";
import { SlClose } from "react-icons/sl";
import { Link } from "react-router-dom";
import { RxTriangleDown } from "react-icons/rx";
import dataMenu from "../datas/dataMenu.json"


export default function Header() {
  const [barMenu, setbarMenu] = useState(false);

  const renderComponent = (data) => {
    const Component = data === "RxTriangleDown" ? RxTriangleDown : null; // Tambahkan logika untuk komponen lain jika perlu
    return Component ? <Component/> : null;
  };

  return (
    <div className="text-sm lg:text-base">
      <div className="flex h-16 py-1 px-5 justify-between items-center">
        <img src="/logoBaznas.png" alt="" className="h-12" />
        <button onClick={() => setbarMenu(!barMenu)} className="md:hidden">
          {barMenu ? (
            <SlClose size={36} className="text-Primary-500" />
          ) : (
            <HiOutlineMenu size={36} className="text-Primary-500" />
          )}
        </button>
        <div className="hidden md:flex">
          {dataMenu.map((item) => (
            <div className="">
              <Link
                key={item.id}
                to={item.link}
                className=" lg:py-2 lg:px-5 px-3 rounded-lg hover:text-Primary-500 flex justify-center items-center"
              >
                {item.title}
                {renderComponent(item.icon)}
              </Link>
            </div>
          ))}
        </div>
      </div>
      <div
        className={`flex-col md:hidden flex px-5 py-5 gap-1  ${
          barMenu ? "" : "hidden"
        } `}
      >
        {dataMenu.map((item) => (
          <Link
            key={item.id}
            to={item.link}
            className="bg bg-neutral-100 py-2 px-5 rounded-lg hover:bg-Secondary-500 hover:text-white hover:scale-105 hover:-translate-y-1 hover:shadow-xl transition delay-75 ease-in-out  flex justify-between items-center"
          >
            {item.title}
            {renderComponent(item.icon)}
          </Link>
        ))}
      </div>
    </div>
  );
}
