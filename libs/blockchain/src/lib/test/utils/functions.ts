/**
 * Generates uint256 timestamp from date.
 * Current date is taken if no date is provided
 * @returns uint256 timestamp
 */
export function convertDateToSolidityDate(_date: Date) {
  const date = _date || new Date();
  return date.getTime() / 1000;
}
