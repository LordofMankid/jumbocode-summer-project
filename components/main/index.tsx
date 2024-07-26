import React, { useCallback, useEffect, useState } from 'react';
import { Chatbox } from '../Chatbox';
import { useAuth } from '@clerk/nextjs';
import fetchJWT from '@/lib/api/chatUtils';

export default function Main() {
  const { isLoaded, isSignedIn } = useAuth();
  const [jwt, setJWT] = useState<string>('');
  // useEffect(() => {
  //   (async () => {
  //     if (isLoaded && isSignedIn) {
  //       const jwt = fetch(
  //         'https://tl-onboarding-project-dxm7krgnwa-uc.a.run.app/login',
  //         {
  //           method: 'POST',
  //           headers: {
  //             'Content-Type': 'application/json'
  //           },
  //           body: JSON.stringify({
  //             username: 'clarence',
  //             password: 'Range-Balloon8-Slowly'
  //           })
  //         }
  //       )
  //         .then((res) => {
  //           if (!res.ok) {
  //             throw new Error(`Network response was not ok: ${res.statusText}`);
  //           }
  //           return res.json();
  //         })
  //         .then((data) => {
  //           setJWT(data.token);
  //           console.log(data.token);
  //           // Only set localStorage if in the browser environment
  //           window.localStorage.setItem('jwt', data.token);

  //           return data.token;
  //         })
  //         .catch((error) => {
  //           console.error('Fetch error:', error);
  //         });
  //     }
  //   })();
  // }, [isLoaded, isSignedIn]);

  // fetch('https://tl-onboarding-project-dxm7krgnwa-uc.a.run.app/login', {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json'
  //   },
  //   body: JSON.stringify({
  //     username: 'clarence',
  //     password: 'Range-Balloon8-Slowly'
  //   })
  // })
  //   .then((res) => {
  //     if (!res.ok) {
  //       throw new Error(`Network response was not ok: ${res.statusText}`);
  //     }
  //     return res.json();
  //   })
  //   .then((data) => {
  //     setJWT(data.token);
  //     console.log(data.token);
  //     // Only set localStorage if in the browser environment
  //     window.localStorage.setItem('jwt', data.token);

  //     return data.token;
  //   })
  //   .catch((error) => {
  //     console.error('Fetch error:', error);
  //   });

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Chatbot {jwt}</h1>

      <Chatbox />
    </div>
  );
}
