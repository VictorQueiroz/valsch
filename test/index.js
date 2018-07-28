import { test } from 'sarg';
import { strict as assert } from 'assert';
import Schema from '../lib/Schema';
import * as Rules from '../lib/rules';
import Validator from '../lib/Validator';
import ValidationResult from '../lib/ValidationResult';

const Post = new Schema({
    name: {
        required: true,
        rules: [
            Rules.string()
        ]
    }
}).setName('Post');

const User = new Schema({
    name: {
        rules: [
        ]
    },
    posts: {
        rules: [
            Rules.arrayOf(Post)
        ]
    }
}).setName('User');

test('it should invalidate invalid types for properties', async () => {
    const validator = new Validator(Post);
    assert.deepEqual(await validator.validate({
        name: 1
    }), new ValidationResult({
        name: { missing: false, rules: ['string'] }
    }));
});

test('it should declare missing not submitted but required properties', async () => {
    const validator = new Validator(Post);
    assert.deepEqual(await validator.validate({}), new ValidationResult({
        name: { missing: true, rules: [] }
    }));
});

test('it should invalidate deep properties missing', async () => {
    const validator = new Validator(User);
    const result = await validator.validate({
        name: '',
        posts: [{  }]
    });
    assert.deepEqual(result, new ValidationResult({
        posts: new ValidationResult({
            '0': new ValidationResult({
                name: { missing: true, rules: [] }
            })
        })
    }));
});

test('it should invalidate array property with wrong value', async () => {
    const validator = new Validator(User);

    assert.deepEqual(await validator.validate({
        name: '',
        posts: 2
    }), new ValidationResult({
        posts: { missing: false, rules: ['Array'] }
    }));
});