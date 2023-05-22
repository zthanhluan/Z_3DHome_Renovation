import { useState, useEffect } from 'react';
import { auth } from './firebase'; // import your firebase auth instance

function UseAuth() {
  const [loggedIn, setLoggedIn] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        setLoggedIn(true);
      } else {
        setLoggedIn(false);
      }
    });
    return unsubscribe;
  }, []);

  return loggedIn;
}

export default UseAuth;