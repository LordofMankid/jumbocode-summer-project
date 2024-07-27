import { ChatProps } from './chat';

export const fetchJWT = async () => {
  try {
    const response = await fetch('/api/login', {
      method: 'POST',
      body: JSON.stringify({
        username: process.env.CHATGPT_API_USERNAME,
        password: process.env.CHATGPT_API_PASSWORD
      }),
      headers: new Headers({
        'Content-Type': 'application/json',
        Accept: 'application/json'
      })
    });
    if (!response.ok) {
      throw new Error('Failed to fetch JWT');
    }

    const data = await response.json();
    console.log(data);
    return data; // setJwt(data.token);
  } catch (error) {
    console.error('Error fetching JWT:', error);
  }
};

export const getNewPrompt = async (messages: ChatProps[]) => {
  try {
    const strippedMessages = messages.map(({ content, role }) => ({
      role: role === 'user' ? 'user' : 'assistant',
      content
    }));

    const jwt = localStorage.getItem('jwt');

    if (!jwt) {
      throw new Error('No JWT found in localStorage');
    }

    console.log(strippedMessages);
    const response = await fetch('/api/prompt', {
      method: 'POST',
      body: JSON.stringify({ messages: strippedMessages, token: jwt }),
      headers: new Headers({
        'Content-Type': 'application/json',
        Accept: 'application/json'
        // Authorization: `Bearer ${jwt}`
      })
    });

    if (!response.ok) {
      throw new Error('Failed to prompt message');
    }

    const data = await response.json();
    console.log('Response data:', data); // Debug log
    return data;
  } catch (error) {
    console.error('Error:', error);
  }
};
