import React, { useState } from 'react';
import CursoAuto from '../componentes/CursoAuto';
import cyiapi from '../cyiapi';

function Colabore() {
    const [nome, setNome] = useState('');
    const [matricula, setMatricula] = useState('');
	const [descricaocursosel, setDescricaocursosel] = useState('');
	const [cursoidsel, setCursoidsel] = useState('');
    const [cursoid, setCursoid] = useState('');
    const [telefone, setTelefone] = useState('');
    const [email, setEmail] = useState('');
    const [cargaHoraria, setCargaHoraria] = useState('12');
    const [observacao, setObservacao] = useState('');

    const enviar = async () => { // Função enviar como async
        const data = {
            nome,
            matricula,
            curso: cursoidsel,
            telefone,
            email,
            cargaHoraria,
            observacao,
        };

        try {
            const response = await cyiapi.post('/inserevoluntario', data);
          
            //const response = await axios.post(`${cyiapi.defaults.baseURL}/inserevoluntario`, data); // Use axios.post e baseURL
            console.log(response.data);

            if (response.status === 201) { // Verifique o código de status 201
                alert(response.data.message); // Exiba a mensagem de sucesso
                // Limpe o formulário ou atualize o estado conforme necessário
                setNome('');
                setMatricula('');
                setDescricaocursosel('');
                setCursoidsel('');
                setCursoid('');
                setTelefone('');
                setEmail('');
                setObservacao('');
            } else {
                alert("Ocorreu um erro ao inserir o voluntário."); // Mensagem de erro genérica
            }
        } catch (error) {
            console.error("Erro ao inserir voluntário:", error);
            if (error.response) {
                // Erro de resposta do servidor
                console.error("Dados da resposta:", error.response.data);
                console.error("Status da resposta:", error.response.status);
                alert(error.response.data.error || "Ocorreu um erro ao inserir o voluntário."); // Mensagem de erro do servidor
            } else if (error.request) {
                // Erro de requisição (sem resposta do servidor)
                console.error("Requisição:", error.request);
                alert("Não foi possível conectar ao servidor.");
            } else {
                // Outro erro
                console.error("Mensagem de erro:", error.message);
                alert("Ocorreu um erro ao inserir o voluntário.");
            }
        }
    };
  const enviar2 = () => {
    fetch('http://localhost:5001/inserevoluntario', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            nome,
            matricula,
            curso: cursoidsel,
            telefone,
            email,
            cargaHoraria,
            observacao,
        }),
    })
    .then(response => response.json())
    .then(data => {
        if (data.message) {
            alert(data.message);
        } else if (data.error) {
            console.error(data.error);
        }
    });
};

return (
    <div>
      <h3>Venha participar conosco</h3>
        <p>Seja voluntário para ajudar no projeto e contribuir para a acessibilidade. </p>
        <p>Atividades remotas a serem realizadas: Gravação do sinal, edição de vídeo, divulgação e/ou avaliação dos vídeos.</p>
        <p>Total de horas: 12h ou 20h</p>
        
        <h3>Por favor, faça o seu cadastro que entraremos em contato.</h3>
        <input type="text" value={nome} onChange={e => setNome(e.target.value)} maxLength={255} placeholder="Nome" />
        <input type="number" value={matricula} onChange={e => setMatricula(e.target.value)} placeholder="Matrícula" />
        <select value={cargaHoraria} onChange={e => setCargaHoraria(e.target.value)}>
            <option value="12">12h semanal</option>
            <option value="20">20h semanal</option>
        </select><br />
        <CursoAuto onSelect={(item)=>{if (item) { 
				setDescricaocursosel( item.descricao); setCursoidsel( item.id);}}} 
			onInput={(e, item) => { 
				setDescricaocursosel(item); setCursoidsel( '');}} />
        <br />

        <input type="tel" value={telefone} onChange={e => setTelefone(e.target.value)} placeholder="Telefone" />
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" /><br />
        <textarea value={observacao} onChange={e => setObservacao(e.target.value)} maxLength={500} placeholder="Observação"/>
        <button onClick={enviar}>Enviar</button>
        <br /><br />
        <p>Os alunos serão cadastrados no PVA ou no projeto de extensão ou no projeto de pesquisa.</p>
        <p>Mais informações sobre o PVA: http://www.prograd.ufpr.br/portal/coafe/uaf/pva/</p>
        <br /><br />
    </div>
)

}

export default Colabore;
