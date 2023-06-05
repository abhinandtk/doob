import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-icons/font/bootstrap-icons.css';
import '@/styles/home/home.scss'
import 'react-toastify/dist/ReactToastify.css';
// import '@/styles/_form.scss'
import '@/styles/profiles/pros.scss'
import '@/styles/store/store.scss'
import '@/styles/tournament/tour.scss'
import '@/styles/tournament/tour-bracket.scss'
import '@/styles/home/modals.scss'
import { Provider } from 'react-redux';
import { store } from '@/Redux/store';
export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>

      <Component {...pageProps} />
    </Provider>

  )


}

