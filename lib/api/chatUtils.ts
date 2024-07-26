export const fetchJWT = async () => {
  try {
    const response = await fetch('/api/login', {
      method: 'POST',
      body: JSON.stringify({
        username: 'clarence',
        password: 'Range-Balloon8-Slowly'
      })
    });

    if (!response.ok) {
      throw new Error('Failed to fetch JWT');
    }

    const data = await response.json();

    return data; // setJwt(data.token);
  } catch (error) {
    console.error('Error fetching JWT:', error);
  }
};

export default fetchJWT;
