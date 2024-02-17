import "./App.css";
import "./styles/styles.css";
import Layout from "./layout/Layout";
import { ToastContainer } from "react-toastify";
import { Router } from "./routes/Router";
import { useState } from "react";
import useAutoLogin from "./hooks/useAutoLogin";
import { useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [doneAuth, setDoneAuth] = useState(false);
  const autoLogin = useAutoLogin();
  useEffect(() => {
    (async () => {
      try {
        await autoLogin();
      } catch (err) {
        // console.log(err);
      } finally {
        setDoneAuth(true);
      }
    })();
  }, [autoLogin]);

  return (
    <div className="App">
      <Layout>
        <ToastContainer />
        {doneAuth && <Router />}
      </Layout>
    </div>
  );
}

export default App;
