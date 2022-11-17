import "bootstrap/dist/css/bootstrap.min.css";
import "@/styles/globals.scss";
import Layout from "@/components/Layout";
import "@/utils/firebase";
// import ReactGA from 'react-ga;

// export default class MyApp extends App {
//   componentDidMount() {
//     ReactGA.initialize(`${process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID}`);
//     ReactGA.pageview(window.location.pathname + window.location.search);
//   }
// }

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
