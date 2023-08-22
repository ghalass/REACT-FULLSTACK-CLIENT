import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import NavBar from "../../components/NavBar";
import { Outlet } from "react-router-dom";

export default function RootLayout() {
  return (
    <div>
      <header>
        <NavBar />
      </header>
      <main>
        <div className="text-left">
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={true}
            closeOnClick={true}
            rtl={false}
            pauseOnHover={false}
            pauseOnFocusLoss={false}
            draggable={false}
            progress={undefined}
            theme="light"
          />
        </div>

        <Outlet />
      </main>
    </div>
  );
}
