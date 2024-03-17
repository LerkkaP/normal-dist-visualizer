// Function to make API call to area_above endpoint
const areaAboveAPI = async (value, mean, sd) => {
    const url = 'http://localhost:8000/area_above'; 
    const data = {
      value: value,
      mean: mean,
      sd: sd
    };
  
    try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    const result = await response.json();
    console.log("Area Above Probability:", result)
  } catch (error) {
    console.error('Error:', error);
  }
  }

const fetchData = async () => {
  const url = 'http://localhost:8000/test';

  try {
      const response = await fetch(url);
      if (!response.ok) {
          throw new Error('Network response was not ok');
      }
      const data = await response.json();
      console.log('Data:', data);
  } catch (error) {
      console.error('Error:', error);
  }
};