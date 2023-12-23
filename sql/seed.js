const db = require('./connect');
const fs = require('fs');

function handleApostrophes(string){
    if (string.includes("'")) {
        const edited_string = string.replace("'", "''");
        return edited_string;
    }
    return string;
}

function parseJSON(json_data) {
    const parsed_json = JSON.parse(json_data)
    const elements = parsed_json['elements'];
    return elements;
};

function handleInsertSql(data) {
    const elements = parseJSON(data);
    // console.log(elements[11].summary)
    for (let i = 0; i < elements.length; i++) {
        let formatted_summary = handleApostrophes(elements[i].summary)
        db.query(`
        INSERT INTO elements (
            number,
            name,
            symbol,
            atomic_mass,
            appearance,
            category,
            summary,
            boil,
            density,
            melt,
            molar_heat,
            discovered_by,
            pt_period,
            pt_group,
            phase_roomtemp,
            source,
            bohr_model_image,
            bohr_model_3d,
            spectral_img,
            e_config,
            e_config_semantic,
            e_affinity,
            electronegativity,
            block
        ) VALUES (
            ${elements[i].number},
            '${elements[i].name}',
            '${elements[i].symbol}',
            ${elements[i].atomic_mass},
            '${elements[i].appearance}',
            '${elements[i].category}',
            '${formatted_summary}',
            ${elements[i].boil},
            ${elements[i].density},
            ${elements[i].melt},
            ${elements[i].molar_heat},
            '${elements[i].discovered_by}',
            ${elements[i].period},
            ${elements[i].group},
            '${elements[i].phase}',
            '${elements[i].source}',
            '${elements[i].bohr_model_image}',
            '${elements[i].bohr_model_3d}',
            '${elements[i].spectral_img}',
            '${elements[i].electron_configuration}',
            '${elements[i].electron_configuration_semantic}',
            ${elements[i].electron_affinity},
            ${elements[i].electronegativity_pauling},
            '${elements[i].block}'
        );`, (error) => {
            if (error) console.log(error)
        });
    };
};


fs.readFile('../data/pt.json', 'utf-8', (error, data) => {
    if (error) return console.log(error);
    handleInsertSql(data);
});