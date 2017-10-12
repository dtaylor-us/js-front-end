var util = {
    isObjectEmpty: function (o) {
        for (var i in o) {
            if (o.hasOwnProperty(i)) {
                return false;
            }
        }
        return true;
    },
    cloneObject: function (obj) {
        var clone = Object.create(Object.getPrototypeOf(obj));
        for (var p in obj) {
            if (obj.hasOwnProperty(p) && typeof obj[p] != "object") {
                clone[p] = obj[p];
            }
        }
        return clone;
    }
}