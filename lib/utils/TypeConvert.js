export default class TypeConvert {
    static toSet(value) {
        if(value instanceof Set) {
            return value;
        } else {
            return new Set(value);
        }
    }

    static toMap(value) {
        if(value instanceof Map) {
            return value;
        } else {
            const map = new Map();
            for(let key of Object.keys(value)) {
                map.set(key, value[key]);
            }
            return map;
        }
    }

    static toMapOfSets(value) {
        const map = this.toMap(value);
        for(let [key, value] of map) {
            map.set(key, this.toSet(value));
        }
        return map;
    }
}
