/*
 * Formata um número inteiro como string com quantidade de dígitos definida
 * @param {number} numero - Número inteiro a ser formatado
 * @param {number} casas - Quantidade de dígitos desejada
 * @returns {string} Número formatado com a quantidade de dígitos desejada
 */
export default function formatarComCasas(numero, casas) {
    return numero.toString().padStart(casas, '0');
}

/* Exemplos de uso
*  console.log(formatarComCasas(5, 4));    // "0005"
*  console.log(formatarComCasas(45, 6));   // "000045"
*  console.log(formatarComCasas(123, 2));  // "123" (não corta)
*  console.log(formatarComCasas(1234, 4)); // "1234" 
*/
