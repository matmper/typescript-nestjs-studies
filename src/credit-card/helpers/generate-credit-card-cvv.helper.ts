/**
 * Retorna um valor válido de 3 dígitos (CVV)
 * @returns string
 */
const generateCreditCardCvv = () => {
  const cvv = Math.floor( Math.random() * ( 999 - 100 + 1 ) + 100 );
  return cvv.toString();
};

export default generateCreditCardCvv;
