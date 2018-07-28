import Validator from '../../lib/Validator';
import RuleOr from '../../lib/rules/RuleOr';
import RuleArrayOf from '../../lib/rules/RuleArrayOf';
import RuleTypeOf from '../../lib/rules/RuleTypeOf';
import { test } from 'sarg';
import { strict as assert } from 'assert';
import Schema from '../../lib/Schema';

test('it should deal with rules which return boolean result', async () => {
    const rule = new RuleOr([
        new RuleTypeOf('boolean'),
        new RuleTypeOf('string')
    ]);
    assert.equal(await rule.validate(''), true);
    assert.equal(await rule.validate(true), true);
});

test('it should deal with rules which return a new ValidationResult', async () => {
    const validator = new Validator(new Schema({
        name: {
            required: true, rules: [new RuleTypeOf('string')]
        }
    }));
    const rule = new RuleOr([
        new RuleArrayOf(validator),
        new RuleTypeOf('string')
    ]);

    assert.deepEqual(await rule.validate(''), true);
    assert.deepEqual(await rule.validate(2), false);
    assert.deepEqual(await rule.validate([]), true);
    assert.deepEqual(await rule.validate([{}]), false);
    assert.deepEqual(await rule.validate([{ name: '' }]), true);
});