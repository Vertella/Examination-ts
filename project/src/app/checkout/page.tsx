"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { fetchOrderNumber } from "../api";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";


const EtaPage: React.FC = () => {
    const searchParams = useSearchParams();
  //const orderNumber = searchParams.get("orderNumber");
  const router = useRouter();
  const { orderNumber } = router.query;
  console.log(orderNumber); 
  return (
    <div className="bg-clay w-full h-screen flex flex-col items-center">
      <div className="flex self-center mt-20">
        <Image
          className="flex self-center"
          src="/boxtop.png"
          alt="Cart Icon"
          width={390}
          height={362}
          priority
        />
      </div>
      <div className="flex flex-col w-[326px] p-4 content-center justify-between">
        <div className="flex">
          <p className=" font-bold text-3xl text-center">
            DINA WONTONS TILLAGAS!
          </p>
        </div>
        <div className="m-6">
          <p className="font-medium text-2xl text-center">ETA 5 MIN</p>
        </div>
        {/* TENANT HERE ? */}
        <div> {orderNumber} </div>
      </div>
      <div className="flex w-[358px] mt-4 place-self-center place-content-end h-full flex-col gap-4 mb-4">
        <div className="bg-shade24dark w-full rounded border border-snow flex flex-row p-4">
          <button className="w-full">
            <p className="font-bold text-2xl text-snow text-center">
              SE KVITTO
            </p>
          </button>
        </div>
        <button className="bg-coal flex w-full text-snow py-2 px-6 rounded-md p-4">
          <p className="font-bold text-2xl text-center">
            GÖR EN NY BESTÄLLNING
          </p>
        </button>
      </div>
    </div>
  );
};

export default EtaPage;
