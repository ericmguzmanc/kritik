import axios from 'axios';

const buildClient = ({ req }) => {
  // We are on the server
  if (typeof window === 'undefined') {
    return axios.create({
      baseURL: process.env.BASE_URL,
      headers: req.headers,
    });
  } else {
    // We are on the browser
    return axios.create({
      baseURL: '/',
    });
  }
};

export default buildClient;
