define(
    [], function () {
        var Validation = {
            objectOfCorrectType: function(paramName, paramValue, objType) {
                if (!(paramValue instanceof objType)) {
                    throw new Error(
                        paramName +
                        ' should be an instance of ' +
                        objType.prototype.constructor.name + '.');
                }
            },
            forAbstractClass: function (currentObj, abstractObj) {
                if (currentObj.constructor === abstractObj) {
                    throw new Error(
                        'Cannot create an instance of abstract object ' +
                        abstractObj.prototype.constructor.name + '.');
                }
            },
            forCorrectNumberOfConstructorParameters: function (currentParams, neededParamsCount, obj) {
                if (currentParams.length !== neededParamsCount) {
                    throw new Error(
                        'The constructor of object ' +
                        obj.prototype.constructor.name +
                        ' must be innitiated with ' +
                        neededParamsCount +
                        ' parameters.');
                }
            },
            forPositiveNumber: function (paramName, paramValue) {
                if ((isNaN(paramValue) && !isFinite(paramValue)) || paramValue < 0) {
                    throw new RangeError(paramName + ' should be a positive number.');
                }
            },
            forStringNotEmpty: function (paramName, paramValue) {
                if (!paramValue || /^\s*$/.test(paramValue)) {
                    throw new Error(paramName + ' should be a non-empty string.');
                }
            }
        };

        return Validation;
    });