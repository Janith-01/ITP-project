import logo from "./logo.svg";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import PageNotFound from "./components/pagenotfound";
import Viewallusers from "./components/dashboard/user/viewallusers";
import Home from "./components/home";
import Customersignup from "./components/customersignup";
import Dashboardhome from "./components/dashboard/dashboardhome";
import { UserProvider } from "./components/provider/userprovider";
import Profile from "./components/dashboard/profile";
import Customerhome from "./components/customer/customerhome";

const router = createBrowserRouter([
  { path: "/", element: <Home></Home> },
  { path: "/customersignin", element: <Customersignup></Customersignup> },
  { path: "/dashboard", element: <Dashboardhome></Dashboardhome> },
  { path: "/dashboard/users", element: <Viewallusers></Viewallusers> },
  { path: "/dashboard/profile", element: <Profile></Profile> },
  { path: "/customer/home", element: <Customerhome></Customerhome> },
  { path: "*", element: <PageNotFound /> },
]);

function App() {
  return (
    <main>
      <UserProvider>
        <RouterProvider router={router}></RouterProvider>
      </UserProvider>
    </main>
  );
}

export default App;
