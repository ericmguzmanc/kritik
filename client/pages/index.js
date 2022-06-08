import buildClient from '../util/build-client';

const LandingPage = ({ currentUser }) => {
  return currentUser ? (
    <div className='d-flex justify-content-center pt-4'>
      <h1>Your are signed in</h1>
    </div>
  ) : (
    <div className='d-flex justify-content-center pt-4'>
      <h1>You are Not signed in</h1>
    </div>
  )
};

LandingPage.getInitialProps = async (context) => {
  const client = buildClient(context);
  const { data } = await client.get('/api/users/currentuser');
  return data;
};

export default LandingPage;
