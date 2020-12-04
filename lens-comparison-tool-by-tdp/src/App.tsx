import React, { } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import LensDataCard from 'component/LensDataCard';
import LensDataCard2 from 'component/LensDataCard2';
import { AppContext, useAppStore } from 'service/store';

const App: React.FC = () => {
  return <Container fluid>
    <Row className="my-3">
      <Col className="text-center">
        <h1>レンズ比較ツール</h1>
      </Col>
    </Row>
    <Row className="my-3">
      <Col className="d-flex justify-content-center">
        <LensDataCard2 />
      </Col>
    </Row>
  </Container>;
}

export default App;
