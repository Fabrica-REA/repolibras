import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useTable } from 'react-table';

const Estatistica = () => {
  const [data, setData] = useState([]);

  // Carregar dados
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get('http://localhost:5002/tipos');
      setData(result.data);
    };
    fetchData();
  }, []);

  // Salvar linha
  const saveRow = async (row) => {
    await axios.put(`http://localhost/tipoIU/${row.ID}`, row);
  };

  // Excluir linha
  const deleteRow = async (row) => {
    await axios.delete(`http://localhost/tipoD/${row.ID}`);
    setData(data.filter((item) => item.ID !== row.ID));
  };

  // Salvar todos
  const saveAll = async () => {
    await axios.post('http://localhost/tiposalvatodos', data);
  };

  const columns = React.useMemo(
    () => [
      {
        Header: 'ID',
        accessor: 'ID',
      },
      {
        Header: 'Descrição',
        accessor: 'Descrição',
      },
      {
        Header: 'Salvar',
        Cell: ({ row }) => (
          <button onClick={() => saveRow(row.original)}>Salvar</button>
        ),
      },
      {
        Header: 'Excluir',
        Cell: ({ row }) => (
          <button onClick={() => deleteRow(row.original)}>Excluir</button>
        ),
      },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data });

  return (
    <div>
      <h2>Em construção!</h2>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => (
                  <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
      <button onClick={saveAll}>Salvar Todos</button>
    </div>
  );
};

export default Estatistica;
