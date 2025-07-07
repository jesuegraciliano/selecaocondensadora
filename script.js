document.addEventListener('DOMContentLoaded', () => {
    const calculateBtn = document.getElementById('calculateBtn');
    const ambientTempSelect = document.getElementById('ambientTemp');
    const thermalLoadCCInput = document.getElementById('thermalLoadCC');
    const suggestedModelSpan = document.getElementById('suggestedModel');

    // Dados de capacidade da unidade condensadora para R134a
    // Temperatura de Evaporação fixa em -5°C, conforme o catálogo.
    const condensingUnitData = {
        '32': [ // Capacidades para Temperatura Ambiente de 32°C
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
        '35': [ // Capacidades para Temperatura Ambiente de 35°C
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
    };

    calculateBtn.addEventListener('click', () => {
        const selectedAmbientTemp = ambientTempSelect.value;
        const thermalLoadCC = parseFloat(thermalLoadCCInput.value);

        // Limpar resultados anteriores
        suggestedModelSpan.textContent = '';

        if (isNaN(thermalLoadCC) || thermalLoadCC <= 0) {
            suggestedModelSpan.textContent = 'Por favor, insira uma Carga Térmica (CC) válida e positiva.';
            return;
        }

        const capacitiesForTemp = condensingUnitData[selectedAmbientTemp];

        if (!capacitiesForTemp) {
            suggestedModelSpan.textContent = 'Dados de capacidade não encontrados para a temperatura ambiente selecionada.';
            return;
        }

        let suggestedModel = 'Nenhum modelo encontrado para os critérios informados.';
        let found = false;

        // Encontrar o modelo com capacidade igual ou imediatamente superior
        for (let i = 0; i < capacitiesForTemp.length; i++) {
            if (thermalLoadCC <= capacitiesForTemp[i].kcalh) {
                suggestedModel = capacitiesForTemp[i].model;
                found = true;
                break; // Encontrou o valor exato ou imediatamente superior
            }
        }

        if (!found) {
            // Se a carga térmica for maior que a capacidade máxima disponível
            suggestedModel = 'Carga térmica muito alta para os modelos disponíveis nesta temperatura ambiente.';
        }

        suggestedModelSpan.textContent = suggestedModel;
    });
});
