import axios from 'axios';
import { useState } from 'react';

const useRequest = ({ url, method, body, onSuccess }) => {
  // method == post, get, patch, etc..
  const [errors, setErrors] = useState(null);

  const doRequest = async () => {
    try {
      setErrors(null)
      const response = await axios[method](url, body)

      if (onSuccess) {
        onSuccess(response.data)
      }
    
      return response.data
    } catch (err) {
      console.log('err -> ', err)
      setErrors(
        <div className='alert alert-danger my-3'>
          <ul className="my-0">
            {err.response.data.errors.map((err) => (
              <li key={err.message}>{err.message}</li>
            ))}
          </ul>
        </div>
      )
    }
  }

  return { doRequest, errors }

};

export default useRequest;
