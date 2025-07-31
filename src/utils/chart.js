import { Chart as ChartJS, LineElement, PointElement, LinearScale, CategoryScale, Tooltip, Legend, BarElement } from 'chart.js';

ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Tooltip, Legend, BarElement);

export const chartOptions = {
    responsive: true,
    maintainAspectRatio: true, 
    plugins: {
        legend: { display: false },
        tooltip: { enabled: true },
    },
    scales: {
        x: {
            title: { display: true, text: 'Mês' },
            grid: { display: true },
        },
        y: {
            title: { display: true, text: 'Total' },
            beginAtZero: true,
            grid: { color: '#eee' },
        },
    },
};

/**
 * Gera um objeto de dados para Chart.js de forma flexível (linha/barra).
 * @param {Array} data - Array de objetos de dados.
 * @param {Object} config - Configuração para labels e datasets.
 *   {
 *     labelKey: string (campo para labels do eixo X),
 *     valueKey: string (campo para valores do eixo Y),
 *     label: string (nome da série),
 *     color: string (cor da linha/barra),
 *     fill: boolean,
 *     type: string ('line' | 'bar'),
 *     ...outros campos Chart.js dataset
 *   }
 * @returns {Object} Objeto de dados para Chart.js
 */
export function getChartData(
    data,
    {
        labelKey = "mes",
        valueKey = "total",
        label = "Contribuições",
        color = "#3498db",
        fill = false,
        type = "line",
        ...datasetProps
    } = {}
) {
    return {
        labels: data.map(item => item[labelKey]),
        datasets: [
            {
                label,
                data: data.map(item => item[valueKey]),
                fill,
                borderColor: color,
                backgroundColor: color,
                tension: 0.3,
                pointRadius: 5,
                pointHoverRadius: 7,
                type,
                ...datasetProps,
            },
        ],
    };
}

/**
 * Opções padrão para gráfico de barras.
 */
export const barChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: { display: false },
        tooltip: { enabled: true },
    },
    scales: {
        x: {
            title: { display: true, text: 'Palavra' },
            grid: { display: false },
        },
        y: {
            title: { display: true, text: 'Buscas' },
            beginAtZero: true,
            grid: { color: '#eee' },
            ticks: {
                stepSize: 1, 
                callback: function(value) {
                    return Number.isInteger(value) ? value : null;
                },
            },
        },
    },
};
