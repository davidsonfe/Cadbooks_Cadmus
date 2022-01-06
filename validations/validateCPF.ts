export const validateCPF = (cpf: any) => {
  cpf = cpf.replace(/[^\d]+/g, '');
  if (!!cpf.match(/(\d)\1{10}/))
    return false;
  cpf = cpf.split('');
  const validDigit = cpf.filter((digit: any, index: any, array: any) => {
    return index >= array.length - 2 && digit;
  }).map( (el: any) => {
    return +el;
  });
  const validate = (pop: any) => cpf.filter((digit: any, index: any, array: any) => {
    return index < array.length - pop && digit;
  }).map((el: any) => {
    return +el;
  });
  const rest = (count: any, pop: any) => {
    return (validate(pop).reduce((soma: any, el: any, i: any) => soma + el * (count - i), 0) * 10) % 11 % 10;
  };

  return !(rest(10,2) !== validDigit[0] || rest(11,1) !== validDigit[1]);
}