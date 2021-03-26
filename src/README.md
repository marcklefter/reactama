# React AMA Code Examples

This repository contains solutions to the questions discussed during the React AMA webinar on March 25th 2021.

## Overview

A description of the code examples are described below.

> To run an example, see `src/index.js`.

### useEffect

Demonstrates how to implement debouncing of user input and subsequent fetching of user data.

There are two versions of this example (select which to run in `src/useEffect/index.js`):

* `App.jsx`

  Implements debouncing with the Lodash debounce function and the `useMemo` hook.

* `App_Rx.jsx`

  Implements debouncing via a reactive style of programming, by using the RxJS library.

### todo

Displays a list of todos and allows the user to create, update and delete todos.

Also computes the "mode" (= the most frequently occurring word) among all todo titles, which may change as todos are created and deleted (updating a todo to mark it as completed does not require recomputing the mode).

In calculating the mode (see `src/todo/hooks.js`), the following issue is raised:

_"I have a dependency in my useEffect dependency list, which isn’t what I actually use (depend on) in my effect callback, and the linter complains."_

Translated to code:

```javascript
// stringArray is a dependency in the effect.
useEffect(() => {  
  // operate on stringArray...
}, [stringArray.length]); 
// only rerun effect when the _length_ of stringArray changes (= when a todo is created or deleted). 
// 
// Linter complains with:
// 
//  React Hook useEffect has a missing dependency: ’stringArray'. Either include it or remove the dependency array react-hooks/exhaustive-deps
```

A possible solution:

```javascript
// the mutable ref variable remains the same across renders, and thus needn't be in the dependency list.
const ref = useRef();
ref.current = stringArray;

useEffect(() => {
  // access stringArray via ref.current...
}, [stringArray.length]);
```

A better approach is introduce a custom hook `useValue` that allows for the following:

```javascript
// access a value (an array) to be used as a dependency in an effect.  
// 
// This hook returns a previously stored value (prevStringArray), until a certain condition is met, in which case the value is updated with a new value (stringArray).
const strings = useValue(
  stringArray, 
  prevStringArray => prevStringArray.length !== stringArray.length
);

useEffect(() => {
  // operate on strings...
}, [strings]);
```

## References

* [The RxJS library](https://rxjs.dev/guide/overview)

* [Diagrams of observables](https://rxmarbles.com)

## Contact

Marc Klefter
marc.klefter@edument.se