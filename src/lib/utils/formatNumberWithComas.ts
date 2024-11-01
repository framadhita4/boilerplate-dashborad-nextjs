const formatNumberWithCommas = (value: string): string => {
  const cleanedValue = value.replace(/[^\d]/g, '');

  return cleanedValue.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export default formatNumberWithCommas;
