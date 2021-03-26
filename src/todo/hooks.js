import {
  useState,
  useEffect,
  useRef
} from 'react';

import _ from 'lodash';

import {
  mode
 } from "./mode";

// ...
// Custom hook for storing and using a value, until a certain condition is fulfilled, after which the value is updated.
function useValue(newValue, valueChanged) {
  const valueRef  = useRef();
  const changed   = valueChanged(valueRef.current ?? [], newValue);
  
  useEffect(() => {
    changed && (valueRef.current = newValue);
  });

  return changed ? newValue : valueRef.current;
}

export function useMode(stringArray) {
  const [mfw, setMfw] = useState(null);

  const strings = useValue(
    stringArray, 
    prevStringArray => prevStringArray.length !== stringArray.length
  );

  useEffect(() => {
    console.log('Computing mode.')
    
    const words = _.flatten(
      strings.reduce((words, word) => {
        return [...words, word.split(' ')];
      }, [])
    );
  
    setMfw(mode(words));
  }, [strings]);

  return mfw;
}