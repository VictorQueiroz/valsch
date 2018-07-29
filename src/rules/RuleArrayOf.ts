import ValidationResult, {
    ValidationFailures
} from '../ValidationResult';
import Validator from '../Validator';
import Rule from './Rule';

export default class RuleArrayOf<T> extends Rule {
    constructor(private validator?: Validator<T>, private rule?: Rule) {
        super();
    }
    public async validate(value: any, property: any) {
        if(!Array.isArray(value))
            return false;

        const ii = value.length;
        let failuresCount: number = 0;
        const failures: ValidationFailures = {};

        for(let i = 0; i < ii; i++) {
            let result;

            if(this.rule)
                result = await this.rule.validate(value[i], property);
            else if(this.validator)
                result = await this.validator.validate(value[i]);
            else
                throw new Error('invalid arguments');

            if(result instanceof ValidationResult && result.failed()) {
                failures[i] = result;
                failuresCount++;
            } else if(typeof result == 'boolean' && result != true) {
                let failure = failures[i];
                if(failure instanceof ValidationResult) {
                    throw new Error('A validator/rule should either always return ValidationResult or boolean');
                }
                if(!failure) {
                    failure = { missing: false, rules: [] };
                    failures[i] = failure;
                }
                if(this.rule) {
                    failure.rules.push(this.rule.getName());
                }
                failuresCount++;
            }
        }

        if(failuresCount > 0)
            return new ValidationResult(failures);

        return new ValidationResult();
    }
}