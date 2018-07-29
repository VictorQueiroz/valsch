import { strict as assert } from 'assert';
import RuleArrayOf from '../../lib/rules/RuleArrayOf';
import { test } from 'sarg';
import RuleTypeOf from '../../lib/rules/RuleTypeOf';
import ValidationResult from '../../lib/ValidationResult';

test('it should validate rule', async () => {
    const rule = new RuleArrayOf(
        undefined,
        new RuleTypeOf('string').setName('string')
    );

    assert.deepEqual(await rule.validate(['', 0]), new ValidationResult({
        '1': { missing: false, rules: ['string'] }
    }));
    assert.deepEqual(await rule.validate(['', '']), new ValidationResult());
});

test('it should fail if no rule or validator was provided', async () => {
    const rule = new RuleArrayOf();
    await assert.rejects(async () => {
        await rule.validate([0]);
    }, /invalid arguments/);
});