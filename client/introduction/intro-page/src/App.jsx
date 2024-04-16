//This is only used for test purpose
//It is initial phase and do not resemble with correct code

import React, { useState, useEffect } from 'react';

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/");
        console.log(response);
        const refined = await response.json();
        setData(refined);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {data ? (
        <div>
          <h1>{data._id}</h1>
          <p>Name: {data.name}</p>
          <p>Password: {data.role}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default App;
