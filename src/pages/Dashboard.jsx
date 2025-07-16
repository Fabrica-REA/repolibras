import { useEffect, useState } from 'react';
import '../assets/css/dashboard.css';
import imgPerfil from "../assets/images/profile_icon.svg";
import { useUsuario } from '../context/usuarioContext';
import { getNovosVideosRecentes, getPorcentagemSinaisVerificados, getGraficoContribuicoesMensais, getCountUsuarios, getTotalVideos, getPalavrasMaisBuscadas } from '../api/dashboard';
import { Loading } from '../utils/Utilidades';
import { Line, Bar } from 'react-chartjs-2';
import { chartOptions, getChartData, barChartOptions } from '../utils/chart';

const Dashboard = () => {
    const { token, usuario } = useUsuario();
    const [loading, setLoading] = useState(true);
    const [totalVideos, setTotalVideos] = useState(null);
    const [totalUsuarios, setTotalUsuarios] = useState(null);
    const [novosVideos, setNovosVideos] = useState(null);
    const [porcentagemVerificados, setPorcentagemVerificados] = useState(null);
    const [contribuicoesMensais, setContribuicoesMensais] = useState([]);
    const [palavrasMaisBuscadas, setPalavrasMaisBuscadas] = useState([]);

    console.log(palavrasMaisBuscadas);
    

    // Static test data for palavras mais buscadas
    function getStaticPalavrasMaisBuscadas() {
        return [
            { DesPalavra: "Inclusão", total: 38 },
            { DesPalavra: "Educação", total: 28 },
            { DesPalavra: "Acessibilidade", total: 25 },
            { DesPalavra: "Comunicação", total: 20 },
            { DesPalavra: "Libras", total: 18 },
            { DesPalavra: "Cultura", total: 15 },
            { DesPalavra: "Diversidade", total: 12 },
            { DesPalavra: "Sinal", total: 10 },
            { DesPalavra: "Aprender", total: 8 },
            { DesPalavra: "Professor", total: 7 },
        ];
    }

    useEffect(() => {
        setLoading(true);
        Promise.all([
            getCountUsuarios(token),
            getTotalVideos(token),
            getNovosVideosRecentes(token),
            getPorcentagemSinaisVerificados(token),
            getGraficoContribuicoesMensais(token),
        ])
            .then(([usuarios, totalVideos, novos, verificados, contriMes]) => {
                setTotalUsuarios(usuarios?.total ?? 0);
                setTotalVideos(totalVideos?.total ?? 0); 
                setNovosVideos(novos?.total ?? 0);
                setPorcentagemVerificados(verificados?.porcentagem ?? 0);
                setContribuicoesMensais(contriMes ?? []);
            })
            .finally(() => setLoading(false));
    }, [token]);

    useEffect(() => {
        // setPalavrasMaisBuscadas(getStaticPalavrasMaisBuscadas());
        getPalavrasMaisBuscadas().then((data) => setPalavrasMaisBuscadas(data));
    }, [token]);

    const barChartData = getChartData(
        palavrasMaisBuscadas,
        {
            labelKey: "DesPalavra",
            valueKey: "buscas",
            label: "Buscas",
            color: "#3498db",
            type: "bar",
        }
    );

    return (
        <div className="dashboard">
            {loading ? (
                <Loading open={loading} />
            ) : (
                <>
                    <div className="dashboard-header">
                        <h1>Dashboard do Repositório</h1>
                        <div className="dashboard-user-profile">
                            <span>{usuario.nome}</span>
                            <img src={imgPerfil} alt="Foto de perfil do administrador do sistema" />
                        </div>
                    </div>

                    <div className="dashboard-cards">
                        <div className="dashboard-card">
                            <div className="dashboard-card-header">
                                <div>
                                    <div className="dashboard-card-value">{totalVideos}</div>
                                    <div className="dashboard-card-label">Vídeos no repositório</div>
                                </div>
                                <div className="dashboard-card-icon" style={{ backgroundColor: "var(--secondary)" }}>
                                    <i className="pi pi-video"></i>
                                </div>
                            </div>
                        </div>
                        <div className="dashboard-card">
                            <div className="dashboard-card-header">
                                <div>
                                    <div className="dashboard-card-value">{totalUsuarios}</div>
                                    <div className="dashboard-card-label">Usuarios cadastrados</div>
                                </div>
                                <div className="dashboard-card-icon" style={{ backgroundColor: "var(--success)" }}>
                                    <i className="pi pi-users"></i>
                                </div>
                            </div>
                        </div>
                        <div className="dashboard-card">
                            <div className="dashboard-card-header">
                                <div>
                                    <div className="dashboard-card-value">{novosVideos}</div>
                                    <div className="dashboard-card-label">Novos vídeos (Mensais)</div>
                                </div>
                                <div className="dashboard-card-icon" style={{ backgroundColor: "var(--warning)" }}>
                                    <i className="pi pi-upload"></i>
                                </div>
                            </div>
                        </div>
                        <div className="dashboard-card">
                            <div className="dashboard-card-header">
                                <div>
                                    <div className="dashboard-card-value">{porcentagemVerificados}%</div>
                                    <div className="dashboard-card-label">Sinais verificados</div>
                                </div>
                                <div className="dashboard-card-icon" style={{ backgroundColor: "var(--accent)" }}>
                                    <i className="pi pi-check-circle"></i>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="dashboard-grid">
                        <div className="dashboard-chart-container">
                            <div className="dashboard-chart-title">Atividade de Contribuições</div>
                            <div className="dashboard-chart">
                                <Line
                                    data={getChartData(contribuicoesMensais)}
                                    options={chartOptions}
                                    style={{ width: "fit-content", height: "fit-content" }}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="dashboard-grid">
                        <div className="dashboard-chart-container">
                            <div className="dashboard-chart-title">Sinais Mais Buscados</div>
                            <div className="dashboard-chart" style={{ height: 300 }}>
                                <Bar
                                    data={barChartData}
                                    options={barChartOptions}
                                    style={{ width: "100%", height: "100%" }}
                                />
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}

export default Dashboard;