import '../App.css';
import './Enviar.css';
import React, { useCallback, useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { Route, Routes } from 'react-router-dom';
import Contexto from '../componentes/Contexto';
import "./Componente.css"
import DataTable from "react-data-table-component";
import { format } from 'date-fns';
import { FileUploader } from 'react-drag-drop-files';
import cyiapi from '../cyiapi';
const fileTypes = ["mkv", "mp4", "avi"];

function Solicitacoes() {
  const [contexto, setContexto] = useState('');
  const [filtro, setFiltro] = useState('');
  const [file, setFile] = useState(null);
  const [observacoes, setObservacoes] = useState('');
  const handleContextoChange = (e) => {
    setContexto(e.target.value);
  };

  const [data, setData] = useState([]);
  const [records, setRecords]= useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  function handleFilter(event) {
    setFiltro(event.target.value);
    const newData = data.filter(row => {
      return (row.DesContexto.toLowerCase().includes(event.target.value.toLowerCase())
      || row.DesPalavra.toLowerCase().includes(event.target.value.toLowerCase())
      || row.DataPedido.toLowerCase().includes(event.target.value.toLowerCase()));
    })
    setRecords(newData);
  }
  const handleRowSelected = (state) => {
    setSelectedRows([]);
    setSelectedRows(state.selectedRows);
  };

  const handlePrintSelectedRows = () => {
    selectedRows.forEach((row) => {
      console.log(row.name);
    });
  };

  const columns = [
    {
      name: "ContextoId",
      selector: row => row.ContextoId,
      sortable: true,
      maxWidth: "20px",
    },
    {
      name: 'Contexto',
      selector: row => row.DesContexto,
      sortable: true,
      cell: row => <a href={`/tab/Contexto.js?id=${row.ContextoId}`}>{row.DesContexto}</a>,
      maxWidth: "150px",
    },
    {
      name: "PalavraId",
      selector: row => row.PalavraId,
      width: 40,
      sortable: true,
      maxWidth: "20px",
    },
    {
      name: 'Palavra',
      selector: row => row.DesPalavra,
      sortable: true,
      cell: row => <a href={`/tab/Palavra.js?id=${row.PalavraId}`}>{row.DesPalavra}</a>,
      maxWidth: "200px",
    },
    {
      name: "Pedido",
      selector: row => { 
        let dateValue = new Date(row.DataPedido); 
        return isNaN(dateValue) ? "" : format(dateValue, 'dd/MM/yyyy HH:mm'); },
      sortable: true,
      maxWidth: "180px",
    },
    {
      name: "Vídeo",
      cell: (row) => (
        <div>
          <FileUploader handleChange={handleFileChange} name="file" types={fileTypes} />
          <button onClick={() => handleSubmit(row)}>Enviar</button>
        </div>
      ),
    },
  ];
  useEffect(() => {
    cyiapi.get("/solicitacoes").then((response) => {
      const novadata = response.data.map(row => {
        const newRow = {};
        newRow.ContextoId = row['ContextoId'];
        newRow.DesContexto = row['DesContexto'];
        newRow.PalavraId = row['PalavraId'];
        newRow.DesPalavra = row['DesPalavra'];
        newRow.DataPedido = row['DataPedido'];
          return newRow;
      });
      console.log('executado API');
      setData(novadata);
      setRecords(novadata);
    });
  }, []);
  
  const handleFileChange = (file) => {
    if (file) {
      setFile(file);
    }
  };

  const handleSubmit = async (row) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('usuarioid', 1); // *************
    formData.append('contexto', row.DesContexto);
    formData.append('contextoid', row.ContextoId);
    formData.append('novoNomeArquivo', row.DesPalavra);
    console.log(row.ContextoId);
    console.log(row.DesContexto);
    console.log(row.PalavraId);
    console.log(row.DesPalavra);
    try {
      const response = await cyiapi.post('/upload', formData);
      console.log(response.data);
      setObservacoes(`Vídeo: ${file.name} para: ${row.DesPalavra} foi enviado com sucesso!`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container">
      <div className="colunica">
        <h2>Solicitações</h2>
        <div style={{float: 'right'}}>   <label htmlFor="observacoes">{observacoes}</label>
          <input type="text" value={filtro} onChange={(e) => handleFilter(e)} placeholder="Digite a Palavra" /></div>
          <DataTable    columns={columns}   data={records}  onSelectedRowsChange={handleRowSelected}
               fixedHeader   pagination  />
      </div>
    </div>
  );
}

export default Solicitacoes;
