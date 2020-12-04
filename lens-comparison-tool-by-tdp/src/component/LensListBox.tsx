import React, { FormEvent, useContext, useState } from 'react';
import { Form } from 'react-bootstrap';
import { AppContext } from 'service/store';

const LensListBox: React.FC = () => {
  const { lensList, lensId, dispatch } = useContext(AppContext);

  const [filter, setFilter] = useState('');

  const onChangeFilter = (e: FormEvent<any>) => setFilter(e.currentTarget.value);
  const onChangeSelect = (e: FormEvent<any>) => {
    if (e.currentTarget.value !== '-1') {
      dispatch({ type: 'setLensId', message: e.currentTarget.value });
    }
  }

  if (lensList.length > 0) {
    const filteredList = [
      ...lensList.filter(r => r.id === lensId),
      { id: '-1', name: '----------------------------------------' },
      ...lensList.filter(r => r.name.includes(filter) && r.id !== lensId)
    ];

    return <Form.Group>
      <Form.Label>レンズ名</Form.Label>
      <Form.Control className="mb-1" size="sm" value={filter} onChange={onChangeFilter} placeholder="フィルター" />
      <select className="form-control" size={5} value={lensId} onChange={onChangeSelect}>
        {filteredList.map(r => <option key={r.id} value={r.id}>{r.name}</option>)}
      </select>
    </Form.Group>;
  } else {
    return <Form.Group>
      <Form.Label>レンズ名</Form.Label>
      <select className="form-control" size={5} disabled={true}>
        <option>読み込み中...</option>
      </select>
    </Form.Group>;
  }
}

export default LensListBox;
