import React, { useContext } from 'react';
import { Form } from 'react-bootstrap';
import { AppContext } from 'service/store';

const ImageList: React.FC = () => {
  const { images } = useContext(AppContext);

  if (images.center !== '') {
    return <Form.Group>
      <Form.Label>画像</Form.Label><br />
      <img src={images.center} alt="center" style={{ maxWidth: 700, height: 'auto' }} /><br /><br />
      <img src={images.middle} alt="middle" style={{ maxWidth: 700, height: 'auto' }} /><br /><br />
      <img src={images.corner} alt="corner" style={{ maxWidth: 700, height: 'auto' }} />
    </Form.Group>;
  } else {
    return <Form.Group>
      <Form.Label>画像</Form.Label><br />
      <Form.Label>読込中...</Form.Label>
    </Form.Group>;
  }
}

export default ImageList;
