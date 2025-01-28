import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';

import { getWeekNumber } from './weeknumber';

const App = () => {
  const [date, setDate] = useState();

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
