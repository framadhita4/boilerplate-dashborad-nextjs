const getStatusChipColor = (val: string) => {
  switch (val) {
    case 'paid':
      return 'success';
    case 'unpaid':
      return 'warning';
    case 'pending':
      return 'warning';
    case 'canceled':
      return 'error';
    default:
      return 'default';
  }
};

export default getStatusChipColor;
