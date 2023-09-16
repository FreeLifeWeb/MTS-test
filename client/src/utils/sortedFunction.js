export const sortTariffsByPrice = (tariffs, sortByPrice) => {
  return tariffs.slice().sort((a, b) => {
      if (sortByPrice === 'ascending') {
          return parseFloat(a.price) - parseFloat(b.price);
      } else {
          return parseFloat(b.price) - parseFloat(a.price);
      }
  });
};