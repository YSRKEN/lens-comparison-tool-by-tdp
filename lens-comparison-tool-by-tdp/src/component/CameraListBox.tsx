import React, { FormEvent, useContext } from 'react';
import { Form } from 'react-bootstrap';
import { AppContext } from 'service/store';

const CameraListBox: React.FC = () => {
  const { cameraList, cameraId, dispatch } = useContext(AppContext);

  const onChangeSelect = (e: FormEvent<any>) => {
    if (e.currentTarget.value !== '-1') {
      dispatch({ type: 'setCameraId', message: e.currentTarget.value });
    }
  }

  if (cameraList.length > 0) {
    return <Form.Group>
      <Form.Label>カメラ名</Form.Label>
      <select className="form-control" size={5} value={cameraId} onChange={onChangeSelect}>
        {cameraList.map(r => <option key={r.id} value={r.id}>{r.name}</option>)}
      </select>
    </Form.Group>;
  } else {
    return <Form.Group>
      <Form.Label>カメラ名</Form.Label>
      <select className="form-control" size={5} disabled={true}>
        <option>読み込み中...</option>
      </select>
    </Form.Group>;
  }
}

export default CameraListBox;
