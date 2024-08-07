const formatProductQuantity = (quantity) => {
  const qtyInt = parseInt(quantity);
  const rest = quantity - qtyInt;

  if( rest === 0.25){
    return `${qtyInt > 0 ? qtyInt : ''} ${qtyInt > 0 ? 'et quart' : 'quart'}`;
  }

  if(rest === 0.5){
    return `${qtyInt > 0 ? qtyInt : ''} ${qtyInt > 0 ? 'et demi' : 'demi'}`;
  }


  if(rest === 0.75){
    return `${qtyInt > 0 ? qtyInt : ''} ${qtyInt > 0 ? 'et trois quart' : 'trois quart'}`;
  }

  return quantity;
};

const formatProductPriceType = (priceType) => {
  return priceType === 1 ? '(Demi)' : '(Quart)'
}