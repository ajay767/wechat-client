import React from 'react';

function Flex({ children, className, ...props }) {
  return (
    <div className={`flex-1 ${className}`} {...props}>
      {children}
    </div>
  );
}

export default Flex;
