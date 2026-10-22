function amount(value) {
  if (value == null) return null;
  if (!Number.isSafeInteger(value)) throw new TypeError('Amounts must be safe integer minor units or null');
  return value;
}

/** Known zero is retained; missing values keep the complete total unknown. */
export function sumAmounts(values) {
  if (!Array.isArray(values)) throw new TypeError('Expected an array');
  let total = 0n, missingCount = 0;
  for (const value of values) {
    const parsed = amount(value);
    if (parsed === null) missingCount++;
    else total += BigInt(parsed);
  }
  if (total > BigInt(Number.MAX_SAFE_INTEGER) || total < BigInt(Number.MIN_SAFE_INTEGER)) {
    throw new RangeError('Total exceeds safe integer range');
  }
  const knownTotal = Number(total);
  return {total: values.length && !missingCount ? knownTotal : null, knownTotal,
    missingCount, complete: values.length > 0 && missingCount === 0};
}

/** Caller scopes one currency and one period. No daily ratios are averaged. */
export function ratioOfSums(rows) {
  if (!Array.isArray(rows)) throw new TypeError('Expected rows');
  const numerator = sumAmounts(Array.from(rows, row => row?.numerator));
  const denominator = sumAmounts(Array.from(rows, row => row?.denominator));
  const complete = numerator.complete && denominator.complete;
  return {numerator, denominator, complete,
    value: complete && denominator.total > 0 ? numerator.total / denominator.total : null};
}

export function blendedRoas(rows) {
  if (!Array.isArray(rows)) throw new TypeError('Expected rows');
  return ratioOfSums(Array.from(rows, row => {
    const ads = amount(row?.adsMinor);
    if (ads !== null && ads < 0) throw new RangeError('Ad spend must be nonnegative');
    return {numerator:row?.netRevenueMinor, denominator:ads};
  }));
}

export function formatMultiplier(value) {
  if (value == null) return '—';
  if (typeof value !== 'number' || !Number.isFinite(value)) throw new TypeError('Expected a finite ratio');
  return `${value.toFixed(2)}×`;
}
