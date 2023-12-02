import ReactDOM from "react-dom/client";
import App from "./App";

import { WagmiConfig } from "wagmi";
import { wagmiConfig } from "./wagmi.config";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import "./styles/index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <WagmiConfig config={wagmiConfig}>
    <App />
    <ToastContainer theme="dark" hideProgressBar closeOnClick pauseOnHover />
  </WagmiConfig>
);
