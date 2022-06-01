import Brands from '../enum/brands.enum';

/**
 * Captura a identificação da badeira (6 primeiros dígitos)
 * @param brand
 * @returns
 */
const brandBins = (brand: Brands): string =>
  ({
    [Brands.VISA]: '492961',
    [Brands.MASTERCARD]: '53799',
  }[brand]);

/**
 * Verifica se é par
 * @param number
 * @returns Boolean
 */
const isEven = (number) => number % 2 === 0;

/**
 *
 * @returns
 */
const getAccountNumber = () => Math.random().toString().slice(2, 11);

/**
 * Retorna um único número singular
 * @param number
 * @returns number
 */
const singleDigit = (number) => {
  return number <= 9 ? number : number - 9;
};

/**
 * Realiza um cálculo verificando se é par
 * @param even
 * @returns number
 */
const calculateEven = (even) => {
  return singleDigit(even * 2);
};

/**
 * Captura o dígito final do cartão
 * @param checksum
 * @returns number
 */
const calculateFinalDigit = (checksum) => 10 - checksum;

/**
 * Gera o dígito final do cartão
 * @param card
 * @returns number
 */
const generateFinalDigit = (card) => {
  const checksum =
    card
      .split('')
      .map((number, index) =>
        isEven(index) ? calculateEven(number) : parseInt(number, 10),
      )
      .reduce((previous, current) => previous + current) % 10;
  return checksum === 0 ? 0 : calculateFinalDigit(checksum);
};

/**
 * Verifica se o número gerado é válido
 * @param card
 * @returns Boolean
 */
const isValidCreditCard = (card) => {
  if (!card || card.length !== 16) return false;
  return generateFinalDigit(card) === 0;
};

/**
 * Função exportada, gera e valida os números
 * @param brand
 * @returns string
 */
const generateCreditCard = (brand: Brands) => {
  const partialCreditCardNumber = brandBins(brand) + getAccountNumber();
  const checksum = generateFinalDigit(partialCreditCardNumber);
  const creditCardNumber = partialCreditCardNumber + checksum;

  if (!isValidCreditCard(creditCardNumber)) return generateCreditCard(brand);

  return creditCardNumber;
};

export default generateCreditCard;
