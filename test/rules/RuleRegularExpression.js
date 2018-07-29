import { strict as assert } from 'assert';
import RuleRegularExpression from '../../lib/rules/RuleRegularExpression';
import { test } from 'sarg';

test('it should return true if regular expression succeed', async () => {
    const rule = new RuleRegularExpression(/test/);

    assert.equal(rule.validate('name'), false);
    assert.equal(rule.validate('test'), true);
    assert.equal(rule.validate('_test_'), true);
});