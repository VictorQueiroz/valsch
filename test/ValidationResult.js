import { strict as assert } from 'assert';
import ValidationResult from '../lib/ValidationResult';
import { test } from 'sarg';

test('it should return the whole failures object when receive undefined property', () => {
    assert.deepEqual(new ValidationResult({
        name: { missing: true, rules: [] }
    }).get(), {
        name: { missing: true, rules: [] }
    });
});

test('it should return property failure result when input first parameter', () => {
    assert.deepEqual(new ValidationResult({
        name: { missing: true, rules: [] }
    }).get('name'), {
        missing: true,
        rules: []
    });
});

test('it should support array property', () => {
    const result = new ValidationResult({
        posts: new ValidationResult({
            '0': new ValidationResult({
                name: { missing: true, rules: [] }
            }),
            '3': new ValidationResult({
                name: { missing: true, rules: [] }
            })
        })
    });

    assert.equal(result.failed('id'), false);
    assert.equal(result.failed('posts'), true);
    assert.equal(result.failed(['posts', 0]), true);
    assert.equal(result.failed(['posts', 3]), true);
    assert.equal(result.failed(['posts', 9]), false);
});

test('it should return false if failures is undefined', () => {
    assert.equal(new ValidationResult().failed(), false);
});

test('it should return true if failures is not undefined', () => {
    assert.equal(new ValidationResult({
        users: { missing: true, rules: [] }
    }).failed('name'), false);
});