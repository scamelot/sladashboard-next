import '../styles/globals.css'
import { UserProvider } from '@auth0/nextjs-auth0/client'
import Nav from '../components/Nav'
function MyApp({ Component, pageProps }) {
  return (
  <UserProvider>
    <Nav />
    <Component {...pageProps} />
  </UserProvider>
  )
}

export default MyApp
