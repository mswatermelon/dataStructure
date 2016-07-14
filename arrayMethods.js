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
                newArr[newArr.length] = arr[index];
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

            newArr[newArr.length] = newValue;
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

        newArr[newArr.length] = newValue;
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
                newArr[newArr.length] = arr[index];
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
