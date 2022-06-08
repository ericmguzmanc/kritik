import { useState } from 'react';
import { useRouter } from 'next/router';
import useRequest from '../../hooks/useRequest';

import { authUrls } from '../../constants/api';

const SignUp = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { doRequest, errors } = useRequest({
    url: authUrls.SIGN_IN,
    method: 'post',
    body: {
      email,
      password,
    },
    onSuccess: () => router.push('/'),
  });

  const onSubmit = async (event) => {
    event.preventDefault();

    console.log('onSubmit -> ', email);
    console.log('onSubmit -> ', password);
    doRequest();
  };

  return (
    <div className="d-flex justify-content-center mt-3">
      <form onSubmit={onSubmit} className="flex-column w-25">
        <h4 className="fs-1 text-center">Sign In</h4>
        <div className="form-group my-2">
          <label>Email Address</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="form-control"
          />
        </div>
        <div className="form-group my-2">
          <label>Password</label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="form-control"
            type="password"
          />
        </div>
        {errors}
        <div className="d-flex justify-content-center">
          <button className="btn btn-primary my-2 w-100">Sign In</button>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
