import React, { useState } from 'react';

import { useStore } from '../store';
import { inspectText } from '../inspectText';

export const Form = () => {
  const { records, addPerson, updatePerson } = useStore(state => ({
    records: state.records,
    addPerson: state.addPerson,
    updatePerson: state.updatePerson,
  }));

  const [value, updateValue] = useState<string>('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const submittedText = inspectText(value);
    if (submittedText.status === 'failed') {
      alert('a(n) ' + submittedText.reason + ' appears to be missing.');
    } else if (submittedText.name && submittedText.amount) {
      records.find(
        (record: { name: string }) => record.name === submittedText.name,
      )
        ? updatePerson(
            submittedText.name,
            submittedText.amount,
            submittedText.change,
          )
        : addPerson(
            submittedText.name,
            submittedText.amount,
            submittedText.change,
          );
    }
    updateValue('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        className="text-input"
        type="text"
        value={value}
        onChange={e => updateValue(e.target.value)}
      />
      <div className="placeholder"></div>
    </form>
  );
};
