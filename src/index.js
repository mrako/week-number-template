import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';

import { getWeekNumber } from './weeknumber';

const App = () => {
  const [date, setDate] = useState();
  const [currentAssetsHash, setCurrentAssetsHash] = useState(null);

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const dateParam = Date.parse(searchParams.get('date'));
    setDate(isNaN(dateParam) ? new Date() : new Date(dateParam));

    const checkForUpdates = async () => {
      try {
        const response = await fetch(window.location.href, {
          cache: 'no-store',
        });
        const text = await response.text();
        const newHash = await crypto.subtle.digest(
          'SHA-256',
          new TextEncoder().encode(text)
        );

        const newHashString = Array.from(new Uint8Array(newHash))
          .map((byte) => byte.toString(16).padStart(2, '0'))
          .join('');

        if (currentAssetsHash && currentAssetsHash !== newHashString) {
          window.location.reload();
        } else {
          setCurrentAssetsHash(newHashString);
        }
      } catch (error) {
        console.error('Error checking for updates:', error);
      }
    };

    const intervalId = setInterval(checkForUpdates, 5000);

    return () => clearInterval(intervalId);
  }, [currentAssetsHash]);

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const dateParam = Date.parse(searchParams.get('date'));

    setDate(isNaN(dateParam) ? new Date() : new Date(dateParam));
  }, []);

  if (date) {
    return <h1>{ getWeekNumber ? getWeekNumber(date) : '-' }</h1>;
  }

  return null;
};

const container = document.getElementById("app");
const root = createRoot(container);
root.render(<App />);
