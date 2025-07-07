document.addEventListener('DOMContentLoaded', () => {
    const calculateBtn = document.getElementById('calculateBtn');
    const refrigerantSelect = document.getElementById('refrigerant');
    const evaporationTempSelect = document.getElementById('evaporationTemp'); // Novo seletor
    const ambientTempSelect = document.getElementById('ambientTemp');
    const thermalLoadCCInput = document.getElementById('thermalLoadCC');
    const suggestedModelSpan = document.getElementById('suggestedModel');

    // Dados de capacidade da unidade condensadora
    // Estrutura: { 'Refrigerante': { 'TemperaturaEvap': { 'TemperaturaAmbiente': [{ model: 'X', kcalh: Y }] } } }
    const condensingUnitData = {
        'R134a': {
            '-5': { // Temperatura de Evaporação: -5°C
                '32': [ // Temperatura Ambiente: 32°C
                    { model: 'OP-HJZ019', kcalh: 1900 },
                    { model: 'OP-HJZ022', kcalh: 2309 },
                    { model: 'OP-HJZ028', kcalh: 3003 },
                    { model: 'OP-HJZ032', kcalh: 3405 },
                    { model: 'OP-HJZ036', kcalh: 4212 },
                    { model: 'OP-HJZ040', kcalh: 4593 },
                    { model: 'OP-HJZ044', kcalh: 4916 },
                    { model: 'OP-HJZ050', kcalh: 5590 },
                    { model: 'OP-HJZ056', kcalh: 5856 },
                    { model: 'OP-HJZ064', kcalh: 6741 }
                ],
                '35': [ // Temperatura Ambiente: 35°C
                    { model: 'OP-HJZ019', kcalh: 1800 },
                    { model: 'OP-HJZ022', kcalh: 2192 },
                    { model: 'OP-HJZ028', kcalh: 2865 },
                    { model: 'OP-HJZ032', kcalh: 3243 },
                    { model: 'OP-HJZ036', kcalh: 4046 },
                    { model: 'OP-HJZ040', kcalh: 4402 },
                    { model: 'OP-HJZ044', kcalh: 4660 },
                    { model: 'OP-HJZ050', kcalh: 5292 },
                    { model: 'OP-HJZ056', kcalh: 5546 },
                    { model: 'OP-HJZ064', kcalh: 6412 }
                ]
            }
        },
        'R404A': {
            '-25': { // Temperatura de Evaporação: -25°C
                '32': [ // Temperatura Ambiente: 32°C
                    { model: 'OP-HJZ019', kcalh: 952 },
                    { model: 'OP-HJZ022', kcalh: 1253 },
                    { model: 'OP-HJZ028', kcalh: 1840 },
                    { model: 'OP-HJZ032', kcalh: 2222 },
                    { model: 'OP-HJZ036', kcalh: 2972 },
                    { model: 'OP-HJZ040', kcalh: 3101 },
                    { model: 'OP-HJZ044', kcalh: 3392 },
                    { model: 'OP-HJZ050', kcalh: 3652 },
                    { model: 'OP-HJZ056', kcalh: 4082 },
                    { model: 'OP-HJZ064', kcalh: 4548 },
                    { model: 'OP-HGZ072', kcalh: 5010 }
                ],
                '35': [ // Temperatura Ambiente: 35°C
                    { model: 'OP-HJZ019', kcalh: 865 },
                    { model: 'OP-HJZ022', kcalh: 1153 },
                    { model: 'OP-HJZ028', kcalh: 1971 }, // Corrigido para 1971 (valor da tabela original)
                    { model: 'OP-HJZ032', kcalh: 2093 },
                    { model: 'OP-HJZ036', kcalh: 2792 },
                    { model: 'OP-HJZ040', kcalh: 2974 },
                    { model: 'OP-HJZ044', kcalh: 2839 }, // Corrigido para 2839 (valor da tabela original)
                    { model: 'OP-HJZ050', kcalh: 3380 },
                    { model: 'OP-HJZ056', kcalh: 3758 },
                    { model: 'OP-HJZ064', kcalh: 4214 },
                    { model: 'OP-HGZ072', kcalh: 4628 }
                ],
                '38': [ // Temperatura Ambiente: 38°C
                    { model: 'OP-HJZ019', kcalh: 777 },
                    { model: 'OP-HJZ022', kcalh: 1045 },
                    { model: 'OP-HJZ028', kcalh: 1568 },
                    { model: 'OP-HJZ032', kcalh: 1962 },
                    { model: 'OP-HJZ036', kcalh: 2137 },
                    { model: 'OP-HJZ040', kcalh: 2574 },
                    { model: 'OP-HJZ044', kcalh: 2839 },
                    { model: 'OP-HJZ050', kcalh: 3104 },
                    { model: 'OP-HJZ056', kcalh: 3435 },
                    { model: 'OP-HJZ064', kcalh: 3880 },
                    { model: 'OP-HGZ072', kcalh: 4214 }
                ],
                '43': [ // Temperatura Ambiente: 43°C
                    { model: 'OP-HJZ019', kcalh: 613 },
                    { model: 'OP-HJZ022', kcalh: 895 },
                    { model: 'OP-HJZ028', kcalh: 1449 },
                    { model: 'OP-HJZ032', kcalh: 1687 },
                    { model: 'OP-HJZ036', kcalh: 1792 },
                    { model: 'OP-HJZ040', kcalh: 2185 },
                    { model: 'OP-HJZ044', kcalh: 2576 }, // Corrigido para 2576 (valor da tabela original)
                    { model: 'OP-HJZ050', kcalh: 2565 },
                    { model: 'OP-HJZ056', kcalh: 2812 },
                    { model: 'OP-HJZ064', kcalh: 3225 },
                    { model: 'OP-HGZ072', kcalh: 3884 }
                ]
            }
        }
    };

    // Função para atualizar as opções de Temperatura de Evaporação
    function updateEvaporationTempOptions() {
        const selectedRefrigerant = refrigerantSelect.value;
        evaporationTempSelect.innerHTML = ''; // Limpa as opções existentes

        if (condensingUnitData[selectedRefrigerant]) {
            const availableEvapTemps = Object.keys(condensingUnitData[selectedRefrigerant]).sort((a, b) => parseFloat(a) - parseFloat(b));
            availableEvapTemps.forEach(temp => {
                const option = document.createElement('option');
                option.value = temp;
                option.textContent = `${temp}°C`;
                evaporationTempSelect.appendChild(option);
            });
        }
        // Após atualizar as temperaturas de evaporação, também precisamos atualizar as temperaturas ambiente
        updateAmbientTempOptions();
    }

    // Função para atualizar as opções de Temperatura Ambiente
    function updateAmbientTempOptions() {
        const selectedRefrigerant = refrigerantSelect.value;
        const selectedEvaporationTemp = evaporationTempSelect.value;
        ambientTempSelect.innerHTML = ''; // Limpa as opções existentes

        if (condensingUnitData[selectedRefrigerant] && condensingUnitData[selectedRefrigerant][selectedEvaporationTemp]) {
            const availableAmbientTemps = Object.keys(condensingUnitData[selectedRefrigerant][selectedEvaporationTemp]).sort((a, b) => parseFloat(a) - parseFloat(b));
            availableAmbientTemps.forEach(temp => {
                const option = document.createElement('option');
                option.value = temp;
                option.textContent = `${temp}°C`;
                ambientTempSelect.appendChild(option);
            });
        }
    }

    // Carregar opções iniciais ao carregar a página
    updateEvaporationTempOptions(); // Isso chamará updateAmbientTempOptions()

    // Atualizar opções de temperatura de evaporação quando o refrigerante muda
    refrigerantSelect.addEventListener('change', updateEvaporationTempOptions);

    // Atualizar opções de temperatura ambiente quando a temperatura de evaporação muda
    evaporationTempSelect.addEventListener('change', updateAmbientTempOptions);


    calculateBtn.addEventListener('click', () => {
        const selectedRefrigerant = refrigerantSelect.value;
        const selectedEvaporationTemp = evaporationTempSelect.value; // Pega o valor do novo seletor
        const selectedAmbientTemp = ambientTempSelect.value;
        const thermalLoadCC = parseFloat(thermalLoadCCInput.value);

        // Limpar resultados anteriores
        suggestedModelSpan.textContent = '';

        if (isNaN(thermalLoadCC) || thermalLoadCC <= 0) {
            suggestedModelSpan.textContent = 'Por favor, insira uma Carga Térmica (CC) válida e positiva.';
            return;
        }

        // Acessa os dados usando as três seleções
        const capacitiesForSelection = condensingUnitData[selectedRefrigerant]?.[selectedEvaporationTemp]?.[selectedAmbientTemp];

        if (!capacitiesForSelection) {
            suggestedModelSpan.textContent = 'Dados de capacidade não encontrados para a combinação selecionada de refrigerante, temperatura de evaporação e temperatura ambiente.';
            return;
        }

        let suggestedModel = 'Nenhum modelo encontrado para os critérios informados.';
        let found = false;

        // Encontrar o modelo com capacidade igual ou imediatamente superior
        for (let i = 0; i < capacitiesForSelection.length; i++) {
            if (thermalLoadCC <= capacitiesForSelection[i].kcalh) {
                suggestedModel = capacitiesForSelection[i].model;
                found = true;
                break; // Encontrou o valor exato ou imediatamente superior
            }
        }

        if (!found) {
            // Se a carga térmica for maior que a capacidade máxima disponível
            suggestedModel = 'Carga térmica muito alta para os modelos disponíveis nesta combinação de refrigerante, temperatura de evaporação e temperatura ambiente.';
        }

        suggestedModelSpan.textContent = suggestedModel;
    });
});
