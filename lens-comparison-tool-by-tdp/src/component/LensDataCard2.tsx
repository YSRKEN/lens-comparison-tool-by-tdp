import React from 'react';
import { Form } from 'react-bootstrap';
import { AppContext, useAppStore } from 'service/store';
import LensListBox from 'component/LensListBox';

const LensDataCard2: React.FC = () => {
  return <AppContext.Provider value={useAppStore()}>
    <div className="border">
      <Form className="m-3">
        <LensListBox />
      </Form>
    </div>
  </AppContext.Provider>;
};

export default LensDataCard2;
