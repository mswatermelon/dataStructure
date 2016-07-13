/**
 * Created by Вероника on 13.07.2016.
 */
function deepEqual(actual, expected) {
    if (actual === expected) return true;

    let flag = true;

    let dateEqual = function (date1, date2){
        if (date1.getTime() != date2.getTime()) flag = flag && false;
    };

    let toStringEqual = function (fun1, fun2){
        if (fun1.toString() != fun2.toString()) flag = flag && false;
    };
    
    let nanEqual = function (y) {
        if (!(isNaN(y) && y != undefined)) flag = flag && false;
    };

    let simpleType = function (x) {
        return (typeof x  == "number" || typeof x  == "string" ||
                typeof x  == "boolean" || typeof x  == "undefined" ||
                x  === null)
    };

    let objectType = function (x, y) {
        if (x instanceof Array) arrayEqual(x, y);
        else if(x instanceof Date) dateEqual(x, y);
        else if(x instanceof RegExp) toStringEqual(x, y);
        else if(typeof x == "function") toStringEqual(x, y);
        else objEqual(x, y);
    };

    let elEqual = function (x, y) {
        if (simpleType(x)){

            if(isNaN(x) && x != undefined) nanEqual(y);
            else if (x !== y) flag = flag && false;
        }
        else{
            objectType(x, y);
        }
    };

    let arrayEqual =function (arr1, arr2) {
        if (arr1.length != arr2.length) flag = flag && false;

        for(let i = 0; i <arr1.length; i++) {
            elEqual(arr1[i], arr2[i]);
        }
    };

    let objEqual = function (obj1,obj2){
        if (Object.getOwnPropertyNames(obj1).length != Object.getOwnPropertyNames(obj2).length){
            flag = flag && false;
        }

        for(prop in obj1) {
            if(obj1.hasOwnProperty(prop) && obj2.hasOwnProperty(prop)) {
                elEqual(obj1[prop], obj2[prop]);
            }
        }
    };

    objEqual(actual, expected);
    return flag;
}
