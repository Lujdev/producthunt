import "../styles/app.css";
import firebase, { FirebaseContext } from "../firebase";
import useAutenticacion from "../hooks/useAutenticacion";
import { RecoilRoot } from "recoil";

function MyApp({ Component, pageProps }) {
  const usuario = useAutenticacion();

  return (
    <FirebaseContext.Provider
      value={{
        firebase,
        usuario
      }}
    >
      <RecoilRoot>
        <Component {...pageProps} />
      </RecoilRoot>
    </FirebaseContext.Provider>
  );
}

export default MyApp;
