export function formatNumberWithCommas(number) {
  if (number) return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}
