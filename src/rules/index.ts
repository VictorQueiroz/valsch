import Schema from '../Schema';
import Validator from '../Validator';
import Rule from './Rule';
import RuleArrayOf from './RuleArrayOf';
import RuleConditional, { GetRuleFunction } from './RuleConditional';
import RuleOr from './RuleOr';
import RuleTypeOf from './RuleTypeOf';

export function arrayOf(schema: Schema) {
    return new RuleArrayOf(new Validator(schema)).setName('Array');
}
export function string() {
    return new RuleTypeOf('string').setName('string');
}
export function boolean() {
    return new RuleTypeOf('boolean').setName('boolean');
}
export function number() {
    return new RuleTypeOf('number').setName('number');
}
export function or(...rules: Rule[]) {
    return new RuleOr(rules);
}
export function conditional(fn: GetRuleFunction) {
    return new RuleConditional(fn);
}