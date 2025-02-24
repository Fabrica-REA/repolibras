import React, { useState, useEffect } from 'react';
import cyiapi from '../cyiapi';

function ComboBoxContexto( props) {
  const [data, setData] = useState([]);
  const [selected, setSelected] = useState('');

  useEffect(() => {
    cyiapi.get('/contextosdes')
      .then(response => {
        setData(response.data);
        setSelected('Geral');
        console.log(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const handleChange = (event) => {
    props.onChange(event);
  }
  
  return (
    <div>
      <select onChange={handleChange}>
        <option value="">Selecione o contexto</option>
        {data.map((item) => (
          <option key={item.id} value={item.id} descricao={item.descricao} >{item.descricao}</option>
        ))}
      </select>
    </div>
  );
}

export default ComboBoxContexto;
