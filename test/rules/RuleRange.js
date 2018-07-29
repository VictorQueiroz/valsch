import { strict as assert } from 'assert';
import RuleRange from '../../lib/rules/RuleRange';
import { test } from 'sarg';

test('it should validate when comparison type is greater than or equal', async () => {
    const rule = new RuleRange(10, 'gte');

    assert.equal(await rule.validate(10), true);
    assert.equal(await rule.validate(5), false);
    assert.equal(await rule.validate(15), true);
});

test('it should be able to work with arrays', async () => {
    const rule = new RuleRange(10, 'gte');

    assert.equal(await rule.validate([]), false);
    assert.equal(await rule.validate(new Array(10)), true);
    assert.equal(await rule.validate(new Array(5)), false);
    assert.equal(await rule.validate(new Array(15)), true);
});

test('it should be able to work with strings', async () => {
    const rule = new RuleRange(10, 'gte');

    assert.equal(await rule.validate(''), false);
    assert.equal(await rule.validate('123456789_'), true);
    assert.equal(await rule.validate('123456789'), false);
    assert.equal(await rule.validate('123456789_-'), true);
});

test('it should throw when receive unexpected value', async () => {
    await assert.rejects(async () => {
        new RuleRange(0, 'gte').validate(undefined);
    }, /Unexpected value/);
});

test('it should validate when comparison type is less than or equal', async () => {
    const rule = new RuleRange(10, 'lte');

    assert.equal(await rule.validate(10), true);
    assert.equal(await rule.validate(5), true);
    assert.equal(await rule.validate(20), false);
    assert.equal(await rule.validate(-10), true);
});

test('it should throw when receive invalid comparison type', async () => {
    const rule = new RuleRange(10, '');
    await assert.rejects(async () => {
        await rule.validate(0);
    }, /Invalid RangeComparisonType/);
});