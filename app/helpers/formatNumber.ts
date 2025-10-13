const formatNumber = (number: number, fraction: number = 2) => {
  return new Intl.NumberFormat('ru-RU', {
    maximumFractionDigits: fraction,
    minimumFractionDigits: fraction
  }).format(number)
}

export default formatNumber;