import React from 'react';
import { Form } from 'react-bootstrap';
import { AppContext, useAppStore } from 'service/store';
import LensListBox from 'component/LensListBox';
import CameraListBox from 'component/CameraListBox';
import FliListBox from 'component/FliListBox';
import ApiListBox from 'component/ApiListBox';
import LoadingModal from 'component/LoadingModal';

const LensDataCard2: React.FC = () => {
  return <AppContext.Provider value={useAppStore()}>
    <div className="border">
      <Form className="m-3">
        <LensListBox />
        <CameraListBox />
        <FliListBox />
        <ApiListBox />
      </Form>
    </div>
    <LoadingModal />
  </AppContext.Provider>;
};

export default LensDataCard2;
