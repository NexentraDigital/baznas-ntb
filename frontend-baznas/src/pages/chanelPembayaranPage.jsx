import React from "react";
import CardPayment from "../components/CardPayment";
import dataPayment from "../datas/dataPayment.json";

export default function ChanelPembayaranPage() {
  return (
    <div className="p-8 text-center">
      <h1 className="text-2xl text-Primary-600 font-bold">
        Channel Pembayaran
      </h1>
      <p className="mt-3 text-sm">
        Anda dapat mengakses layanan digital pembayaran ZIS ke BAZNAS NTB
        melalui melalui berbagai kanal seperti Apps dan Social Media.
      </p>
      <div className="flex flex-wrap gap-8 justify-center mt-8">
        {dataPayment.map((item) => (
          <CardPayment key={item.id} icon={item.icon} />
        ))}
      </div>
      <h1 className="text-sm text-Primary-600 mb-2 mt-8">Anda bisa langsung mendatangi Gerai Zakat BAZNAS di:</h1>
      <div className="flex">
        <img src="/icon-location.svg" alt="" />
        <p className="text-xs text-start">Jl. Catur Warga, Pejanggik, Kec. Selaparang, Kota Mataram, Nusa Tenggara Barat</p>
      </div>
    </div>
  );
}
