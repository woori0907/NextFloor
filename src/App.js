import Navbar from "./components/Navbar";
import { Outlet } from "react-router-dom";
import { AuthContextProvider } from "./context/AuthContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TiArrowUpThick } from "react-icons/ti";
import { useRef } from "react";
import Footer from "./components/Footer";

const queryClient = new QueryClient();

function App() {
  const home = useRef();
  const handleUpClick = () => {
    home.current.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
        <div id="Home" ref={home}></div>
        <Navbar />
        <Outlet />
        <button
          className="fixed right-9 bottom-9 w-16 h-16 rounded-full drop-shadow-xl bg-white text-2xl text-brand flex justify-center items-center
         hover:bg-brand hover:text-white hover:transition-colors duration-500"
          onClick={handleUpClick}
        >
          <TiArrowUpThick className="shrink-0" />
        </button>
        <Footer />
      </AuthContextProvider>
    </QueryClientProvider>
  );
}

export default App;
