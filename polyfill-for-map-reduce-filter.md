# Polyfill for map, filter and reduce in Javascript

https://medium.com/@tapanprakasht/polyfill-for-map-filter-and-reduce-in-javascript-4b30f7f7f718

By Tapan Prakash https://medium.com/@tapanprakasht

Jan 10 2022

4 min read

## What is Polyfill?

Let’s first understand what is a polyfill. Polyfill is a piece of code that enables us to use the newly supported feature in older browsers that do not support it natively. Let’s assume that Math.abs(x) function is something that’s newly defined as part of the javascript language iteration. So it will take some time to bring this functionality available to all the browsers. Older browsers wouldn't have this functionality at all. For users still on old browsers, these functions are missing. But as a developer, we would like to use the latest features in all the browsers. Thanks to polyfill which helps to bridge this feature gap between browsers by bringing custom code.

You can read more about polyfill from the following MDN document.

```
Polyfill - MDN Web Docs Glossary: Definitions of Web-related terms | MDN
A polyfill is a piece of code (usually JavaScript on the Web) used to provide modern functionality on older browsers…
```

source: developer.mozilla.org https://developer.mozilla.org/en-US/docs/Glossary/Polyfill

Since we understood what is polyfill and how it helps in web development we can write some polyfill for map, filter, and reduce functions in Javascript.

In order to write a polyfill, the first thing is to understand the functionality of the original specification. Here we are going to write polyfills for map, filter, and reduce array methods. These methods are added to javascript as part of the ECMAScript 5 (ES5) edition, so most modern browsers support this functionality. Here we are trying to understand the concept of polyfill by writing for already existing functionality. We would be covering only the basic functionality and full features with error handing etc. will be beyond the scope of this blog.

Okay, let’s dive in 🙂

## Polyfill for map

Following is the definition from the MDN document.

The map() method creates a new array populated with the results of calling a provided function on every element in the calling array.

Take the following example. Here we applied the map method over a list of numbers. Map method accepts a callback method applied to each element of the array and returns the new transformed array.

```
# map_example.js

const numbers = [1, 2, 3, 4, 5];
const doubledNumbers = numbers.map(x => x * 2); // [2, 4, 6, 8, 10]
const anotherArray = numbers.map((x, index) => x * index); // [0, 2, 6, 12, 20]
```

Following is the basic polyfill for the map method.

```
# map_pollyfill.js

Array.prototype.polyfillMap = function(mapLogicFn) {
   let output = [];
   let arr = this;
   for(let i = 0; i < arr.length; i++) {
      output.push(mapLogicFn(arr[i], i));
   }
   return output;
}
```

Let’s understand what this code does and how does this achieves the functionality of the map method.

1. polyfillMap is the name of our polyfill function which provides the same functionality as map. polyfillMap method defined over Array prototype so that it can be used over any array like map method. (Line No: 1)
2. polyfillMap method accepts a callback function called mapLogicFn which would be called over each element of the array. (Line No: 1)
3. map method returns a new array after applying mapLogicFn over each element. So we created a new empty array (output) to store the result. (Line No: 2)
4. We need to iterate over the current array elements. In this context, the value of this will be the array itself. We assigned this to arr for readability purposes. (Line No: 3)
5. output is populated with results from the mapLogicFn. mapLogicFn called with current array element and index of the element as arguments. (Line No: 5)
6. Finally, the output array is returned which is the result of applying the polyfillMap method.

Let’s now see the polyfillMap in action.

```
# map_polyfill_usage.js

const numbers = [1, 2, 3, 4, 5];
const doubledNumbers = numbers.polyfillMap(x => x * 2); // [2, 4, 6, 8, 10]
const anotherArray = numbers.polyfillMap((x, index) => x * index); // [0, 2, 6, 12, 20]
```

You can see we got the same result as applying the map method. 🎉

## Polyfill for filter

If you understand the polyfill for the map method then it would be easy to understand the same for the filter method. Let’s first understand the definition of the filter from MDN.

The filter() method creates a new array with all elements that pass the test implemented by the provided function.

Let’s see some examples.

```
# filter_example.js

const numbers = [1, 2, 3, 4, 5, 6, 7];
const evenNumbers = numbers.filter(x => x % 2 === 0); // [2, 4, 6]
const oddNumbers = numbers.filter(x => x % 2 !== 0 ); // [1, 3, 5, 7]
```

It’s similar to map where filter accepts a callback function which will be executed over each element. If that function returns true, the element will be present in the new returned array.

Following is the basic polyfill implementation for the filter.

```
# filter_polyfill.js

Array.prototype.polyfillFilter = function(filterLogicFn) {
  let output = [], arr = this;
  for (let i = 0; i < arr.length; i++) {
    if (filterLogicFn(arr[i], i)) {
      output.push(arr[i]);
    }
  }
  return output;
}
```

1. polyfillFilter is the name of the polyfill function we are creating. Similar to in map polyfill written earlier, this function accepts a callback filterLogicFn, output array to store the result, and reference to the current array called arr. Same as explained in the case of map. (Line No: 1–2)
2. Here also we need to iterate over the current array (Line No: 3) and evaluate whether the current element passes the test given by the filterLogicFn. If it passes the test, then the current element needs to be added to the output array. (Line No: 4–5)
3. Finally, return the result output array.

Let’s test our polyfill for the filter method.

```
# filter_polyfill_usage.js

const numbers = [1, 2, 3, 4, 5, 6, 7];
const evenNumbers = numbers.polyfillFilter(x => x % 2 === 0); // [2, 4, 6]
const oddNumbers = numbers.polyfillFilter(x => x % 2 !== 0 ); // [1, 3, 5, 7]
```

Again the same result as filter method.

## Polyfill for reduce

reduce method is a little bit different compared to map and filter. It might be confusing at the beginning. Let’s see the MDN definition for reduce.

_The reduce() method executes a user-supplied “reducer” callback function on each element of the array, in order, passing in the return value from the calculation on the preceding element. The final result of running the reducer across all elements of the array is a single value._

Unlike the map and filter, the return value is not an array itself in the case of reduce. It’s a single value.

Let’s see a sample code for reduce method to calculate the sum of all elements of an array.

```
# reduce_example.js

const numbers = [1, 2, 3, 4, 5, 6, 7];
/* accumulator accumulate the sum, curr refer to the current element.
   0 is the initial value of accumulator. */
const sumOfNumbers = numbers.reduce((accumulator, curr) => accumulator + curr, 0);  // 28
```

Following is the basic polyfill implementation for the reduce.

```
# reduce_polyfill.js

Array.prototype.polyfillReduce = function(reduceFn, initialValue) {
  let output = initialValue, arr = this;
  for (let i = 0; i < arr.length; i++) {
    output = reduceFn(output, arr[i], i);
  }
  return output;
}
```

1. polyfillReduce is the name of the polyfill function we are creating. Here the reduce method accepts two parameter. Once is reducer function (reduceFn) and the initial value for the accumulator (initialValue). (Line No: 1)
2. We assign initalValue to output variable.(Line No: 2).
3. Next is iterating over each element and applying the reducer function. The result of the calling reducer function is updated in output. (Line No: 4)

4. Finally, return the output. ( Line No: 6).

As usual, let’s test the new polyfill.

```
# reduce_polyfill_usage.js

const numbers = [1, 2, 3, 4, 5, 6, 7];
const sumOfNumbers = numbers.polyfillReduce((acc, curr) => acc + curr, 0); // 28
```

We have written basic polyfill for map, filter, and reduce. 👏

Hope you gain something out of this article. Thanks for reading 🙂
