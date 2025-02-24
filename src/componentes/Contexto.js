import React, { useState, useEffect } from 'react';
import cyiapi from '../cyiapi';

const Contexto = ({ onChange, value }) => {
  const [contextos, setContextos] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await cyiapi.get('/contextodes'); // Use axios.get
        setContextos(response.data); // Set data from response object
      } catch (error) {
        console.error('Erro:', error);
      }
    };

    fetchData(); // Call the function to fetch data
  }, []);

  return (
    <select value={value} onChange={onChange}>
      {contextos.map((contexto) => (
        <option key={contexto.contextoId} value={contexto.contextoId}>
          {contexto.descricao}
        </option>
      ))}
    </select>
  );
};

export default Contexto;