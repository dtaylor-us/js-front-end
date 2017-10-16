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
    },
    populateSelectOptions: function (objMap, selEl, value, display) {
        var optionEl = null,
            obj = null,
            i = 0,
            keys = Object.keys(objMap);
        for (i = 0; i < keys.length; i++) {
            obj = objMap[keys[i]];
            obj.index = i + 1; // store selection list index
            optionEl = document.createElement("option");
            optionEl.value = obj[value];
            if (display) {
                optionEl.text = obj[display];
            } else {
                optionEl.text = obj[value];
            }
            selEl.add(optionEl, null);
        }
    }
}