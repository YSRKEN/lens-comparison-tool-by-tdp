import React, { useContext } from 'react';
import { Modal } from 'react-bootstrap';
import { AppContext } from 'service/store';

const LoadingModal: React.FC = () => {
  const { loadingFlg } = useContext(AppContext);

  return <Modal show={loadingFlg}>
    <Modal.Body>読み込み中...</Modal.Body>
  </Modal>;
};

export default LoadingModal;
