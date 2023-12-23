const doc_main = document.getElementById('main');
const element_card = document.getElementsByClassName('element')
const doc_group_1 = document.getElementById('group_1')

function renderElements(element_data) {
    for (let i = 0; i < element_data.length; i++) {
        const element_card = document.createElement('div');
        const element_symbol = document.createElement('h1');
        const element_name = document.createElement('h2');
        const element_mass = document.createElement('p');
        const element_number = document.createElement('p');

        element_number.innerText = `${element_data[i].number}`
        element_mass.innerText = element_data[i].atomic_mass
        element_symbol.innerText = element_data[i].symbol

        element_card.appendChild(element_number);
        element_card.appendChild(element_mass);
        element_card.appendChild(element_symbol);
        doc_group_1.appendChild(element_card)
    }
}

async function handleFetch() {
    const response = await fetch('/elements');
    const element_data = await response.json();
    return element_data;
}

handleFetch().then((data) => renderElements(data));