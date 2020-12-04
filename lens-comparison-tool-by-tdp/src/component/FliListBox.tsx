import React, { FormEvent, useContext } from 'react';
import { Form } from 'react-bootstrap';
import { AppContext } from 'service/store';

const FliListBox: React.FC = () => {
  const { fliList, fliId, dispatch } = useContext(AppContext);

  const onChangeSelect = (e: FormEvent<any>) => {
    if (e.currentTarget.value !== '-1') {
      dispatch({ type: 'setFliId', message: e.currentTarget.value });
    }
  }

  if (fliList.length > 0) {
    return <Form.Group>
      <Form.Label>焦点距離</Form.Label>
      <select className="form-control" size={5} value={fliId} onChange={onChangeSelect}>
        {fliList.map(r => <option key={r.id} value={r.id}>{r.name}</option>)}
      </select>
    </Form.Group>;
  } else {
    return <Form.Group>
      <Form.Label>焦点距離</Form.Label>
      <select className="form-control" size={5} disabled={true}>
        <option>読み込み中...</option>
      </select>
    </Form.Group>;
  }
}

export default FliListBox;
