export const validateCPF = (cpf: any) => {
  cpf = cpf.replace(/[^\d]+/g, '');
  if (!!cpf.match(/(\d)\1{10}/))
    return false;
  cpf = cpf.split('');
  const validDigito = cpf.filter((digit: any, index: any, array: any) => index >= array.length - 2 && digit).map( (el: any) => {
    return +el;
  });
  const validar = (pop: any) => cpf.filter((digit: any, index: any, array: any) => index < array.length - pop && digit).map((el: any) => {
    return +el;
  });
  const resto = (count: any, pop: any) => (validar(pop).reduce((soma: any, el: any, i: any) => soma + el * (count - i), 0) * 10) % 11 % 10;

  return !(resto(10,2) !== validDigito[0] || resto(11,1) !== validDigito[1]);
}