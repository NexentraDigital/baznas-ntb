import React from "react";
import PrimaryButton from "../elements/PrimaryButton";
import CardLayananKami from "../components/CardLayananKami";

export default function LandingPages() {
  return (
    <div className="">
      {/* Hero Section */}
      <div>
        <img src="/banner-landingPage.jpg" alt="" className="bg-cover" />
      </div>
      {/* Section informasi */}
      <div className="bg-[url(/history.svg)] h-24 md:h-28 w-full bg-cover relative text-white">
      <div className=" flex h-full items-center z-30 relative justify-evenly md:justify-between md:px-16 text-sm md:text-lg">
        <div className="flex gap-2 items-center">
          <img src="/icon-konfirmasiDonasi.svg" alt="" className="h-9"/>
          <div>
            <h1 className="font-semibold">Rp.25.000.000</h1>
            <h2>Dana Tersalurkan</h2>
          </div>
        </div>
        <div>
        <div className="flex gap-3 items-center">
          <img src="/icon-users.svg" alt="" className="h-9" />
          <div>
            <h1 className="font-semibold">98.000</h1>
            <h2>Orang Terbantu</h2>
          </div>
        </div>
        </div>
      </div>
        <div className="bg-Primary-500/50 backdrop-sepia-0 absolute left-0 right-0 top-0 bottom-0"></div>
      </div>
    </div>
  );
}
