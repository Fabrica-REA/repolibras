import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useTable } from 'react-table';

const Palavra = () => {
  const [data, setData] = useState([]);

  // Carregar dados
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get('http://localhost:5001/palavra');
      setData(result.data);
    };
    fetchData();
  }, []);

  // Atualizar linha
  const updateRow = useCallback(async (row) => { // Wrap function in useCallback
    await axios.put(`http://localhost:5001/palavra/${row.Id}`, row);
  }, []);
  
  // Excluir linha
  const deleteRow = useCallback(async (row) => { // Wrap function in useCallback
    await axios.delete(`http://localhost:5001/palavra/${row.Id}`);
    setData(data.filter((item) => item.Id !== row.Id));
  }, [data]);

  const columns = React.useMemo(
    () => [
      {
        Header: 'Id',
        accessor: 'Id',
      },
      {
        Header: 'Descrição',
        accessor: 'Descricao',
      },
      {
        Header: 'Atualizar',
        Cell: ({ row }) => (
          <button onClick={() => updateRow(row.original)}>Atualizar</button>
        ),
      },
      {
        Header: 'Excluir',
        Cell: ({ row }) => (
          <button onClick={() => deleteRow(row.original)}>Excluir</button>
        ),
      },
    ],
    [deleteRow, updateRow] // Include deleteRow and updateRow in the dependency array
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
    </div>
  );
};

export default Palavra;
