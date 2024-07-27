import React, { useCallback, useEffect, useState } from 'react';
import { Chatbox } from '../Chatbox';
import { useAuth } from '@clerk/nextjs';
import { fetchJWT } from '@/lib/api/chatUtils';

export default function Main() {
  const { isLoaded, isSignedIn } = useAuth();
  useEffect(() => {
    (async () => {
      if (isLoaded && isSignedIn) {
        const jwt = await fetchJWT().then((res) => {
          return res.token;
        });

        if (jwt) {
          localStorage.setItem('jwt', jwt);
        }
      }
    })();
  }, [isLoaded, isSignedIn]);

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Chatbot</h1>

      <Chatbox />
    </div>
  );
}
