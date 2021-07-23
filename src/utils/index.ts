const milliFormat = (num: number): string => {
  if (!num || isNaN(Number(num))) return '';
  return (
    num ?
    num.toString().replace(/\d+/, s => {
      return s.replace(/(\d)(?=(\d{3})+$)/g, '$1,');
    }) : ''
  );
};

export {
  milliFormat
};
