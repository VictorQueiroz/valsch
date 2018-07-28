import Schema from './Schema';
import ValidationResult, {
    ValidationFailure,
    ValidationFailures
} from './ValidationResult';

export default class Validator<T extends any> {
    constructor(private schema: Schema) {}
    public async validate(data: {
        [K in keyof T]?: T[K];
    }): Promise<ValidationResult> {
        const {
            fields
        } = this.schema;

        const failures: ValidationFailures = {};
        let failuresCount: number = 0;

        for(const property of Object.keys(fields)) {
            const field = fields[property];

            if(!field.required && typeof data[property] == 'undefined') {
                continue;
            }

            const failure: ValidationFailure = {
                missing: false,
                rules: []
            };

            if(typeof data[property] == 'undefined') {
                failure.missing = true;
                failuresCount++;
            } else {
                for(const rule of field.rules) {
                    const result = await rule.validate(data[property], property);

                    if(result instanceof ValidationResult && result.failed()) {
                        failures[property] = result;
                        ++failuresCount;
                        break;
                    } else if(typeof result == 'boolean' && result != true) {
                        failure.rules.push(rule.getName());
                        ++failuresCount;
                    }
                }
            }

            if(!failures.hasOwnProperty(property) && (failure.rules.length > 0 || failure.missing))
                failures[property] = failure;
        }

        if(failuresCount == 0)
            return new ValidationResult();

        return new ValidationResult(failures);

    }
}