import React, { FormEvent, useContext } from 'react';
import { Form } from 'react-bootstrap';
import { AppContext } from 'service/store';

const ApiListBox: React.FC = () => {
  const { apiList, apiId, dispatch } = useContext(AppContext);

  const onChangeSelect = (e: FormEvent<any>) => {
    if (e.currentTarget.value !== '-1') {
      dispatch({ type: 'setApiId', message: e.currentTarget.value });
    }
  }

  if (apiList.length > 0) {
    return <Form.Group>
      <Form.Label>F値</Form.Label>
      <select className="form-control" size={5} value={apiId} onChange={onChangeSelect}>
        {apiList.map(r => <option key={r.id} value={r.id}>{r.name}</option>)}
      </select>
    </Form.Group>;
  } else {
    return <Form.Group>
      <Form.Label>F値</Form.Label>
      <select className="form-control" size={5} disabled={true}>
        <option>読み込み中...</option>
      </select>
    </Form.Group>;
  }
}

export default ApiListBox;
