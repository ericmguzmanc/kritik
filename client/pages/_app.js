import 'bootswatch/dist/litera/bootstrap.css'
import buildClient from '../util/build-client'
import Header from '../components/header'

import { authUrls } from '../constants/api'


const AppComponent = ({ Component, pageProps, currentUser }) => {
  return (
    <div>
      <Header currentUser={currentUser}/>
      <Component { ...pageProps } />
    </div>
  )
}

AppComponent.getInitialProps = async (appContext) => {
  const client = buildClient(appContext.ctx)
  const { data } = await client.get(authUrls.CURRENT_USER)
  // console.log('🚀 ~ file: _app.js ~ line 19 ~ AppComponent.getInitialProps= ~ client', client)
  console.log("🚀 ~ file: _app.js ~ line 20 ~ AppComponent.getInitialProps= ~ data", data)
  console.log("🚀 ~ file: _app.js ~ line 20 ~ typeof window", typeof window)
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
