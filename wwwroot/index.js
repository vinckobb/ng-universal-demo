"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var TransformObjectIntoString = (function () {
    function TransformObjectIntoString() {
    }
    TransformObjectIntoString.prototype.transform = function (value) {
        value = value || {};
        return (value.name || 'default') + " " + (value.surname || 'default');
    };
    return TransformObjectIntoString;
}());
exports.TransformObjectIntoString = TransformObjectIntoString;