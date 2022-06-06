import buildClient from '../util/build-client';

const LandingPage = ({ currentUser }) => {
  return currentUser ? (
    <h1>Your are signed in</h1>
  ) : (
    <h1>You are Not signed in</h1>
  )
};

LandingPage.getInitialProps = async (context) => {
  const client = buildClient(context);
  const { data } = await client.get('/api/users/currentuser');
  return data;
};

export default LandingPage;
