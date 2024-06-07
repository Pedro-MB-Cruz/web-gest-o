fetch("/static/json/blocA.json")
  .then((response) => response.json())
  .then((json) => {
    const table = document.getElementById("table-bloca");
    json.forEach((element) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `<td>${element.id}</td>
            <td>${element.name}</td>
            <td>${element.ip}</td>
            <td>${element.mask}</td>
            <td>${element.network}</td>`;
      table.appendChild(tr);
    });
  });

fetch("/static/json/blocB.json")
  .then((response) => response.json())
  .then((json) => {
    const table = document.getElementById("table-blocb");
    json.forEach((element) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `<td>${element.id}</td>
            <td>${element.name}</td>
            <td>${element.ip}</td>
            <td>${element.mask}</td>
            <td>${element.network}</td>`;
      table.appendChild(tr);
    });
  });

fetch("/static/json/blocC.json")
  .then((response) => response.json())
  .then((json) => {
    const table = document.getElementById("table-blocc");
    json.forEach((element) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `<td>${element.id}</td>
            <td>${element.name}</td>
            <td>${element.ip}</td>
            <td>${element.mask}</td>
            <td>${element.network}</td>`;
      table.appendChild(tr);
    });
  });

fetch("/static/json/entrance.json")
  .then((response) => response.json())
  .then((json) => {
    const table = document.getElementById("table-entrance");
    json.forEach((element) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `<td>${element.id}</td>
            <td>${element.name}</td>
            <td>${element.ip}</td>
            <td>${element.mask}</td>
            <td>${element.network}</td>`;
      table.appendChild(tr);
    });
  });

const novaRede0 = async () => {
  var dados = {
    id: document.getElementById("mId").value,
    Marca: document.getElementById("mNetwork").value,
    Detalhes: document.getElementById("mSubnetwork").value,
    Foto: document.getElementById("mDevice").value,
  };
  fetch('/static/json/entrance.json/create', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(dados)
  })
    .then(response => {
      // Verifica se a resposta foi bem sucedida
      if (!response.ok) {
        throw new Error('Erro ao obter os dados');
      }
      // Converte a resposta para JSON
      return response.json();
    })
    .then(data => {
      resposta = "A rede: " + dados.Marca + " foi adicionada com sucesso!"
      alert(resposta)
      listarCarros();

    })
    .catch(error => {
      // Captura qualquer erro de rede ou tratamento de erro
      console.error('Houve um erro:', error);
    });
}

const novaRede1 = async () => {
  var dados = {
    id: document.getElementById("mId").value,
    Marca: document.getElementById("mNetwork").value,
    Detalhes: document.getElementById("mSubnetwork").value,
    Foto: document.getElementById("mDevice").value,
  };
  fetch('/static/json/blocA.json/create', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(dados)
  })
    .then(response => {
      // Verifica se a resposta foi bem sucedida
      if (!response.ok) {
        throw new Error('Erro ao obter os dados');
      }
      // Converte a resposta para JSON
      return response.json();
    })
    .then(data => {
      resposta = "A rede: " + dados.Marca + " foi adicionada com sucesso!"
      alert(resposta)
      listarCarros();

    })
    .catch(error => {
      // Captura qualquer erro de rede ou tratamento de erro
      console.error('Houve um erro:', error);
    });
}

const novaRede2 = async () => {
  var dados = {
    id: document.getElementById("mId").value,
    Marca: document.getElementById("mNetwork").value,
    Detalhes: document.getElementById("mSubnetwork").value,
    Foto: document.getElementById("mDevice").value,
  };
  fetch('/static/json/blocB.json/create', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(dados)
  })
    .then(response => {
      // Verifica se a resposta foi bem sucedida
      if (!response.ok) {
        throw new Error('Erro ao obter os dados');
      }
      // Converte a resposta para JSON
      return response.json();
    })
    .then(data => {
      resposta = "A rede: " + dados.Marca + " foi adicionada com sucesso!"
      alert(resposta)
      listarCarros();

    })
    .catch(error => {
      // Captura qualquer erro de rede ou tratamento de erro
      console.error('Houve um erro:', error);
    });
}

const novaRede3 = async () => {
  var dados = {
    id: document.getElementById("mId").value,
    Marca: document.getElementById("mNetwork").value,
    Detalhes: document.getElementById("mSubnetwork").value,
    Foto: document.getElementById("mDevice").value,
  };
  fetch('/static/json/blocC.json/create', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(dados)
  })
    .then(response => {
      // Verifica se a resposta foi bem sucedida
      if (!response.ok) {
        throw new Error('Erro ao obter os dados');
      }
      // Converte a resposta para JSON
      return response.json();
    })
    .then(data => {
      resposta = "A rede: " + dados.Marca + " foi adicionada com sucesso!"
      alert(resposta)
      listarCarros();

    })
    .catch(error => {
      // Captura qualquer erro de rede ou tratamento de erro
      console.error('Houve um erro:', error);
    });
}





