export interface AmountSummary {total:number|null; knownTotal:number; missingCount:number; complete:boolean}
export interface RatioSummary {numerator:AmountSummary; denominator:AmountSummary; complete:boolean; value:number|null}
export function sumAmounts(values:Array<number|null|undefined>):AmountSummary;
export function ratioOfSums(rows:Array<{numerator?:number|null; denominator?:number|null}>):RatioSummary;
export function blendedRoas(rows:Array<{netRevenueMinor?:number|null; adsMinor?:number|null}>):RatioSummary;
export function formatMultiplier(value:number|null|undefined):string;
