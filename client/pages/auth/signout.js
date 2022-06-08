import { useEffect } from 'react';
import { useRouter } from 'next/router';
import useRequest from '../../hooks/useRequest';
import { authUrls } from '../../constants/api';

const SignOut = () => {
  const router = useRouter();

  const { doRequest } = useRequest({
    url: authUrls.SIGN_OUT,
    method: 'post',
    body: {},
    onSuccess: () => router.push('/'),
  });

  useEffect(() => {
    doRequest();
  }, []);

  return (
    <div className='d-flex justify-content-center'>
      <p className='fs-2 mt-4'>Signing you out...</p>
    </div>
  );
};

export default SignOut;
