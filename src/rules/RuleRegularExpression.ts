import Rule from "./Rule";

export default class RuleRegularExpression extends Rule {
    constructor(private regExp: RegExp) {
        super();
    }
    public validate(value: any) {
        return this.regExp.test(value);
    }
}