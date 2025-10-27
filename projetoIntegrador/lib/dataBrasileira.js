/*
 * Converte uma data do formato americano (YYYY-MM-DD) para o formato brasileiro (DD/MM/YYYY)
 * @param {string} dataAmericana - Data no formato "YYYY-MM-DD"
 * @returns {string} - Data no formato "DD/MM/YYYY"
 */
export default function formatarDataParaBrasileiro(dataAmericana) {
    // Valida se a data foi passada
    if (!dataAmericana) return '';

    // Separa ano, mês e dia usando split
    const partes = dataAmericana.split('-');
    if (partes.length !== 3) return '';

    const [ano, mes, dia] = partes;

    // Retorna no formato brasileiro
    return `${dia}/${mes}/${ano}`;
}

// Exemplos de uso:
//console.log(formatarDataParaBrasileiro("2025-10-12")); // "12/10/2025"
//console.log(formatarDataParaBrasileiro("1990-01-05")); // "05/01/1990"
