import {
  useState,
  useEffect,
  useMemo
} from 'react';

import _ from 'lodash';

import {
  apiFetch
} from './util';

// ...

const baseStyle = {
  textAlign: 'center'
};

const inputStyle = {
  ...baseStyle,
  marginBottom: 20
};

// ...
// Alternative to memoizing setUser within the component. 
// 
// const setUser = _.debounce(
//   (resource, setResource) => setResource(resource),
//   1000
// );

// ...

const getUserUrl = userId => `http://jsonplaceholder.typicode.com/users/${userId}`;

const User = () => {
  const [
    userId, 
    setUserId
  ] = useState(1);
  
  const [
    resource,
    setResource
  ] = useState(getUserUrl(userId));

  const [
    userData, 
    setUserData
  ] = useState(undefined);

  useEffect(() => {
    apiFetch(resource).then(userData => setUserData(userData));
  }, [resource]);

  const setUser = useMemo(
    () => _.debounce(resource => setResource(resource), 1000), 
    []
  );

  const handleChange = event => {
    const userId = +event.target.value;

    setUserId(userId);

    // debounce updating the resource (URL) state.
    //
    // Note: If using the setUser version defined outside the component, call it as follows:
    //
    //  setUser(getUserUrl(userId), setResource);
    setUser(getUserUrl(userId));
  };

  // ...

  return (
    <>
      <div style={inputStyle}>
        <input
          type="number"
          value={userId}
          onChange={handleChange}
        />
      </div>

      <div style={baseStyle}>
        {userData?.name}
      </div>
    </>
  )
}

// ...

export const App = () => {
  return <User />
};