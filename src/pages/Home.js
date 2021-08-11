import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { FiPlus } from 'react-icons/fi';
import { NavLink } from 'react-router-dom';
import { Context as AuthContext } from '../context/userContext';
import Flex from '../components/Flex';
import Modal from '../components/Modal';
import Card from '../components/Card';
import axios from 'axios';

function Home() {
  const [secretRooms, setsecretRooms] = useState([]);
  const [publicRooms, setPublicRooms] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const history = useHistory();
  const { user, isLoggedIn } = useContext(AuthContext);

  const onModalClose = () => {
    setShowModal(false);
  };

  const onModalSubmit = ({ visibility, roomId }) => {
    setShowModal(false);
    history.push(`/room/${roomId}?visibility=${visibility}`);
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
              <p className="text-sm font-normal text-gray-600">{item.roomId}</p>
            </div>
          </div>
        </NavLink>
      );
    });
  };

  useEffect(() => {
    const fetchRooms = async () => {
      const res = await axios.get('http://localhost:4040/public', {
        headers: {
          email: user?.email,
          password: user?.password,
        },
      });
      setPublicRooms(res.data.rooms);
    };

    const fetchSecretRooms = async () => {
      const res = await axios.get('http://localhost:4040/secret', {
        headers: {
          email: user?.email,
          password: user?.password,
        },
      });
      setsecretRooms(res.data.rooms);
    };
    fetchSecretRooms();
    fetchRooms();
  }, [isLoggedIn]);

  return (
    <>
      <Flex className="min-h-full  py-2 px-4 relative ">
        <h4 className="text-base font-semibold text-green-600">
          Hii, {user?.name}
        </h4>
        <p className="text-sm text-gray-500">
          printing and typesetting industry. Lorem Ipsum has been the industry'
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
        <div
          onClick={() => setShowModal(true)}
          className="absolute bottom-5 cursor-pointer right-5 h-12 w-12 rounded-full bg-green-900 flex  justify-center items-center"
        >
          <FiPlus size={24} color="#fff" />
        </div>
      </Flex>
    </>
  );
}

export default Home;
