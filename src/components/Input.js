import React from 'react';

import propTypes from 'prop-types';

function Input({ value, setValue, label, type = 'text' }) {
  return (
    <div className="w-full">
      <h4 className="text-sm font-semibold text-gray-600">{label}</h4>
      <input
        className="w-full h-10 my-2 p-2 border border-gray-400 rounded outline-none text-base text-gray-800"
        name="name"
        type={type}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  );
}

Input.propTypes = {
  value: propTypes.string,
  setValue: propTypes.func,
  label: propTypes.string,
  type: propTypes.string,
};

export default Input;
