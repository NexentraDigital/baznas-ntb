import React from "react";
import { Link } from "react-router-dom";
import '../custom.css';

const socialMedia = [
  { id: 1, icon: "/icon_instagram.svg", link: "" },
  { id: 2, icon: "/icon_youtube.svg", link: "" },
  { id: 3, icon: "/icon_whatsapp.svg", link: "" },
  { id: 4, icon: "/icon_facebook.svg", link: "" },
];

const footerMenu = [
  {
    id: 1,
    title: "Kenali Kami",
    menu: [
      "About",
      "Syarat dan Ketentuan",
      "Kebijakan Privasi",
      "Hubungi Kami",
    ],
  },
  {
    id: 2,
    title: "Layanan",
    menu: [
      "Rekening Zakat",
      "Konfirmasi Donasi",
      "Kalkulator",
      "Channel Pembayaran",
      "Jemput Zakat",
    ],
  },
  { id: 3, title: "Donasi", menu: ["Zakat", "Infoq", "Fidyah", "Program"] },
];

export default function Footer() {
  return (
    <footer
      className="bg-footer relative bg-no-repeat h-fit bg-Primary-600 bg-opacity-85 bg-center pt-8 px-6 bg-cover"
    >
      <div className="relative z-20 md:flex md:pb-5 md:justify-between md:gap-5 md:pt-5">
        {/* Identitas */}
        <div>
          <img src="/logoBaznas.png" alt="Logo Baznas" className="h-20" />
          <p className="text-white text-lg md:text-xs lg:text-base mt-5">
            Jl. Catur Warga, Pejanggik, <br /> Kec. Selaparang, Kota Mataram,{" "}
            <br />
            Nusa Tenggara Barat
          </p>
          <h3 className="mt-5 text-lg md:text-base lg:text-xl font-bold text-white">SOCIAL MEDIA</h3>
          <div className="flex gap-4 mt-4">
            {socialMedia.map((item) => (
              <a
                href={item.link}
                className="h-12 w-12 md:w-7 md:h-7 lg:h-12 lg:w-12 bg-neutral-300 rounded-full items-center justify-center flex hover:bg-Secondary-500 hover:scale-110 hover:translate-y-1 hover:shadow-xl transition delay-75 ease-in-out"
              >
                <img src={item.icon} alt="" className="h-6 md:h-4 lg:h-6" />
              </a>
            ))}
          </div>
        </div>

        {/* menu footer */}
        <div className="hidden md:flex text-white gap-3 lg:gap-8 md:text-sm lg:text-lg">
          {footerMenu.map((section) => (
            <div key={section.id} className="flex flex-col gap-5 lg:gap-9 ">
              <h3 className="font-bold lg:text-lg">{section.title}</h3>
              <ul className="flex flex-col gap-3 lg:gap-5 lg:text-lg">
                {section.menu.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>


        {/* Email Bar */}
        <div className="lg:flex lg:flex-col lg:gap-3">
          <h3 className="mt-5 md:mt-0 text-2xl md:text-lg lg:text-xl text-white font-bold">Our Newsletter</h3>
          <h6 className="hidden md:block text-white md:text-xs lg:text-base">Subscribe to our newsletter <br />and receive the latest news <br />about our products and services!</h6>
          <div className="flex mt-4">
            <input
              type="text"
              placeholder="Enter your email address"
              className="h-12 px-2 py-1 bg-white rounded-l-lg w-full border-[1px] border-r border-neutral-400 md:text-sm lg:text-base  md:w-36 lg:w-fit lg:px-2"
            />
            <button className="rounded-r-lg w-32 h-12 bg-Primary-500 text-white font-semibold md:w-fit md:text-sm lg:text-base md:px-1 lg:px-2">
              Subscribe
            </button>
          </div>
        </div>
      </div>
      <hr className="bg-Primary-500 hidden md:block " />
      <h1 className="text-white text-sm text-center mt-8 relative z-20 pb-5 lg:text-base">
        © Copyright 2024, All Rights Reserved by Baznas NTB
      </h1>
      <div className="absolute top-0 bottom-0 left-0 right-0 bg-gradient-to-r from-[#259148] to-[#0B2B15] opacity-75"></div>
    </footer>
  );
}
