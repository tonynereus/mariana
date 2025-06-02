const convertToKobo = (amountInNaira: number) => {
  return amountInNaira * 100;
};

export const getPaystackConfig = (totalAmount: number, orderId: any, userEmail: string) => {
  const publicKey = process.env.NEXT_PUBLIC_PAYSTACK_PUBLICKEY;

  return {
    reference: orderId,
    email: userEmail,
    amount: convertToKobo(+totalAmount),
    publicKey: publicKey || '',
    currency: 'NGN'
  };
};

export function numberFormat(number:number | string, decimals:number = 0, decPoint = '.', thousandsSep = ','):string {
  if (isNaN((number as number)) || number === null) return '0';

  const fixedNumber = Number(number).toFixed(decimals);

  const [integerPart, decimalPart] = fixedNumber.split('.');

  const withThousands = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, thousandsSep);

  return decimals > 0 ? `${withThousands}${decPoint}${decimalPart}` : withThousands;
}
