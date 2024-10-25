const url = 'http://iot.paparella.com.br/';
const labels = [];
const dataValues = [];
let lastValue = null;

const ctx = document.getElementById('myChart').getContext('2d');
const myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: labels,
        datasets: [{
            label: 'Valores do Sensor',
            data: dataValues,
            borderColor: 'rgba(75, 192, 192, 1)',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});

function updateData() {
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro na requisição: ' + response.status);
            }
            return response.json();
        })
        .then(data => {
            data.forEach(item => {
                if(item.nome_aluno == "adrian") {
                    const valor = item.valor_sensor;

                    if (valor !== lastValue) {
                        lastValue = valor;

                        labels.push(new Date().toLocaleTimeString());
                        dataValues.push(valor);

                        if (labels.length > 10) {
                            labels.shift();
                            dataValues.shift();
                        }
                        myChart.update();
                    }
                }
            });
        })
        .catch(error => {
            console.error('Erro:', error);
        });
}

setInterval(updateData, 2000);
