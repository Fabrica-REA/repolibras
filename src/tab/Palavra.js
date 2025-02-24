import React, { useContext } from 'react';
import { UserContext } from '../../UserContext';

export default function Palavra() {
  const { id } = useContext(UserContext);

  return (
    <div>
      <label><strong>ID:</strong> {id}</label>
    </div>
  );
}
