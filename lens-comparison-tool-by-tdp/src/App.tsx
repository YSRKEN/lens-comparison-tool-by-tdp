import React, { } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import LensDataCard2 from 'component/LensDataCard2';

const App: React.FC = () => {
  return <Container fluid>
    <Row className="my-3">
      <Col className="text-center">
        <h1>レンズ比較ツール</h1>
      </Col>
    </Row>
    <Row className="my-3">
      <Col className="text-center">
        <span className="d-inline-block mr-3">Ver.1.0.0</span>
        <span className="d-inline-block mr-3"><a href="https://github.com/YSRKEN/lens-comparison-tool-by-tdp" rel="noreferrer" target="_blank">GitHub</a></span>
        <span><a href="https://twitter.com/YSRKEN" rel="noreferrer" target="_blank">ツール作者のTwitter</a></span>
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
