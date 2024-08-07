const main_element = document.getElementById('main');
const legend_element = document.getElementById('legend');
const expanded_view_element = document.getElementById('expanded-view')

function toggleExpandedView(){
    if (!legend_element.classList.contains('hide')) {
        legend_element.classList.add('hide');
        expanded_view_element.classList.remove('hide');
        return
    }
    if (!expanded_view_element.classList.contains('hide')) {
        expanded_view_element.classList.add('hide');
        legend_element.classList.remove('hide');
    }
}

// MAIN FUNCTION FOR RENDERING THE PERIODIC TABLE... THIS IS WHERE THE MAGIC HAPPENS BOI!
function renderTable(element_data) {
    for (let i = 0; i < element_data.length; i++) {
        if (i === 118) return;

        // HANDLES GENERATION OF CARDS FOR EACH ELEMENT
        const current_element = element_data[i];

        const card_main = document.createElement('div');
        const card_header = document.createElement('div');
        const card_body = document.createElement('div');

        card_main.classList.add('element-main');
        card_header.classList.add('element-header');
        card_body.classList.add('element-body');

        const element_number = document.createElement('p');
        const element_mass = document.createElement('p');
        const element_symbol = document.createElement('h1');
        const element_name = document.createElement('h2');

        element_number.innerText = `${current_element.number}`
        element_mass.innerText = `${current_element.atomic_mass}`;
        element_symbol.innerText = current_element.symbol;
        element_name.innerText = current_element.name; 

        // STORES ALL ELEMENT DATA WITHIN DATASET OF HTML ELEMENT
        const data_keys = Object.keys(current_element);
        const data_values = Object.values(current_element);

        for (let i = 0; i < data_keys.length; i++) {
            card_main.setAttribute(
                `data-${data_keys[i]}`, `${data_values[i]}`
            );
        };

        card_header.append(element_number);
        card_header.append(element_mass);

        card_body.append(element_symbol);
        card_body.append(element_name);

        card_main.append(card_header);
        card_main.append(card_body);

        // CLICK LISTENER ON EACH ELEMENT TO HANDLE EXPANDED VIEW
        card_main.addEventListener('click', () => {
            if (!legend_element.classList.contains('hide')) toggleExpandedView();

            expanded_view_element.innerHTML = '';

            const summary = document.createElement('p');
            const exit_button = document.createElement('button');

            summary.innerText = current_element.summary;
            exit_button.innerText = 'EXIT'

            exit_button.addEventListener('click', toggleExpandedView);

            expanded_view_element.append(element_name.cloneNode(true));
            expanded_view_element.append(element_mass.cloneNode(true));
            expanded_view_element.append(summary);
            expanded_view_element.append(exit_button);
        })

        // HANDLES PLACEMENT OF CARDS ON PERIODIC TABLE USING GRID CLASSES
        if (
            i < 57
            || (i > 70 && i < 89)
            || i > 102
        ) {
            card_main.classList.add(
                `row-${current_element.pt_period}`,
                `col-${current_element.pt_group}`
            );
        };

        if (i >= 57 && i <= 70) {
            card_main.classList.add(
                `row-${8}`,
                `col-${i - 52}`
            );
            card_main.style.marginTop = '2em';
        };

        if (i >= 89 && i <= 102) {
            card_main.classList.add(
                `row-${9}`,
                `col-${i - 84}`
            );
        };

        main_element.append(card_main);

        // HANDLES CATEGORY SPECIFIC STYLING OF ELEMENT CARDS
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

async function fetchTableData() {
    const response = await fetch('/elements');
    const element_data = await response.json();
    return element_data;
};

window.onload = () => {
    fetchTableData().then((data) => renderTable(data));
};