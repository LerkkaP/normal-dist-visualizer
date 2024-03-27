const baseUrl = "http://localhost:8000"

/**
 * Function to make API requests to calculate area above a certain value
 * @param {number} value - The value for which to calculate the area above
 * @param {number} mean - Mean value for the distribution
 * @param {number} sd - Standard deviation for the distribution
 */
const areaAbove = async (value, mean, sd) => {
  const url = `${baseUrl}/area_above`;
  const data = { value, mean, sd }

  try {
    const result = await makeRequest(url, data);
    console.log("Area above probability:", result);
  } catch (error) {
    console.error('Error calculating area above:', error);
  }
}

/**
 * Function to make API requests to calculate area below a certain value
 * @param {number} value - The value for which to calculate the area below
 * @param {number} mean - Mean value for the distribution
 * @param {number} sd - Standard deviation for the distribution
 */
const areaBelow = async (value, mean, sd) => { 
  const url = `${baseUrl}/area_below`;
  const data = { value, mean, sd }

  try {
    const result = await makeRequest(url, data);
    console.log("Area below probability:", result);
  } catch (error) {
    console.error('Error calculating area above:', error);
  }
}

/**
 * Function to make API requests to calculate area between two values
 * @param {number} value_lower - Lower value for the area calculation
 * @param {number} value_upper - Upper value for the area calculation
 * @param {number} mean - Mean value for the distribution
 * @param {number} sd - Standard deviation for the distribution
 */
const areaBetween = async (value_lower, value_upper, mean, sd) => { 
  const url = `${baseUrl}/area_between`;
  const data = {value_lower, value_upper, mean, sd}

  try {
    const result = await makeRequest(url, data);
    console.log("Area between Probability:", result);
  } catch (error) {
    console.error('Error calculating area above:', error);
  }
}

/**
 * Function to make API requests to generate data for plotting
 * @param {number} sampleSize - Lower value for the area calculation
 */
export const generateData = async (sampleSize) => { 
  const url = `${baseUrl}/generate_data`;
  const data = {sampleSize}

  try {
    const result = await makeRequest(url, data);
    const parsedResult = JSON.parse(result).map(entry => ({
      q: entry.q[0], 
      p: entry.p[0]
    }));
    return parsedResult
  } catch (error) {
    console.error('Error in generating data:', error);
  }
}

const makeRequest = async (url, data) => {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  })

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  return response.json()
}