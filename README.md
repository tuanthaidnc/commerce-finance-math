# commerce-finance-math

[![Tests](https://github.com/tuanthaidnc/commerce-finance-math/actions/workflows/test.yml/badge.svg)](https://github.com/tuanthaidnc/commerce-finance-math/actions/workflows/test.yml)

Integer-minor-unit totals and blended ratios that preserve missing data. ESM, TypeScript declarations, no runtime dependencies.

**Status:** initial 0.1.0 source project, not published on npm. No verified external adoption or production integration. Maintained by [Thái Văn Tuấn](https://github.com/tuanthaidnc).

## Use and reproduce

Clone this repository; no dependency installation is needed for tests.

```sh
npm test
npm run example
npm run check:package
```

```js
import {blendedRoas,formatMultiplier} from './index.js';
const result=blendedRoas([{netRevenueMinor:10000,adsMinor:1000},{netRevenueMinor:10000,adsMinor:9000}]);
console.log(formatMultiplier(result.value)); // 2.00×, not the mean daily ROAS
```

## Contract

- Use safe integer minor units, one currency and one period. No currency conversion, accounting or attribution is inferred.
- `sumAmounts(values)` returns `total: null` for missing inputs or an empty population; `knownTotal` is only the subtotal of known values. Known zero is retained. Invalid numeric inputs and unsafe summed totals throw.
- `ratioOfSums(rows)` accepts numerator/denominator fields, returning summaries and `value`. Unknown inputs or a nonpositive denominator produce null. All rows are included; callers must filter the intended period/population first.
- `blendedRoas(rows)` maps netRevenueMinor/adsMinor into ratioOfSums. Ads must be nonnegative; net revenue can be negative. This is a blended store ratio, not platform attribution.
- `formatMultiplier(value)` displays two decimal places and ×; null/undefined display —. Invalid non-finite ratios throw. Display rounding never changes stored inputs.

No finance connectors, money transfers, invoices, actual store amounts, forecasts or professional accounting advice are included.

## Origin

A new standalone implementation inspired by practical Wondroot/Ops engineering concerns. It does not copy private business code, project history, production configuration or customer fixtures. These generic modules have not replaced live operational logic. All examples are synthetic.

## Maintenance

Report reproducible issues with synthetic inputs and independently checked expected results. Include runtime/version and exact behavior. Maintainer reviews changes; behavior changes require regression tests and compatibility notes. No response-time SLA. Use private [security reporting](https://github.com/tuanthaidnc/commerce-finance-math/security/advisories/new) for sensitive reports.

See [CONTRIBUTING.md](CONTRIBUTING.md), [ROADMAP.md](ROADMAP.md) and [CHANGELOG.md](CHANGELOG.md). MIT licensed. Codex assisted implementation, documentation and tests; this is not independent review or certification.
