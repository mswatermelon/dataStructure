/**
 * Created by Вероника on 12.07.2016.
 */
function forEach(arr, callback, thisArg) {
    let len = arr.length;
    for (let index = 0; index < len; index++){
        let newCallback = callback.bind(thisArg);
        newCallback(arr[index], index, arr);
    }
}

function filter(arr, callback, thisArg) {
    let newArr = [],
        len = arr.length;

    for (let index = 0; index < len; index++){
        let newCallback = callback.bind(thisArg);
        if(newCallback(arr[index], index, arr)){
            newArr.push(arr[index]);
        }
    }

    return newArr;
}

function map(arr, callback, thisArg) {
    let newArr = [],
        len = arr.length;

    for (let index = 0; index < len; index++){
        let newCallback = callback.bind(thisArg),
            newValue = newCallback(arr[index], index, arr);
        newArr.push(newValue);
    }

    return newArr;
}

function slice(arr, begin, end) {
    let newArr = [],
        start = begin || 0,
        stop = end || arr.length;

    if (start < 0) start = 0;
    if (stop < 0) stop = arr.length + end;
    console.log(start, end);
    for(let index = start; index < stop; index++){
        let newValue;
        newValue = arr[index];
        newArr.push(newValue);
    }

    return newArr;
}

(function () {
    function logArrayElements(element, index) {
        // console.log(this);
        console.log('a[' + index + '] = ' + element);
    }
    function isBigEnough(value) {
        return value >= 10;
    }
    function sqrt(num) {
        return num * 2;
    }
    m = [9,20,30,40];
    // forEach(m, logArrayElements);
    // forEach(m, logArrayElements, {});
    // console.log(filter(m, isBigEnough));
    // console.log(filter(m, isBigEnough, {}));
    // console.log(map(m, sqrt));
    // console.log(map(m, sqrt, {}));
    a = [1,2,7,9,15,"rfaehrhe", String, Number, {a:12}, 13];
    b = a.slice(2, -1);
    console.log('new');
    c = [1,2,7,9,15,"rfaehrhe", String, Number, {a:12}, 13];
    d = slice(c, 2, -1);
    console.log(b);
    console.log(c);
})();