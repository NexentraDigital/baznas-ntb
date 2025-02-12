import React from "react";
import CardPayment from "../components/CardPayment";
import dataPayment from "../datas/dataPayment.json";

export default function ChanelPembayaranPage() {
  return (
    <div className="p-8 text-center">
      <h1 className="text-2xl md:text-3xl lg:text-4xl text-Primary-600 font-bold">
        Channel Pembayaran
      </h1>
      <p className="mt-3 text-sm md:text-base lg:text-lg">
        Anda dapat mengakses layanan digital pembayaran ZIS ke BAZNAS NTB
        melalui melalui berbagai kanal seperti Apps dan Social Media.
      </p>
      <div className="flex flex-wrap gap-8 lg:gap-10 justify-center mt-8 lg:mt-10">
        {dataPayment.map((item) => (
          <CardPayment key={item.id} icon={item.icon} />
        )
        )
        }
      </div>
      <h1 className="text-sm md:text-base lg:text-lg text-Primary-600 mb-2 lg:mb-3 mt-8">
        Anda bisa langsung mendatangi Gerai Zakat BAZNAS di:
      </h1>
      <div className="flex md:justify-center items-center">
        <img src="/icon-location.svg" alt="" />
        <p className="text-xs md:text-sm lg:text-base text-start ">
          Jl. Catur Warga, Pejanggik, Kec. Selaparang, Kota Mataram, Nusa
          Tenggara Barat
        </p>
      </div>
    </div>
  );
}
