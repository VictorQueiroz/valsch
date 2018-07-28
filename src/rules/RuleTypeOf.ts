import Rule from "./Rule";

export default class RuleTypeOf extends Rule {
    constructor(private typeOf: string) {
        super();
    }
    public validate(value: any) {
        if(typeof value != this.typeOf)
            return false;

        return true;
    }
}