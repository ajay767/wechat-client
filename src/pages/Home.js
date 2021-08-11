import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { FiPlus } from 'react-icons/fi';
import { FaUserSecret } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
import { Context as AuthContext } from '../context/userContext';
import moment from 'moment';
import Flex from '../components/Flex';
import Modal from '../components/Modal';
import Card from '../components/Card';
import axios from 'axios';

function Home() {
  const [secretRooms, setsecretRooms] = useState([]);
  const [publicRooms, setPublicRooms] = useState([]);
  const [secretRoomId, setSecretRoomId] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [secretRoomModal, setSecretRoomModal] = useState(false);
  const history = useHistory();
  const { user, isLoggedIn } = useContext(AuthContext);

  const onModalClose = () => {
    setShowModal(false);
  };

  const onModalSubmit = ({ visibility, roomId }) => {
    setShowModal(false);
    history.push(`/room/${roomId}?visibility=${visibility}`);
  };

  const joinSecretRoom = (roomId) => {
    setSecretRoomModal(false);
    if (!roomId) {
      return;
    }
    history.push(`/room/${roomId}?visibility=false`);
  };

  const renderRooms = (rooms) => {
    return rooms.map((item, index) => {
      return (
        <NavLink
          key={index}
          to={`/room/${item.roomId}?visibility=${item.visibility}`}
        >
          <div className="py-2 pl-1 my-2 flex flex-row justify-start items-center hover:bg-gray-200 rounded cursor-pointer">
            <img
              src="/assets/user.png"
              alt="group"
              className="h-12 w-12 mr-2"
            />
            <div>
              <h4 className="text-sm font-semibold text-gray-600">
                {item.admin}
              </h4>
              <p className="text-sm font-normal text-gray-600">
                Created {moment(item.createdAt).fromNow()}
              </p>
            </div>
          </div>
        </NavLink>
      );
    });
  };

  useEffect(() => {
    const fetchRooms = async () => {
      const res = await axios.get(
        `${process.env.REACT_APP_SOCKET}/api/public`,
        {
          headers: {
            email: user?.email,
            password: user?.password,
          },
        }
      );

      setPublicRooms(res.data.rooms);
    };

    const fetchSecretRooms = async () => {
      const res = await axios.get(
        `${process.env.REACT_APP_SOCKET}/api/secret`,
        {
          headers: {
            email: user?.email,
            password: user?.password,
          },
        }
      );
      setsecretRooms(res.data.rooms);
    };
    fetchSecretRooms();
    fetchRooms();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggedIn]);

  return (
    <>
      <Flex className="min-h-full  py-2 px-4 relative ">
        <h4 className="text-base font-semibold text-green-600">
          Hii, {user?.name}
        </h4>
        <p className="text-sm text-gray-500">
          WeChat is one of the world's most popular social media messaging apps,
          and is similar to WhatsApp
        </p>
        <div className="my-4">
          <h4 className="text-base text-red-700 font-bold">Secret Rooms</h4>
          {Boolean(secretRooms.length) && renderRooms(secretRooms)}
          {!secretRooms.length && (
            <div className="text-center h-24 flex items-center justify-center text-base font-medium text-gray-400">
              Shh! its secret, create your's
            </div>
          )}
          <h4 className="text-base text-red-700 font-bold">Public Rooms</h4>
          {Boolean(publicRooms.length) && renderRooms(publicRooms)}
          {!publicRooms.length && (
            <div className="text-center h-24 flex items-center justify-center text-base font-medium text-gray-400">
              Ooops, No public room!!
            </div>
          )}
        </div>
        {showModal && (
          <Modal>
            <Card onClose={onModalClose} onSubmit={onModalSubmit} />
          </Modal>
        )}

        {secretRoomModal && (
          <Modal>
            <div className="mx-5 bg-white shadow-xl p-4 rounded w-full ">
              <h4 className="text-xl font-bold text-gray-600">
                Wechat Secret Room
              </h4>
              <p className="text-sm text-gray-600 my-2">
                Enter your secret room ID
              </p>
              <input
                type="text"
                name="secret"
                value={secretRoomId}
                onChange={(e) => setSecretRoomId(e.target.value)}
                className="h-10 rounded border border-gray-400 w-full p-2 outline-none"
              />
              <div className="flex justify-end mt-2">
                <button
                  onClick={() => setSecretRoomModal(false)}
                  className="bg-gray-100 p-2 px-4 text-sm font-medium ml-2 rounded text-gray-400 "
                >
                  Cancle
                </button>
                <button
                  onClick={() => joinSecretRoom(secretRoomId)}
                  className="bg-green-600 p-2 px-4 text-sm font-medium ml-2 rounded text-white "
                >
                  Join
                </button>
              </div>
            </div>
          </Modal>
        )}
        <div className="absolute bottom-5 cursor-pointer right-5">
          <div
            onClick={() => setSecretRoomModal(true)}
            className="cursor-pointer  flex  justify-between items-center"
          >
            <div className="h-12 w-12 my-2 rounded-full bg-green-900 flex  justify-center items-center">
              <FaUserSecret size={24} color="#fff" />
            </div>
          </div>
          <div
            onClick={() => setShowModal(true)}
            className="cursor-pointer  flex  justify-center items-center"
          >
            <div className=" h-12 w-12 rounded-full bg-green-900 flex  justify-center items-center">
              <FiPlus size={24} color="#fff" />
            </div>
          </div>
        </div>
      </Flex>
    </>
  );
}

export default Home;
