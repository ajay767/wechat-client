import React, { useEffect, useRef } from 'react';
import qrMaker from 'qrcode';
import { v4 } from 'uuid';

function QRcode() {
  const canvas = useRef(null);

  useEffect(() => {
    qrMaker.toCanvas(canvas.current, v4(), function (error) {
      if (error) console.error(error);
      console.log('success!');
    });
  }, []);
  return (
    <div className="flex justify-around items-center">
      <div className="">
        <h4 className="text-base font-semibold text-gray-600">Room ID</h4>
        <p className="text-base font-normal text-gray-500 w-10/12">
          scan this QR code with your phone to login to chat Lorem Ipsum is
          simply dummy text of the printing and typesetting industry. Lorem
          Ipsum has been the industry'
        </p>
      </div>
      <div className="">
        <div className="m-2 mx-auto h-56 w-56 bg-green-500 rounded-full flex items-center justify-center">
          <canvas ref={canvas}></canvas>
        </div>
      </div>
    </div>
  );
}

export default QRcode;
