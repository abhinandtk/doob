import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "@/styles/home/home.scss";
import "react-toastify/dist/ReactToastify.css";
// import '@/styles/_form.scss'
import "@/styles/profiles/pros.scss";
import "@/styles/store/store.scss";
import "@/styles/tournament/tour.scss";
import "@/styles/tournament/tourbracket.scss";
import "@/styles/home/modals.scss";
import { Provider } from "react-redux";
import { store } from "@/Redux/store";
import { ThemeProvider, useTheme } from "next-themes";
import { appWithTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { useEffect } from "react";
function App({ Component, pageProps }) {
  const router = useRouter();
  const { theme } = useTheme();

  // Set the lang attribute based on the selected locale
  useEffect(() => {
    document.documentElement.lang = router.locale || "en";
    document.documentElement.style.setProperty("color-scheme", theme === "dark" ? "white" : "black");
  }, [router.locale, theme]);

  return (
    <Provider store={store}>
      <ThemeProvider defaultTheme="light" attribute="data-theme">
        <Component {...pageProps} />
      </ThemeProvider>
    </Provider>
  );
}
export default appWithTranslation(App);
