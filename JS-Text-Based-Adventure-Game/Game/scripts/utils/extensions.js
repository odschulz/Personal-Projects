Object.prototype.inherits = function (parent) {
    if (!Object.create) {
        Object.prototype.create = function (proto) {
            function F() {}
            F.prototype = proto;
            return new F;
        }
    }

    this.prototype = Object.create(parent.prototype);
    this.prototype.constructor = this;
};

Object.prototype.hasMethods = function(obj /*, method list as strings */){
    var i = 1, methodName;
    while((methodName = arguments[i++])){
        if(typeof obj[methodName] != 'function') {
            return false;
        }
    }
    return true;
};

// in your code
//if(hasMethods(obj, 'quak', 'flapWings','waggle')) {
//    //  IT'S A DUCK, do your duck thang
//}

/* Iteration over getters */
//for (var item in consumable) {
//    if(consumable.__lookupGetter__(item)) {
//        console.log(consumable[item]);
//
//    }
//}
