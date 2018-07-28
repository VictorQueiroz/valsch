import ValidationResult from "../ValidationResult";
import Rule from "./Rule";

export default class RuleOr extends Rule {
    constructor(private rules: Rule[]) {
        super(`Or<${rules.map((r) => r.getName()).join('|')}>`);
    }
    public async validate(value: any, property: any) {
        for(const rule of this.rules) {
            const result = await rule.validate(value, property);

            if(typeof result == 'boolean' && result == true)
                return true;
            else if(result instanceof ValidationResult && !result.failed())
                return true;
        }

        return false;
    }
}