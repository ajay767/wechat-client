import { useEffect } from 'react';
import ReactDOM from 'react-dom';

const el = document.createElement('div');
const modal = document.getElementById('modal');

function Modal({ children }) {
  useEffect(() => {
    modal.appendChild(el);
    return () => {
      modal.removeChild(el);
    };
  });

  return ReactDOM.createPortal(
    <div
      className="
absolute
top-0
right-0
bottom-0
left-0
h-screen
w-screen
backdrop-filter backdrop-blur-sm
flex
items-center
justify-center
z-20
"
    >
      {children}
    </div>,
    el
  );
}

export default Modal;
