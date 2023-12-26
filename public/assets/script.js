const main_element = document.getElementById('main');
function handleExpandedView(e) {
    console.log(e.target);
};

function renderTable(element_data) {
    for (let i = 0; i < element_data.length; i++) {
        if (i === 118) return;

        // HANDLES GENERATION OF CARDS FOR EACH ELEMENT
        const current_element = element_data[i];

        const card_main = document.createElement('div');
        const card_header = document.createElement('div');
        const card_body = document.createElement('div');

        card_main.classList.add('element_main');
        card_header.classList.add('element_header');
        card_body.classList.add('element_body');

        const element_number = document.createElement('p');
        const element_mass = document.createElement('p');
        const element_symbol = document.createElement('h1');
        const element_name = document.createElement('h2');

        element_number.innerText = `${current_element.number}`
        element_mass.innerText = `${current_element.atomic_mass}`;
        element_symbol.innerText = current_element.symbol;
        element_name.innerText = current_element.name;

        card_header.appendChild(element_number);
        card_header.appendChild(element_mass);

        card_body.appendChild(element_symbol);
        card_body.appendChild(element_name);

        card_main.appendChild(card_header);
        card_main.appendChild(card_body);
        card_main.addEventListener('click', handleExpandedView)

        // HANDLES PLACEMENT OF ELEMENTS ON PERIODIC TABLE
        if (
            i < 57
            || (i > 70 && i < 89)
            || i > 102
        ) {
            card_main.classList.add(
                `row-${current_element.period}`, 
                `col-${current_element.group}`
            );
        };

        if (i >= 57 && i <= 70) {
            card_main.classList.add(
                `row-${8}`,
                `col-${i - 52}`
            );
            card_main.style.marginTop='2em';
        };

        if (i >= 89 && i <= 102) {
            card_main.classList.add(
                `row-${9}`,
                `col-${i - 84}`
            );
        };

        main_element.appendChild(card_main);

        // HANDLES COLOR CODING OF PERIODIC TABLE ELEMENTS
        if (
            current_element.category === 'alkali metal'
        ) card_main.classList.add('alkali');
        if (
            current_element.category === 'alkaline earth metal'
        ) card_main.classList.add('alkaline-earth');
        if (
            current_element.category.includes('transition metal')
        ) card_main.classList.add('trans-metal');
        if (
            current_element.category === 'post-transition metal'
        ) card_main.classList.add('pt-metal');
        if (
            current_element.category === 'metalloid'
        ) card_main.classList.add('metalloid');
        if (
            current_element.category === 'diatomic nonmetal' 
            || current_element.category === 'polyatomic nonmetal'
        ) card_main.classList.add('da-nonmetal');
        if (
            current_element.category === 'noble gas'
        ) card_main.classList.add('noble-gas');
        if (
            current_element.category === 'lanthanide'
        ) card_main.classList.add('lanthanide');
        if (
            current_element.category === 'actinide'
        ) card_main.classList.add('actinide');
    };
};

async function fetchElementData() {
    const response = await fetch('/elements');
    console.log(response.json())
    const element_data = await response.json();
    return element_data.elements;
};

fetchElementData().then((data) => renderTable(data));