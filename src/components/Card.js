import React, { useState, useMemo } from 'react';
import { v4 } from 'uuid';
import RadioButton from './RadioButton';

function Card({ onSubmit, onClose }) {
  const [visibility, setVisibility] = useState('');

  const roomId = useMemo(() => v4(), []);
  const handleSubmit = (e) => {
    setVisibility(e.target.value);
    console.log(visibility);
  };

  return (
    <div className="mx-5 bg-white shadow-xl p-4 border  rounded ">
      <h4 className="text-xl font-bold text-gray-600">Wechat Meeting Room</h4>
      <p className="text-base font-normal text-gray-600 mt-2">
        Hurray!! your room is ready to share
        <span className="text-base font-bold text-green-600"> {roomId} </span>
        You are about to create your wechat room, do you want to make it public
        or secret
      </p>
      <div onChange={handleSubmit}>
        <RadioButton label="Public" value={true} name="visibility" />
        <RadioButton label="Secret" value={false} name="visibility" />
      </div>
      <div className="flex justify-end mt-2">
        <button
          onClick={onClose}
          className="bg-gray-100 p-2 px-4 text-sm font-medium ml-2 rounded text-gray-400 "
        >
          Cancle
        </button>
        <button
          onClick={() => {
            onSubmit({ visibility, roomId });
          }}
          className="bg-green-600 p-2 px-4 text-sm font-medium ml-2 rounded text-white "
        >
          Create
        </button>
      </div>
    </div>
  );
}

export default Card;
