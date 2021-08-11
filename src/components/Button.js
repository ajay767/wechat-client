import React from 'react';
import propTypes from 'prop-types';

function Button({ children, onClick }) {
  return (
    <button
      className="p-2 px-4 bg-green-800 text-white rounded font-bold transform active:scale-95 ease-in"
      onClick={onClick}
    >
      {children}
    </button>
  );
}

Button.propTypes = {
  children: propTypes.string,
  onClick: propTypes.func,
};

export default Button;
