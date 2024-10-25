const url = 'http://iot.paparella.com.br/';

fetch(url)
  .then(response => {
    if (!response.ok) {
      throw new Error('Erro na requisição: ' + response.status);
    }
    return response.json();
  })
  .then(data => {
    console.log(data);
    const tbody = document.querySelector('#tabela tbody');
    data.forEach(item => {
      if(item.nome_aluno == "adrian"){
        const tr = document.createElement('tr');
        
        let ledColor;
        const valor = item.valor_sensor;

        if (valor >= 0 && valor <= 20) {
          ledColor = 'red';
        } else if (valor <= 40) {
          ledColor = 'orange';
        } else if (valor <= 60) {
          ledColor = 'yellow';
        } else if (valor <= 80) {
          ledColor = 'lightgreen';
        } else if (valor <= 100) {
          ledColor = 'green';
        } else {
          ledColor = 'gray';
        }

        tr.innerHTML = `
          <td>${item.id || 'ID não encontrado'}</td>
          <td>${item.nome_aluno || 'Nome não encontrado'}</td>
          <td>${item.nome_sensor || 'Descrição não encontrada'}</td>
          <td>${valor || 'Valor não encontrado'}</td>
          <td class="boxLed">
            <div class="led" style="background-color: ${ledColor};"></div>
          </td>
        `;
        tbody.appendChild(tr);
      }
    });
  })
  .catch(error => {
    console.error('Erro:', error);
    document.getElementById('tabela').innerHTML = `
      <tr><td colspan="5">Erro ao carregar o conteúdo: ${error}</td></tr>
    `;
  });
