/**
 * Created by Вероника on 13.07.2016.
 */
function deepEqual(actual, expected) {
    if (actual === expected) return true;

    let flag = true;

    function dateEqual(date1, date2){
        if (date1.getTime() != date2.getTime()) flag = flag && false;
    }

    function arrayEqual(arr1, arr2) {
        if (arr1.length != arr2.length) flag = flag && false;

        let len = arr1.length;

        for(let i = 0; i <len; i++) {
            if (typeof arr1[i]  == "number" || typeof arr1[i]  == "string" ||
                typeof arr1[i]  == "boolean" || typeof arr1[i]  == "undefined" ||
                arr1[i]  === null){

                if (arr1[i] != arr2[i]) flag = flag && false;
            }
            else{
                if (arr1[i] instanceof Array) arrayEqual(arr1[i], arr2[i]);
                else if(arr1[i] instanceof Date) dateEqual(arr1[i], arr2[i]);
                else objEqual(arr1[i], arr2[i]);
            }
        }
    }

    function objEqual(obj1,obj2){
        if (Object.getOwnPropertyNames(obj1).length
            != Object.getOwnPropertyNames(obj2).length) flag = flag && false;

        for(prop in obj1) {
            if(obj1.hasOwnProperty(prop) && obj2.hasOwnProperty(prop)) {
                if (typeof obj1[prop] == "number" || typeof obj1[prop] == "string" ||
                    typeof obj1[prop] == "boolean" || typeof obj1[prop] == "undefined" ||
                    obj1[prop] === null){
                    if (obj1[prop] != obj2[prop])  flag = flag && false;
                }
                else{
                    if (obj1[prop] instanceof Array) arrayEqual(obj1[prop], obj2[prop]);
                    else if(obj1[prop] instanceof Date) dateEqual(obj1[prop], obj2[prop]);
                    else objEqual(obj1[prop], obj2[prop]);
                }
            }
        }
    }

    objEqual(actual, expected);
    return flag;
}

(function(){
    var objA = {
        prop1: 'value1',
        prop2: 'value2',
        prop3: 'value3',
        prop17: function(){
            return 1;
        },
        prop4: {
            subProp1: 'sub value1',
            subProp2: {
                subSubProp1: 'sub sub value1',
                subSubProp2: [1, 2, {prop2: 1, prop: 2}, 4, 5]
            }
        },
        prop5: 1000,
        prop6: new Date(2016, 2, 10)
    };

    var objB = {
        prop5: 1000,
        prop3: 'value3',
        prop1: 'value1',
        prop2: 'value2',
        prop6: new Date('2016/03/10'),
        prop17: function(){

        },
        prop4: {
            subProp2: {
                subSubProp1: 'sub sub value1',
                subSubProp2: [1, 2, {prop2: 1, prop: 2}, 4, 5]
            },
            subProp1: 'sub value1'
        }
    };
    console.log(deepEqual(objA, objB));
})();