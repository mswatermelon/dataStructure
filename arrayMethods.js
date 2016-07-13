/**
 * Created by Вероника on 12.07.2016.
 */
export function forEach(arr, callback, thisArg) {
    if (arr == null) {
      throw new TypeError('arr is null or not defined');
    }
    if (typeof callback !== 'function') {
        throw new TypeError(callback + ' is not a function');
    }

    let len = arr.length;

    for (let index = 0; index < len; index++){
        if (index in arr) callback.call(thisArg, arr[index], index, arr);
    }
}

export function filter(arr, callback, thisArg) {
    if (arr == null) {
      throw new TypeError('arr is null or not defined');
    }
    if (typeof callback !== 'function') {
        throw new TypeError(callback + ' is not a function');
    }

    let newArr = [],
        len = arr.length;

    for (let index = 0; index < len; index++){
        if (index in arr){
            let newCallback = callback.bind(thisArg);

            if(newCallback(arr[index], index, arr)){
                newArr.push(arr[index]);
            }
        }
    }

    return newArr;
}

export function map(arr, callback, thisArg) {
    if (arr == null) {
      throw new TypeError('arr is null or not defined');
    }
    if (typeof callback !== 'function') {
        throw new TypeError(callback + ' is not a function');
    }

    let newArr = [],
        len = arr.length;

    for (let index = 0; index < len; index++){
        if (index in arr){
            let newCallback = callback.bind(thisArg),
                newValue = newCallback(arr[index], index, arr);

            newArr.push(newValue);
        }
    }

    return newArr;
}

export function slice(arr, begin, end) {
    if (arr == null) {
      throw new TypeError('arr is null or not defined');
    }

    let newArr = [],
        len = arr.length,
        start = begin || 0,
        stop = end || len;

    if(Math.abs(start) > len-1) start = 0;
    if(Math.abs(stop) > len-1) stop = 0;

    if (start < 0) start = len + start;
    if (stop < 0) stop = len + end;

    for(let index = start; index < stop; index++){
        let newValue = arr[index];

        newArr.push(newValue);
    }

    return newArr;
}

export function reduce(arr, callback, initialValue) {
    if (arr == null) {
      throw new TypeError('arr is null or not defined');
    }
    if (typeof callback !== 'function') {
        throw new TypeError(callback + ' is not a function');
    }

    let len = arr.length,
        start = initialValue?0: 1,
        previousValue  = initialValue || arr[0];

    if (!arr && !initialValue) throw new TypeError();

    if ((len == 1 && !initialValue) || (!arr && initialValue)){
        for (let index = start; index < len; index++){
            if(arr[index] != null){
                return arr[index];
            }
        }
    }

    for (let index = start; index < len; index++){
        if (index in arr) previousValue = callback(previousValue, arr[index], index, arr);
    }

    return previousValue;
}

export function splice(arr, start, deleteCount){
    let newArr = [],
        tempArr = [],
        tempLen = 0,
        len = arr.length,
        argLen = arguments.length;

    if (start < 0) start = len + start;

    for(let index = 0; index < len; index++){
        if( index >= start && index < start + deleteCount){
            if (index in arr){
                newArr.push(arr[index]);
            }
            for(let i = 3; i < argLen; i++){
                tempArr[tempLen] = arguments[i];
                tempLen++;
            }
        }
        else{
            if (index in arr){
                tempArr[tempLen] = arr[index];
            }
            tempLen++;
        }
    }

    if(start > len-1){
        for(let i = 3; i < argLen; i++){
            tempArr[tempLen] = arguments[i];
            tempLen++;
        }
    }

    arr.length = tempArr.length;

    for(let index = 0; index < arr.length; index++){
        if (index in tempArr){
            arr[index] = tempArr[index];
        }
    }

    return newArr;
}

(function () {
    const assert = require('assert');

    function logArrayElements(element, index) {
        console.log('a[' + index + '] = ' + element);
    }
    function isBigEnough(value) {
        return value >= 10;
    }
    function sqrt(num) {
        return num * 2;
    }
    a = [5,6,7,8,9,12,17,46,3,5463];
    b = [5,6,7,8,9,12,17,46,3,5463];
    c = a.splice(5,1);
    d = splice(b,5,1);
    assert.deepEqual(a,b);
    assert.deepEqual(c,d);
    a = [5,6,7,8,9,12,17,46,3,5463];
    b = [5,6,7,8,9,12,17,46,3,5463];
    c = a.splice(5,1,14,18,25,20);
    d = splice(b,5,1,14,18,25,20);
    assert.deepEqual(a,b);
    assert.deepEqual(c,d);
    a = [5,6,7,8,9,,17,46,3,5463];
    b = [5,6,7,8,9,,17,46,3,5463];
    c = a.splice(5,1,14,18,25,20);
    d = splice(b,5,1,14,18,25,20);
    assert.deepEqual(a,b);
    assert.deepEqual(c,d);
    a = [5,6,7,8,9,,17,46,3,5463];
    b = [5,6,7,8,9,,17,46,3,5463];
    c = a.splice(6,1,14,18,25,20);
    d = splice(b,6,1,14,18,25,20);
    assert.deepEqual(a,b);
    assert.deepEqual(c,d);
    a = new Array(10);
    b = new Array(10);
    c = a.splice(5,1,14,18,25,20);
    d = splice(b,5,1,14,18,25,20);
    assert.deepEqual(a,b);
    assert.deepEqual(c,d);
    a =[undefined*10];
    b =[undefined*10];
    c = a.splice(5,1,14,18,25,20);
    d = splice(b,5,1,14,18,25,20);
    assert.deepEqual(c,d);
    var myFish = ['ангел', 'клоун', 'мандарин', 'хирург'];
    var removed = myFish.splice(2, 0, 'барабанщик');
    var myFish2 = ['ангел', 'клоун', 'мандарин', 'хирург'];
    var removed2 = splice(myFish2, 2, 0, 'барабанщик');
    assert.deepEqual(removed,removed2);
    myFish = ['ангел', 'клоун', 'мандарин', 'хирург'];
    removed = myFish.splice(3, 1);
    myFish2 = ['ангел', 'клоун', 'мандарин', 'хирург'];
    removed2 = splice(myFish2, 3, 1);
    assert.deepEqual(removed, removed2);
    myFish = ['ангел', 'клоун', 'мандарин', 'хирург'];
    removed = myFish.splice(2, 1, 'телескоп');
    myFish2 = ['ангел', 'клоун', 'мандарин', 'хирург'];
    removed2 = splice(myFish2,2, 1, 'телескоп');
    assert.deepEqual(removed,removed2);
    myFish = ['ангел', 'клоун', 'мандарин', 'хирург'];
    removed = myFish.splice(0, 2, 'попугай', 'анемон', 'голубая');
    myFish2 = ['ангел', 'клоун', 'мандарин', 'хирург'];
    removed2 = splice(myFish2,0, 2, 'попугай', 'анемон', 'голубая');
    assert.deepEqual(removed,removed2);
    myFish = ['ангел', 'клоун', 'мандарин', 'хирург'];
    removed = myFish.splice(3, Number.MAX_VALUE);
    myFish2 = ['ангел', 'клоун', 'мандарин', 'хирург'];
    removed2 = splice(myFish2,3, Number.MAX_VALUE);
    assert.deepEqual(removed,removed2);
    myFish = ['ангел', 'клоун', 'мандарин', 'хирург'];
    removed = myFish.splice(-3, Number.MAX_VALUE);
    myFish2 = ['ангел', 'клоун', 'мандарин', 'хирург'];
    removed2 = splice(myFish2,-3, Number.MAX_VALUE);
    assert.deepEqual(removed,removed2);
    myFish = [1,2,3,4,5,6,7,8];
    removed = myFish.splice(-3, 5);
    myFish2 = [1,2,3,4,5,6,7,8];
    removed2 = splice(myFish2,-3, 5);
    assert.deepEqual(removed,removed2);
    m = [9,20,30,40];
    n = new Array(3);
    s = [null,undefined,null];
    n[2] = 5;

    console.log('----------------------');
    forEach(m, logArrayElements);
    console.log('**********************');
    m.forEach(logArrayElements);
    console.log('----------------------');
    forEach(m, logArrayElements, {});
    console.log('**********************');
    m.forEach(logArrayElements, {});
    console.log('----------------------');
    forEach(n, logArrayElements);
    console.log('**********************');
    n.forEach(logArrayElements);
    console.log('----------------------');
    forEach(n, logArrayElements, {});
    console.log('**********************');
    n.forEach(logArrayElements, {});
    console.log('----------------------');
    forEach(s, logArrayElements);
    console.log('**********************');
    s.forEach(logArrayElements);
    console.log('----------------------');
    forEach(s, logArrayElements, {});
    console.log('**********************');
    s.forEach(logArrayElements, {});
    console.log('----------------------');
    console.log(filter(m, isBigEnough));
    console.log(filter(m, isBigEnough, {}));
    console.log(map(m, sqrt));
    console.log(map(m, sqrt, {}));
    a = [1,2,7,9,15,"rfaehrhe", String, Number, {a:12}, 13];
    b = a.slice(-16, 2);
    console.log('new');
    c = [1,2,7,9,15,"rfaehrhe", String, Number, {a:12}, 13];
    d = slice(c, -16, 2);
    console.log(b);
    console.log('**********************');
    console.log(d);
    a = [1,2,7,9,15,"rfaehrhe", String, Number, {a:12}, 13];
    b = a.slice(2, -12);
    console.log('new');
    c = [1,2,7,9,15,"rfaehrhe", String, Number, {a:12}, 13];
    d = slice(c, 2, -12);
    console.log(b);
    console.log('**********************');
    console.log(d);
    a = [1,2,7,9,15,"rfaehrhe", String, Number, {a:12}, 13];
    b = a.slice(-16, -25);
    console.log('new');
    c = [1,2,7,9,15,"rfaehrhe", String, Number, {a:12}, 13];
    d = slice(c, -16, -25);
    console.log(b);
    console.log('**********************');
    console.log(d);
    arr1 = [0, 1, 2, 3, 4].reduce(function(previousValue, currentValue, index, array) {
      return previousValue + currentValue;
    });
    arr2 = reduce([0, 1, 2, 3, 4], function(previousValue, currentValue, index, array) {
      return previousValue + currentValue;
    });
    console.log(arr1,arr2);
    assert.deepEqual(arr1,arr2);
    arr1 = [0, 1, 2, 3, 4].reduce(function(previousValue, currentValue, index, array) {
      return previousValue + currentValue;
    },10);
    arr2 = reduce([0, 1, 2, 3, 4], function(previousValue, currentValue, index, array) {
      return previousValue + currentValue;
    },10);
    console.log(arr1,arr2);
    assert.deepEqual(arr1,arr2);
    arr1 = [0].reduce(function(previousValue, currentValue, index, array) {
      return previousValue + currentValue;
    },10);
    arr2 = reduce([0], function(previousValue, currentValue, index, array) {
      return previousValue + currentValue;
    },10);
    console.log(arr1,arr2);
    assert.deepEqual(arr1,arr2);
    arr1 = [0].reduce(function(previousValue, currentValue, index, array) {
      return previousValue + currentValue;
    });
    arr2 = reduce([0], function(previousValue, currentValue, index, array) {
      return previousValue + currentValue;
    });
    console.log(arr1,arr2);
    assert.deepEqual(arr1,arr2);
    arr1 = [[0, 1], [2, 3], [4, 5]].reduce(function(a, b) {
      return a.concat(b);
    });
    arr2 = reduce([[0, 1], [2, 3], [4, 5]], function(a, b) {
      return a.concat(b);
    });
    console.log(arr1,arr2);
    assert.deepEqual(arr1,arr2);
})();