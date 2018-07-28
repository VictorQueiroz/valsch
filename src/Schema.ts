import Rule from "./rules/Rule";

export interface SchemaField {
    rules: Rule[];
    required?: boolean;
}

export interface SchemaFields {
    [s: string]: SchemaField;
}

export default class Schema {
    private name: string = '';
    constructor(public fields: SchemaFields) {
    }
    public setName(name: string) {
        this.name = name;
        return this;
    }
    public getName() {
        return this.name;
    }
}