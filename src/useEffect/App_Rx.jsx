import {
  useEffect,
  useState
} from 'react';

import {
  from,
  merge,
  Subject
} from 'rxjs';

import {
  debounceTime,
  distinctUntilChanged,
  first,
  skip,
  switchMap
} from 'rxjs/operators';

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

const source$ = new Subject()
const merged$ = merge(
  source$.pipe(
    first()
  ),
  source$.pipe(
    skip(1),
    debounceTime(1000),
    distinctUntilChanged()
  )
).pipe(
  switchMap(url => from(apiFetch(url))
));

const getUserUrl = userId => `http://jsonplaceholder.typicode.com/users/${userId}`;

// ...

const User = () => {
  const [
    userId,
    setUserId
  ] = useState(1);

  const [
    userData, 
    setUserData
  ] = useState(undefined);

  useEffect(() => {
    const subscription = merged$.subscribe(userData => setUserData(userData));

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    source$.next(getUserUrl(userId));
  }, [userId]);

  const handleChange = event => {
    const userId = +event.target.value;

    setUserId(userId);
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