const doc_main = document.getElementById('main');

console.log(document.getElementById(`group_${1}`))

function renderElements(element_data) {
    for (let i = 0; i < element_data.length; i++) {
        if (i === 118) return;

        const current_element = element_data[i];

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

        if(current_element.number >= 57 && current_element.number <= 71){
            document.getElementById('lanthanides').appendChild(card_main)
            console.log(current_element.name)
        } 
        
        else if(current_element.number >= 89 && current_element.number <= 103){
            document.getElementById('actinides').appendChild(card_main)
        } 
        
        else {
            console.log('bet')
            const doc_group_to_append = document.getElementById(`group_${current_element.pt_group}`);

            if (current_element.pt_group === 2) doc_group_to_append.classList.add('down_one');
            if (current_element.pt_group >= 13 && current_element.pt_group <= 17) doc_group_to_append.classList.add('down_one');
            if (current_element.pt_group >= 3 && current_element.pt_group <= 12) doc_group_to_append.classList.add('down_three');

            doc_group_to_append.appendChild(card_main);
        }
    };
};

async function handleFetch() {
    const response = await fetch('/elements');
    const element_data = await response.json();
    return element_data;
};

handleFetch().then((data) => renderElements(data));