import ValidationResult, {
    ValidationFailures
} from '../ValidationResult';
import Validator from '../Validator';
import Rule from './Rule';

export default class RuleArrayOf<T> extends Rule {
    constructor(private validator: Validator<T>) {
        super();
    }
    public async validate(value: any) {
        if(!Array.isArray(value))
            return false;

        const ii = value.length;
        let failuresCount: number = 0;
        const failures: ValidationFailures = {};

        for(let i = 0; i < ii; i++) {
            const result = await this.validator.validate(value[i]);

            if((result instanceof ValidationResult) ? result.failed() : result != true) {
                failures[i] = result;
                failuresCount++;
            }
        }

        if(failuresCount > 0)
            return new ValidationResult(failures);

        return new ValidationResult();
    }
}