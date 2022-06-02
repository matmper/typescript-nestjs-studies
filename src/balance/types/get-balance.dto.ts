class GetBalanceDTO {
  constructor(creditCardNumber: string, balance: number) {
    this.creditCardNumber = creditCardNumber;
    this.balance = balance;
  }

  creditCardNumber: string;
  balance: number;
}

export default GetBalanceDTO;
