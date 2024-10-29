
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Suppliers from "./pages/Suppliers";
import Items from "./pages/Items";
import PurchaseOrders from "./pages/PurchaseOrders";
import Layout from "./components/Layout";
import { Toaster } from "react-hot-toast";
import ScrollToTop from "./components/ScrollToTop";
import CreateOrder from "./pages/CreateOrder";
import CreateItem from "./pages/CreatItem";


const App = () => {


  return (
    <>
      <Toaster />
      <Router>
        <ScrollToTop />
        <div className="flex h-screen overflow-hidden ">
          <Layout>
            <div className="flex p-4 ">
              <Routes>
                <Route path="/suppliers" element={<Suppliers />} />
                <Route path="/items" element={<Items />} />
                <Route path="/items/create" element={<CreateItem />} />
                <Route path="/purchase-orders" element={<PurchaseOrders />} />
                <Route path="/purchase-orders/add" element={<CreateOrder />} />

              </Routes>
            </div>
          </Layout>
        </div>
      </Router> 
    </>
  );
};

export default App;
