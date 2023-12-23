const doc_main = document.getElementById('main');
const doc_group_1 = document.getElementById('group_1');

function renderElements(element_data) {
    for (let i = 0; i < element_data.length; i++) {
        const card_main = document.createElement('div');
        const card_header = document.createElement('div');
        const card_body = document.createElement('div');

        card_main.classList.add('element');
        card_header.classList.add('element_header');
        card_body.classList.add('element_body');

        const element_number = document.createElement('p');
        const element_mass = document.createElement('p');
        const element_symbol = document.createElement('h1');
        const element_name = document.createElement('h2');

        element_number.innerText = `${element_data[i].number}`
        element_mass.innerText = element_data[i].atomic_mass;
        element_symbol.innerText = element_data[i].symbol;
        element_name.innerText = element_data[i].name;

        card_header.appendChild(element_number);
        card_header.appendChild(element_mass);

        card_body.appendChild(element_symbol);
        card_body.appendChild(element_name);

        card_main.appendChild(card_header);
        card_main.appendChild(card_body);
        doc_group_1.appendChild(card_main);
    };
};

async function handleFetch() {
    const response = await fetch('/elements');
    const element_data = await response.json();
    return element_data;
};

handleFetch().then((data) => renderElements(data));