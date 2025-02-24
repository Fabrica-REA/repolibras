import React, { useState } from 'react';
import ComboBoxContexto from './ComboBoxContexto';
import './Componente.css'
import axios from "axios";
import DataTable from "react-data-table-component";
import { format } from 'date-fns';

function Home() {
  const [descricaoPar, setDescricaoPar] = useState('');
  const [result, setResult] = useState('');
  const [showInsertButton, setShowInsertButton] = useState(false);
  const [obsText, setObsText] = useState('');
  const [contextoid, setContextoid] = useState('');
  const [data, setData] = useState([]);
  const [records, setRecords]= useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  function handleFilter(event) {
    const newData = data.filter(row => {
      return (row.DesPalavra.toLowerCase().includes(event.target.value.toLowerCase())
        || row.DesSituacao.toLowerCase().includes(event.target.value.toLowerCase()));
    })
    setRecords(newData);
  }
  const handleRowSelected = (state) => {
    setSelectedRows([]);
    setSelectedRows(state.selectedRows);
  };


  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch(`http://localhost:5001/palavras?contexto=${contextoid}&descricao=${descricaoPar}`);
    const data = await response.json();
    setResult(data);
    console.log('consulta' + contextoid);
    setShowInsertButton(data.length === 0);
  };
  const handlePesquisa = (descricaoPar) => {
    setDescricaoPar( descricaoPar);
    console.log(`http://localhost:5001/palavras?descricao=${descricaoPar}`);
    axios.get(`http://localhost:5001/palavras?descricao=${descricaoPar}`).then((response) => {
      const novadata = response.data.map(row => {
        const newRow = {};
        newRow.PalavraId = row['PalavraId'];
        newRow.DesPalavra = row['DesPalavra'];
        newRow.ContextoId = row['ContextoId'];
        newRow.DesContexto = row['DesContexto'];
        newRow.SituacaoId = row['SituacaoId'];
        newRow.DesSituacao = row['DesSituacao'];
        newRow.DataHora = row['DataHora'];
        return newRow;
      });
      console.log('executado API');
      console.log(novadata);
      setData(novadata);
      setRecords(novadata);
    });

  };
  
  const handleInsertClick = async () => {
    const response = await fetch(`http://localhost:5001/palavrai?descricao=${descricaoPar}`);
    const data = await response.json();
    console.log('insert');
    setShowInsertButton(false);
    //setResult(data);
    //setObsText(data);
  };
  const handleNaoClick = async () => {
    setShowInsertButton(false);
  }
  const [inputText, setInputText] = useState('');
  const wordList = ['Palavra1', 'Palavra2', 'Palavra3'];
  const handleInputChange = (event) => {
    setInputText(event.target.value);
    // Atualize a lista de palavras com base no texto de entrada aqui
  };

  const highlightWords = (text) => {
    return wordList.reduce((prev, curr) => {
      return prev.replace(new RegExp(`(${curr})`, 'gi'), '<strong>$1</strong>');
    }, text);
  };

  const columns = [
    {
      name: "id",
      selector: row => row.PalavraId,
      maxWidth: "50px",
      sortable: true,
    },
    {
      name: "Palavra",
      selector: row => row.DesPalavra,
      sortable: true,
      cell: row => <a href={`/tab/Palavra.js?id=${row.Id}`}>{row.DesPalavra}</a>, // link para algo como: http://localhost:3000/48 
      maxWidth: "150px",
    },
    {
      name: "ContextoId",
      selector: row => row.ContextoId,
      sortable: true,
      maxWidth: "50px",
    },
    {
      name: "DesContexto",
      selector: row => row.DesContexto,
      sortable: true,
      maxWidth: "150px",
    },
    {
      name: "SituacaoId",
      selector: row => row.SituacaoId,
      sortable: true,
      maxWidth: "50px",
    },
    {
      name: "DesSituacao",
      selector: row => row.DesSituacao,
      sortable: true,
      maxWidth: "150px",
    },
    {
      name: "Pedido",
      selector: row => format(new Date(row.DataHora), 'dd/MM/yyyy HH:mm'),
      sortable: true,
      maxWidth: "180px",
    },
  ];

  return (
    <div className="container">
      <div className="colesquerda">
    <form onSubmit={() => handleSubmit}>
    <ComboBoxContexto onChange={(event) => setContextoid(event.target.value)} /><br />
      <label>
        Digite a palavra:
        <input
          type="text"
          value={descricaoPar}
          onChange={(event) => {setDescricaoPar(event.target.value);}}
        />
      </label>
      <button type="submit">Pesquisar</button>
      <br />
      <label>{obsText}</label><br />
      {result.length === 0 && showInsertButton && (
        <>
          <p>Palarva não encontrada. Quer fazer o pedido para criação do sinal?</p>
          <button type="button" onClick={handleInsertClick}>Sim</button>
          <button type="button" onClick={handleNaoClick}>Não</button>
        </>
      )}
      {result.length > 0 && (
        <div>
        <table>
          <thead>
            <tr>
            <th></th>
              <th>Contexto</th>
              <th>ID</th>
              <th>Palavra</th>
              <th></th>
              <th>Situação</th>
            </tr>
          </thead>
          <tbody>
            {result.map((item) => (
              <tr key={item[0]}>
              <td>{item[2]}</td>
              <td>{item[3]}</td>
              <td>{item[0]}</td>
              <td>{item[1]}</td>
              <td>{item[4]}</td>
              <td>{item[5]}</td>
              </tr>
            ))}
          </tbody>
        </table>
          <div style={{float: 'right'}}><input type="text" onChange = {handleFilter} /></div>
          <DataTable   title="Exemplo de tabela"   columns={columns}   data={records}  onSelectedRowsChange={handleRowSelected}
              selectableRows   fixedHeader   pagination  />
        </div>

      )}
      </form>
      </div>
      <div className="coldireita">
        <h2>Últimos sinais</h2>
      </div>
    </div>
  );
}

export default Home;
