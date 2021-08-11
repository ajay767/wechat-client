import React, { useMemo } from 'react';
import shortid from 'shortid';
import propTypes from 'prop-types';
import './radio.scss';

function RadioButton({ label, value, name, checked }) {
  const id = useMemo(() => shortid.generate().toLowerCase(), []);
  return (
    <div className="flex items-center mt-2">
      <input
        id={id}
        className="h-5 w-5 hidden"
        type="radio"
        defaultChecked={checked}
        name={name}
        value={value}
      />
      <label
        htmlFor={id}
        className=" flex items-center cursor-pointer  text-base font-medium text-gray-600"
      >
        {label}

        <span className="ml-2 h-5 w-5 p-px  border-2 border-gray-400 rounded-full">
          <span className="h-full w-full bg-green-600 block rounded-full"></span>
        </span>
      </label>
    </div>
  );
}

RadioButton.propTypes = {
  label: propTypes.string,
  name: propTypes.string,
  id: propTypes.string,
  value: propTypes.oneOfType([
    propTypes.bool,
    propTypes.string,
    propTypes.number,
  ]),
};

export default RadioButton;
