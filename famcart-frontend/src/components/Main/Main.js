import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../../store/auth';
import { useNavigate } from 'react-router-dom';
import ListDetails from '../ListDetails/ListDetails';
import { fetchLists, fetchList } from '../../store/list';
import Modal from '../Modal/Modal';
import NewListForm from '../NewListForm/NewListForm';
import './Main.css';

function Main() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const lists = useSelector((state) => state.lists.all);
  const [selectedList, setSelectedList] = useState(null);
  const [showNewListModal, setShowNewListModal] = useState(false);

  const handleLogout = async () => {
    const success = await dispatch(logoutUser());
    if (success === true) {
      navigate('/');
    }
  };

  useEffect(() => {
    dispatch(fetchLists());
  }, [dispatch]);

  const handleTabClick = (list) => {
    dispatch(fetchList(list.id));
    setSelectedList(list);
  };

  const handleAddListClick = () => {
    setShowNewListModal(true);
  };

  return (
    <div>
      <div className='logoutbutton' style={{ textAlign: 'right' }}>
        <button onClick={handleLogout} className="logout-button">Logout</button>
      </div>
      <div className="main-container">
        <div className="tabs-container">
          {lists.map((list) => (
            <div
              key={list.id}
              className={`tab ${selectedList && selectedList.id === list.id ? 'selected-tab' : ''}`}
              onClick={() => handleTabClick(list)}
            >
              {list.name}
            </div>
          ))}
          <div className="tab" onClick={handleAddListClick}>
            +
          </div>
        </div>
        <div className="list-container">
          {selectedList && <ListDetails list={selectedList} />}
        </div>
      </div>
      <Modal show={showNewListModal} onClose={() => setShowNewListModal(false)}>
        <NewListForm onClose={() => setShowNewListModal(false)} />
      </Modal>
    </div>
  );
}

export default Main;
