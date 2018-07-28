import RuleConditional from '../../lib/rules/RuleConditional';
import { test } from 'sarg';
import { strict as assert } from 'assert';
import RuleTypeOf from '../../lib/rules/RuleTypeOf';

test('it should return true if get rule function returns undefined', async () => {
    const rule = new RuleConditional(() => undefined);
    assert.equal(await rule.validate(), true);
});

test('it should execute rule according to what was returned from get rule function', async () => {
    const rule = new RuleConditional(() => {
        return new RuleTypeOf('string');
    });
    assert.equal(await rule.validate(''), true);
    assert.equal(await rule.validate(0), false);
});