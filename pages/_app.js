import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-icons/font/bootstrap-icons.css';
import '@/styles/home/home.scss'
import 'react-toastify/dist/ReactToastify.css';
// import '@/styles/_form.scss'
import '@/styles/profiles/pros.scss'
import '@/styles/store/store.scss'
import '@/styles/tournament/tour.scss'
import '@/styles/home/modals.scss'
export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />
  
}

