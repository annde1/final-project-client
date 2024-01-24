import "./App.css";
import "./styles/styles.css";
import Layout from "./layout/Layout";
import { ToastContainer } from "react-toastify";
import { Router } from "./routes/Router";
function App() {
  return (
    <div className="App">
      <Layout>
        <Router />
      </Layout>
    </div>
  );
}

export default App;
