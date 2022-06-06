import 'bootstrap/dist/css/bootstrap.css'
import buildClient from '../util/build-client'
import Header from '../components/header'

import * as apiConstants from '../constants/api'


const AppComponent = ({ Component, pageProps, currentUser }) => {
  return (
    <div>
      <Header currentUser={currentUser}/>
      <Component { ...pageProps } />
    </div>
  )
}

AppComponent.getInitialProps = async (appContext) => {
  // ! This is not working, investigate the best way to do handle constans in nextjs.
  console.log("🚀 ~ file: _app.js ~ line 20 ~ AppComponent.getInitialProps= ~ CURRENT_USER", apiConstants.CURRENT_USER) 
  const client = buildClient(appContext.ctx)
  const { data } = await client.get('/api/users/currentuser')
  console.log("🚀 ~ file: _app.js ~ line 20 ~ AppComponent.getInitialProps= ~ data", data)
  // This way we call the getInitialProps from the landing pageProps, its going to 
  // run server setImmediate, not browser, this is going to run for every component 
  // since its in the appComponent
  let pageProps = {}
  if (appContext.Component.getInitialProps) {
    // Some components dont have getInitialProps
    pageProps = await appContext.Component.getInitialProps(appContext.ctx)
  }

  return {
    pageProps,
    ...data,
  }
}

export default AppComponent
