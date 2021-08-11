import React from 'react';

function Footer() {
  return (
    <div className="p-4 border-t-2 border-gray-100">
      <h4 className="text-sm text-gray-500 font-medium flex items-center justify-center">
        Wechat <span className="text-xl mx-1"> &copy; </span>
        {new Date().getFullYear()}
      </h4>
    </div>
  );
}

export default Footer;
