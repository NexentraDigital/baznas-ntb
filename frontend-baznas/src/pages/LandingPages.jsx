import React from "react";
import Slider from "react-slick";
import CardLayananKami from "../components/CardLayananKami";
import dataLayanan from "../datas/dataLayanan.json";
import CardFundraising from "../components/CardFundraising";
import CardCeritaAksi from "../components/CardCeritaAksi";
import Carousel from "../elements/Carousel";

export default function LandingPages() {
  const statistikZis = [
    { jumlah: "25 Ribu", keterangan: "Muzakki" },
    { jumlah: "90.5 Milyar", keterangan: "Penyaluran" },
    { jumlah: "50.45 Milyar", keterangan: "Penghimpunan" },
    { jumlah: "20.87 Ribu", keterangan: "Mustahik" },
  ];

  const itemsFundraising = [
    {
      title: "Bantu Pendidikan Anak Bangsa",
      img: "/imgCeritaAksiDummy.svg",
    },
    {
      title: "Alirkan Pahala Tak Terputus Dengan Sedekah Al-Qur’an",
      img: "/imgCeritaAksiDummy.svg",
    },
  ];

  const itemsCeritaAksi = [
    {
      title: "Satu Karung Beras, Sejuta Senyum Yatim",
      img: "/imgCeritaAksiDummy.svg",
      content:
        "Figma is an interface design tool that is gaining popularity among UI/UX designers due to its ease.",
    },
    {
      title: "Bantu Pendidikan Anak Bangsa",
      img: "/imgCeritaAksiDummy.svg",
      content:
        "Education is a fundamental right that every child deserves to have.",
    },
    {
      title: "Dukung UMKM Lokal",
      img: "/imgCeritaAksiDummy.svg",
      content:
        "Local businesses are the backbone of our economy. Let's support them together.",
    },
  ];
  return (
    <div className="">
      {/* Hero Section */}
      <div>
        <img
          src="/banner-landingPage.jpg"
          alt=""
          className="bg-cover w-full  "
        />
      </div>

      {/* Section informasi */}
      <div className="bg-[url(/history.svg)] h-20 md:h-28 w-full bg-cover relative text-white">
        <div className=" flex h-full items-center z-30 relative justify-evenly md:justify-between md:px-16 text-sm md:text-lg lg:px-32">
          <div className="flex gap-2 items-center">
            <img
              src="/icon-konfirmasiDonasi.svg"
              alt=""
              className="h-9 lg:h-16"
            />
            <div>
              <h1 className="font-semibold text-lg md:text-xl lg:text-3xl ">
                Rp.25.000.000
              </h1>
              <h2>Dana Tersalurkan</h2>
            </div>
          </div>
          <div>
            <div className="flex gap-3 items-center">
              <img src="/icon-users.svg" alt="" className="h-9 lg:h-16" />
              <div>
                <h1 className="font-semibold text-lg md:text-xl lg:text-3xl ">
                  98.000
                </h1>
                <h2>Orang Terbantu</h2>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-Primary-500/50 backdrop-sepia-0 absolute left-0 right-0 top-0 bottom-0"></div>
      </div>

      {/* Section Layanan Kami */}
      <div className="bg-[url(/bg-layananKami.svg)] bg-cover pt-7 flex flex-col px-1 relative">
        <div className="reltive z-30">
          <h1 className="text-Primary-600 text-center text-2xl md:text-3xl lg:text-4xl font-bold">
            Layanan Kami
          </h1>
          <p className="text-neutral-600 mt-4 text-center text-[12px] md:text-lg lg:text-xl md:px-5">
            Layanan kami memudahkan penunaian zakat dan donasi, membantu sesama
            dengan berbagai kemudahan seperti kalkulator zakat, jemput zakat,
            dan konfirmasi donasi.
          </p>
          <div className="mt-12  flex flex-wrap justify-center gap-5 lg:gap-x-20">
            {dataLayanan.map((item) => (
              <div className="mb-7 ">
                <CardLayananKami
                  key={item.id}
                  icon={item.icon}
                  title={item.title}
                  buttonText={item.textButton}
                  link={item.link}
                >
                  {item.description}
                </CardLayananKami>
              </div>
            ))}
          </div>
        </div>
        <div class="bg-white/70 backdrop-sepia-0 absolute left-0 right-0 top-0 bottom-0"></div>
      </div>

      {/* Section Fundraising */}
      <div className="px-5 bg-[url(/bg-fundraising.svg)] bg-cover relative p-5 ">
        <div className="relative z-30 flex flex-col items-center">
          <h1 className="text-white text-center text-2xl md:text-3xl lg:text-4xl font-bold">
            Berbagi Hingga Ke Pelosok
          </h1>
          <p className="text-white mt-2 text-center text-sm md:text-lg lg:text-xl mb-10">
            Wujudkan Rasa Syukur Atas Nikmat Dan Karunia Dari Allah SWT Dengan
            Berbagi Kebahagiaan Kepada Para Dhaufa Hingga Ke Berbagai Daerah
          </p>
          <div className="w-full mb-6">
            <Carousel>
              {itemsFundraising.map((item, index) => (
                <center key={index}>
                  <CardFundraising img={item.img} title={item.title} />
                </center>
              ))}
            </Carousel>
          </div>
        </div>
        <div className="bg-Primary-500/50 absolute left-0 right-0 top-0 bottom-0"></div>
      </div>

      {/* Section Statistik ZIS */}
      <div className="px-3 py-5 md:flex md:p-10 md:gap-5 lg:gap-10 justify-center">
        <div className="md:w-1/2">
          <h1 className="text-Primary-600 text-center md:text-start text-2xl md:text-3xl lg:text-4xl font-bold">
            Statistik ZIS Se Provinsi <br /> Nusa Tenggara Barat
          </h1>
          <p className="text-neutral-600 mt-4 text-center md:text-start text-[12px] md:text-lg lg:text-xl">
            Statistik Zakat, Infak, dan Sedekah (ZIS) di Nusa Tenggara Barat
            mencerminkan kontribusi dan distribusi untuk mendukung kesejahteraan
            masyarakat.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4 mt-10 md:gap-x-16 md:mt-0 ">
          {statistikZis.map((item, index) => (
            <div key={index} className="pl-4 md:">
              <h1 className="text-2xl md:txt-3xl lg:text-4xl text-Primary-600 font-bold">
                {item.jumlah}
              </h1>
              <h2 className="text-base md:text-lg lg:text-xl text-neutral-600">{item.keterangan}</h2>
            </div>
          ))}
        </div>
      </div>

      {/* Section Cerita Aksi */}
      <div className="relative bg-[url(/bg-ceritaAksi.svg)] bg-cover">
        <div className="relative z-30 p-5 w-full ">
          <h1 className="text-2xl md:text-3xl font-bold text-center text-white">
            Cerita Aksi
          </h1>
          <p className="text-center md:text-lg text-sm text-white mt-2">
            Mari cari tahu info terkini mengenai aksi penyaluran Zakat, Infaq &
            Sadaqah BAZNAS Nusa Tenggara Barat
          </p>
          <div className=" mb-7">
            <Carousel>
              {itemsCeritaAksi.map((item, index) => (
                <center key={index}>
                  <CardCeritaAksi title={item.title} img={item.img}>
                    {item.content}
                  </CardCeritaAksi>
                </center>
              ))}
            </Carousel>
          </div>
        </div>

        <div className="bg-Neutral-600/50 absolute left-0 right-0 top-0 bottom-0"></div>
      </div>
    </div>
  );
}
