import React from 'react';
import { Form } from 'react-bootstrap';
import { AppContext, useAppStore } from 'service/store';
import LensListBox from 'component/LensListBox';
import CameraListBox from 'component/CameraListBox';

const LensDataCard2: React.FC = () => {
  return <AppContext.Provider value={useAppStore()}>
    <div className="border">
      <Form className="m-3">
        <LensListBox />
        <CameraListBox />
      </Form>
    </div>
  </AppContext.Provider>;
};

export default LensDataCard2;
