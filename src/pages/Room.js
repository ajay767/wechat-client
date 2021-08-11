import React, { useEffect, useContext, useMemo, useState, useRef } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { Context as AuthContext } from '../context/userContext';
import { Context as ChatContext } from '../context/chatContext';
import { AiOutlinePlus } from 'react-icons/ai';
import { FiSend } from 'react-icons/fi';
import Flex from '../components/Flex';
import Modal from '../components/Modal';
import queryString from 'query-string';
import io from 'socket.io-client';

import './room.scss';

const socket = io(process.env.REACT_APP_SOCKET, { withCredentials: true });

function Room() {
  const chatRef = useRef(null);
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);

  const [message, setMessage] = useState('');
  const [showModal, setShowModal] = useState(true);

  const history = useHistory();
  const params = useParams();

  const { user } = useContext(AuthContext);
  const { chat, sendMessage, receiveMessage, handleNotice } =
    useContext(ChatContext);

  const query = useMemo(
    () => queryString.parse(history.location.search),
    [history]
  );

  const handleSendingMessage = (message) => {
    if (!message) return;
    sendMessage({ message, author: user?.name, roomId: params.id });
    socket.emit('to-server', { roomId: params.id, message, name: user?.name });
  };

  const renderMessage = () => {
    return chat[params.id]?.map((item, index) => {
      if (item.type === 'notice') {
        return (
          <div
            key={index}
            className="m-2 z-10 self-center bg-gray-900 rounded-md "
          >
            <p className="p-1 px-3 text-sm  text-gray-300 w-max">
              {item.message}
            </p>
          </div>
        );
      } else if (item.type === 'sent') {
        return (
          <div
            key={index}
            className="m-2 z-10  z-10 w-max  rounded bg-green-600 self-end"
          >
            <p className="p-1 px-3 max-w-xs text-sm font-medium  text-white w-max">
              {item.message}
            </p>
            <p className="p-1 px-3 text-xs  text-white font-bold">
              {item.author}
            </p>
          </div>
        );
      }
      return (
        <div key={index} className="m-2 z-10  z-10 w-max  rounded bg-gray-50">
          <p className="p-1 px-3 text-sm max-w-xs font-medium  text-gray-600 w-max">
            {item.message}
          </p>
          <p className="p-1 px-3 text-xs  text-gray-700 font-bold text-right">
            {item.author}
          </p>
        </div>
      );
    });
  };

  useEffect(() => {
    if (chatRef.current.lastElementChild) {
      const lastElement = 150;
      const visibleHeight = chatRef.current.offsetHeight;
      const containerHeight = chatRef.current.scrollHeight;
      const scrollOffset = chatRef.current.scrollTop + visibleHeight;
      if (containerHeight - lastElement <= scrollOffset) {
        chatRef.current.scrollTop = chatRef.current.scrollHeight;
      }
    }
  });

  useEffect(() => {
    const updateWindowHeight = () => {
      setWindowHeight(window.innerHeight);
      console.log('updating height');
    };
    window.addEventListener('resize', updateWindowHeight);

    return () => window.removeEventListener('resize', updateWindowHeight);
  }, []);

  useEffect(() => {
    socket.emit('join-room', {
      roomId: params.id,
      visibility: query.visibility,
      admin: user?.name,
      ...user,
    });

    socket.on('to-client', (obj) => {
      window.navigator.vibrate(300);
      receiveMessage({
        message: obj.message,
        author: obj.name,
        roomId: params.id,
      });
    });

    socket.on('greet', (message) => handleNotice(message, params.id));

    return () => {
      window.navigator.vibrate(0);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params, query]);

  return (
    <Flex
      style={{ maxHeight: `${windowHeight - 90}px` }}
      className="min-h-full  relative flex flex-col "
    >
      <div
        ref={chatRef}
        className="scrollbar-hide flex-1 flex flex-col room overflow-y-scroll pb-5"
      >
        {renderMessage()}
      </div>
      <div className=" flex  p-2 border-t-2">
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          type="text"
          placeholder="Message"
          className="h-12 p-2 flex-1 outline-none bg-transparent"
        />
        <button
          className="ml-2 h-12 w-12 outline-none rounded-full bg-green-600 flex items-center justify-center transform active:scale-95 ease-in"
          onClick={() => handleSendingMessage(message)}
        >
          <FiSend size={24} color="#fff" />
        </button>
      </div>

      {showModal && (
        <Modal>
          <div className="mx-5 bg-white shadow-xl p-4 border  rounded ">
            <div className="flex items-center justify-between">
              <h4 className="text-xl font-bold text-gray-600 ">
                Add Your Friends
              </h4>
              <span
                onClick={() => setShowModal(false)}
                className="h-7 w-7 bg-gray-300 rounded-full flex items-center justify-center transform rotate-45 cursor-pointer"
              >
                <AiOutlinePlus />
              </span>
            </div>
            <p className="text-base font-normal text-gray-600 mt-2">
              Hey {user?.name} your room has been created successfully!, add
              your friends and enjoy chatting.
            </p>

            <button
              onClick={() => {
                const id = params.id;
                navigator.clipboard
                  .writeText(id)
                  .then((data) => {
                    setTimeout(() => setShowModal(false), 500);
                  })
                  .catch((err) => console.log(err));
              }}
              className="bg-green-600 p-2 px-4 text-sm font-medium my-2 rounded text-white transform active:scale-95"
            >
              Copy Room ID
            </button>
          </div>
        </Modal>
      )}
    </Flex>
  );
}

export default Room;
