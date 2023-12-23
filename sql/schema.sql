DROP DATABASE IF EXISTS pt_data;

CREATE DATABASE pt_data;

USE pt_data;

CREATE TABLE `elements` (
    number SMALLINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30),
    symbol VARCHAR(3),
    atomic_mass FLOAT,
    appearance VARCHAR(200),
    category VARCHAR(100),
    summary VARCHAR(600),
    boil FLOAT,
    density FLOAT,
    melt FLOAT,
    molar_heat FLOAT,
    discovered_by VARCHAR(100),
    pt_period SMALLINT,
    pt_group SMALLINT,
    phase_roomtemp VARCHAR(10),
    source VARCHAR(200),
    bohr_model_image VARCHAR(200),
    bohr_model_3d VARCHAR(200),
    spectral_img VARCHAR(200),
    e_config VARCHAR(100),
    e_config_semantic VARCHAR(100),
    e_affinity FLOAT,
    electronegativity FLOAT,
    block VARCHAR(10)
);