import {test} from 'node:test';
import assert from 'node:assert/strict';
import {sumAmounts,ratioOfSums,blendedRoas,formatMultiplier} from '../index.js';
test('totals are ratio of sums, not mean daily ratios',()=>{
  const r=blendedRoas([{netRevenueMinor:10000,adsMinor:1000},{netRevenueMinor:10000,adsMinor:9000}]);
  assert.equal(r.value,2); assert.equal(formatMultiplier(r.value),'2.00×');
});
test('unknown differs from known zero',()=>{
  assert.equal(sumAmounts([0]).total,0);
  assert.deepEqual(sumAmounts([0,null,500]),{total:null,knownTotal:500,missingCount:1,complete:false});
  assert.equal(blendedRoas([{netRevenueMinor:null,adsMinor:100}]).value,null);
  assert.equal(formatMultiplier(blendedRoas([{netRevenueMinor:0,adsMinor:100}]).value),'0.00×');
});
test('empty input and zero spend have no ratio',()=>{
  assert.equal(blendedRoas([]).value,null);
  assert.equal(blendedRoas([{netRevenueMinor:500,adsMinor:0}]).value,null);
  assert.equal(formatMultiplier(null),'—');
});
test('signed revenue supports net negative periods without hiding loss',()=>{
  assert.equal(blendedRoas([{netRevenueMinor:-500,adsMinor:100}]).value,-5);
  assert.equal(sumAmounts([500,-500]).total,0);
  assert.throws(()=>blendedRoas([{netRevenueMinor:100,adsMinor:-1}]),RangeError);
});
test('strict units reject strings, fractions and non-finite values',()=>{
  for(const value of ['100',1.1,NaN,Infinity,true]) assert.throws(()=>sumAmounts([value]),TypeError);
  assert.throws(()=>sumAmounts([Number.MAX_SAFE_INTEGER,1]),RangeError);
  assert.equal(sumAmounts([Number.MAX_SAFE_INTEGER,1,-1]).total,Number.MAX_SAFE_INTEGER);
});
test('missing fields and sparse rows remain incomplete',()=>{
  assert.equal(ratioOfSums([{}]).value,null);
  assert.equal(blendedRoas(new Array(1)).complete,false);
  assert.throws(()=>ratioOfSums(null));
});
test('display rejects fabricated infinity and preserves two decimal units',()=>{
  assert.equal(formatMultiplier(1.23456),'1.23×');
  assert.throws(()=>formatMultiplier(Infinity));
  assert.throws(()=>formatMultiplier('2'));
});
