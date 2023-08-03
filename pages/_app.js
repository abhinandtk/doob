import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-icons/font/bootstrap-icons.css';
import '@/styles/home/home.scss'
import 'react-toastify/dist/ReactToastify.css';
// import '@/styles/_form.scss'
import '@/styles/profiles/pros.scss'
import '@/styles/store/store.scss'
import '@/styles/tournament/tour.scss'
import '@/styles/tournament/tourbracket.scss'
import '@/styles/home/modals.scss'
import { Provider } from 'react-redux';
import { store } from '@/Redux/store';
import { ThemeProvider } from 'next-themes';
import { appWithTranslation } from 'next-i18next'
function App({ Component, pageProps }) {

  return (
    <Provider store={store}>
      <ThemeProvider defaultTheme="light" attribute="data-theme" >

        <Component {...pageProps} />
      </ThemeProvider>
    </Provider>

  )
}
export default appWithTranslation(App)

