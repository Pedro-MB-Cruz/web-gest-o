fetch('./json/blocA.json')
    .then((response) => response.json())
    .then((json) => {
        const table = document.getElementById('table-bloca')
        json.forEach(element => {
            const tr = document.createElement('tr');
            tr.innerHTML = `<td>${element.id}</td>
            <td>${element.name}</td>
            <td>${element.ip}</td>
            <td>${element.mask}</td>
            <td>${element.network}</td>`;
            table.appendChild(tr);
        });
    });

fetch('./json/blocB.json')
    .then((response) => response.json())
    .then((json) => {
        const table = document.getElementById('table-blocb')
        json.forEach(element => {
            const tr = document.createElement('tr');
            tr.innerHTML = `<td>${element.id}</td>
            <td>${element.name}</td>
            <td>${element.ip}</td>
            <td>${element.mask}</td>
            <td>${element.network}</td>`;
            table.appendChild(tr);
        });
    });

fetch('./json/blocC.json')
    .then((response) => response.json())
    .then((json) => {
        const table = document.getElementById('table-blocc')
        json.forEach(element => {
            const tr = document.createElement('tr');
            tr.innerHTML = `<td>${element.id}</td>
            <td>${element.name}</td>
            <td>${element.ip}</td>
            <td>${element.mask}</td>
            <td>${element.network}</td>`;
            table.appendChild(tr);
        });
    });

fetch('./json/entrance.json')
    .then((response) => response.json())
    .then((json) => {
        const table = document.getElementById('table-entrance')
        json.forEach(element => {
            const tr = document.createElement('tr');
            tr.innerHTML = `<td>${element.id}</td>
            <td>${element.name}</td>
            <td>${element.ip}</td>
            <td>${element.mask}</td>
            <td>${element.network}</td>`;
            table.appendChild(tr);
        });
    });