import React, { useState, useContext } from 'react';
import ComboBoxContexto from './ComboBoxContexto';
import './Componente.css'
import axios from "axios";
import DataTable from "react-data-table-component";
import { format } from 'date-fns';
import ReactPlayer from 'react-player';
import { UserContext } from '../UserContext';
import cyiapi from '../cyiapi';
import {basecyi} from '../cyiapi';

function Home() {
  const [token, setToken, gusuarioId, setGusuarioId, gcontextoId, setGcontextoId, gtipousuarioId, setGtipousuarioId] = useContext(UserContext);
  const [descricaoPar, setDescricaoPar] = useState('');
  const [result, setResult] = useState('');
  const [showInsertButton, setShowInsertButton] = useState(false);
  const [obsText, setObsText] = useState('');
  const [contextoid, setContextoid] = useState('');
  const [observacao, setObservacao] = useState('');
  const [data, setData] = useState([]);
  const [records, setRecords]= useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [email, setEmail] = useState([]);
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
    setObsText(null); 
    setShowInsertButton(false);
    /*event.preventDefault();
    const response = await fetch(`http://localhost:5001/palavras?contexto=${contextoid}&descricao=${descricaoPar}`);
    const data = await response.json();
    setResult(data);
    console.log('consulta' + contextoid);
    setShowInsertButton(data.length === 0);*/
    console.log(`/palavras?descricao=${descricaoPar}`);
    cyiapi.get( `/palavras?descricao=${descricaoPar}`).then((response) => {
      console.log(response);
      const novadata = response.data.map(row => {
        const newRow = {};
        newRow.PalavraId = row['PalavraId'];
        newRow.DesPalavra = row['DesPalavra'];
        newRow.PalavraId = row[Object.keys(row)[0]];
        newRow.Despalavra = row[Object.keys(row)[1]];
        newRow.ContextoId = row['ContextoId'];
        newRow.DesContexto = row['DesContexto'];
        newRow.SituacaoId = row['SituacaoId'];
        newRow.DesSituacao = row['DesSituacao'];
        newRow.DataHora = row['DataHora'];
        newRow.Pasta = row['Pasta'];
        newRow.NomeArquivo = row['NomeArquivo'];
        console.log('row: ', row, row['DataHora']);
        console.log(newRow);
        return newRow;
      });
      setShowInsertButton(novadata.length === 0)
      console.log('executado API');
      console.log(novadata);
      setData(novadata);
      setRecords(novadata);
      //setResult(novadata);
    });

  };
  
  const handleInsertClick = async () => {
    console.log('insert pal', `${contextoid}&descricao=${descricaoPar}&usuario=${gusuarioId}`);
    const response = await cyiapi.get(`/palavrai?contexto=${gcontextoId}&descricao=${descricaoPar}&usuario=${gusuarioId}&email=${email}`);
    //const data = await response.json();
    console.log('resposta insert', response.data);
    setShowInsertButton(false);
    setObservacao( `${response.data[0].mensagem} PalavraId: ${response.data[0].id}`)
    //setResult(data);
    //setObsText(data.message);
  };
  const handleNaoClick = async () => {
    setShowInsertButton(false);
  }
  const columns = [
    {
      name: "id",
      selector: row => row.PalavraId,
      maxWidth: "10px",
      sortable: true,
    },
    {
      name: "Palavra",
      selector: row => row.DesPalavra,
      sortable: true,
      cell: row => <a href={`/tab/Palavra.js?id=${row.PalavraId}`}>{row.DesPalavra}</a>, // link para algo como: http://localhost:3000/48 
      maxWidth: "150px",
      wrap: true,
    },
    {
      name: "Video",
      selector: row => row.DesPalavra,
      sortable: true,
      cell: row => { if ((row.SituacaoId >= 5) && (row.SituacaoId !== 10)) {return ( 
          <div>        <ReactPlayer className="video-player" width="200px" height="150" url={ `${basecyi}/download/${row.Pasta}/${row.NomeArquivo}`} controls={true} /></div>); }
        else {return null;} },
      maxWidth: "150px",
      wrap: true,
    },
    {
      name: "ContextoId",
      selector: row => row.ContextoId,
      sortable: true,
      maxWidth: "10px",
    },
    {
      name: "DesContexto",
      selector: row => row.DesContexto,
      sortable: true,
      wrap: true,
      maxWidth: "100px",
    },
    {
      name: "SituacaoId",
      selector: row => row.SituacaoId,
      sortable: true,
      maxWidth: "10px",
    },
    {
      name: "DesSituacao",
      selector: row => row.DesSituacao,
      cell: row => {if ((row.SituacaoId === 5) || (row.SituacaoId === 10)) return (<b>{row.DesSituacao}</b>);
        else {return (row.DesSituacao);} },
      sortable: true,
      maxWidth: "100px",
      wrap: true,
    },
    {
      name: "Pedido",
      selector: row => format(new Date(row.DataHora), 'dd/MM/yyyy HH:mm'),
      sortable: true,
      wrap: true,
      maxWidth: "100px",
    },
    {
      name: "Pasta",
      selector: row => row.Pasta,
      sortable: true,
      wrap: true,
      maxWidth: "50px",
    },
    {
      name: "NomeArquivo",
      selector: row => row.NomeArquivo,
      sortable: true,
      wrap: true,
      maxWidth: "100px",
    },
  ];

  return (
    <div className="container">
      <div className="colunica">
    <form onSubmit={(e) => handleSubmit(e)}>
      <label>
        Digite a palavra:
        <input
          type="text"
          value={descricaoPar}
          onChange={(event) => {setDescricaoPar(event.target.value); setObsText(null); setShowInsertButton(false);}}
        />
      </label>
      <button type="submit">Pesquisar</button>
      <br />
      <label>{obsText}</label><br />
      {data.length === 0 && showInsertButton && (
        <>
          <p>Palarva não encontrada. Se desejar, informe seu e-mail para receber mensagem de quando o sinal estiver aprovado!</p>
          <input
          type="text"
          value={email}
          onChange={(event) => {setEmail(event.target.value); }}        />
          <button type="button" onClick={handleInsertClick}>Por favor, desejo ser avisado!</button>
          <button type="button" onClick={handleNaoClick}>Não, obrigado!</button>
        </>
      )}
      {data.length > 0 && (
        <div>
          <DataTable   title="Exemplo de tabela"   columns={columns}   data={records}  onSelectedRowsChange={handleRowSelected}
              selectableRows   fixedHeader   pagination  />
        </div>

      )}
      </form>
      <br /><br /><br />
      <p>{observacao}</p>
      </div>
    </div>
  );
}

export default Home;
