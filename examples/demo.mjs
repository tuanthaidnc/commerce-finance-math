import {blendedRoas,formatMultiplier} from '../index.js';
const result=blendedRoas([{netRevenueMinor:10000,adsMinor:1000},{netRevenueMinor:10000,adsMinor:9000}]);
console.log({ratio:formatMultiplier(result.value),complete:result.complete});
