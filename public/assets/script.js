const main_element = document.getElementById('main');

function appendDummyCards(element, quantity) {
    for (let i = 0; i < quantity; i++) {
        const dummy_card = document.createElement('div');
        dummy_card.classList.add('dummy_card');
        element.appendChild(dummy_card);
    };
};

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
        let doc_group_to_append = document.getElementById(`group_${current_element.pt_group}`);
        if(
            current_element.number === 4
            || (current_element.number >= 5 && current_element.number <= 9)
        ) appendDummyCards(doc_group_to_append, 1);

        if(
            current_element.number === 21
            || current_element.number >= 22 && current_element.number <= 30
        ) appendDummyCards(doc_group_to_append, 3);
        
        if(
            current_element.number < 57
            || (current_element.number > 71 && current_element.number < 89)
            || current_element.number > 103
         ) doc_group_to_append.appendChild(card_main); 

        // if(
        //     current_element.number >= 57 && current_element.number <= 71
        //     // || (current_element.number >= 89 && current_element.number <= 103)
        // ){
        //     doc_group_to_append = document.getElementById(`group_${current_element.number - 53}`)
        //     console.log(`${current_element.name}: ${doc_group_to_append.id}`)
        //     doc_group_to_append.appendChild(card_main)
        // }

        // HANDLES COLOR CODING OF PERIODIC TABLE ELEMENTS
        if (current_element.category === 'alkali metal') card_main.classList.add('light_blue');
        if (current_element.category === 'alkaline earth metal') card_main.classList.add('light_red');
        if (current_element.category.includes('transition metal')) card_main.classList.add('light_purple');
        if (current_element.category === 'post-transition metal') card_main.classList.add('lighter_purple');
        if (current_element.category === 'metalloid') card_main.classList.add('light_yellow');
        if (current_element.category === 'diatomic nonmetal' || current_element.category === 'polyatomic nonmetal') {
            card_main.classList.add('light_green');
        }
        if (current_element.category === 'noble gas') card_main.classList.add('darker_blue');
        if (current_element.category === 'lanthanide') card_main.classList.add('lighter_green');
        if (current_element.category === 'actinide') card_main.classList.add('light_orange');
    };
};

async function fetchElementData() {
    const response = await fetch('/elements');
    const element_data = await response.json();
    return element_data;
};

fetchElementData().then((data) => renderTable(data));