import { Button, ConfigProvider, Space } from "antd";
import React from "react";
import { Routes, Route } from "react-router-dom";

import SignIn from "./Pages/Auth/SignIn";
import SignUp from "./Pages/Auth/SignUp";
import Dashboard from "./Pages/Dashboard/Dashboard";
import CreateProduct from "./Pages/Product/CreateProduct/CreateProduct";
import UpdateProduct from "./Pages/Product/UpdateProductStatus/UpdateProduct";
import ViewProduct from "./Pages/Product/ViewProduct/ViewProduct";
import CreateDelivery from "./Pages/Delivery/CreateDelivery/CreateDelivery";
import UpdateDeliveryStatus from "./Pages/Delivery/UpdateDeliveryStatus/UpdateDeliveryStatus";
import UpdateTransport from "./Pages/Delivery/UpdateTransport/UpdateTransport";
import UpdateShipment from "./Pages/Delivery/UpdateShipment/UpdateShipment";
import UpdateDelivery from "./Pages/Delivery/UpdateDelivery/UpdateDelivery";
import UpdateLocation from "./Pages/Delivery/UpdateLocation/UpdateLocation";
import ViewDelivery from "./Pages/Delivery/ViewDelivery/ViewDelivery";
import RegulatorDashboard from "./Pages/RegulatorDashboard/RegulatorDashboard";
import ViewProductRegulator from "./Pages/ProductRegulator/ViewProduct/ViewProduct";
import ViewDeliveryRegulator from "./Pages/DeliveryRegulator/ViewDelivery/ViewDeliveryRegulator";
import FillNumberOfPackages  from "./Pages/User/FillNumberOfPackages";
import CheckStockAndNotifyForm from "./Pages/Stock/CheckStockAndNotifyForm";
const App = () => (
  <ConfigProvider
    theme={{
      token: {
        // Seed Token
        colorPrimary: "#00b96b",
        borderRadius: 2,

        // Alias Token
        colorBgContainer: "#f6ffed"
      }
    }}
  >
    <Routes>
      <Route path="/" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/create-product" element={<CreateProduct />} />
      <Route path="/update-product" element={<UpdateProduct />} />
      <Route path="/view-product" element={<ViewProduct />} />
      <Route path="/create-delivery" element={<CreateDelivery />} />
      <Route path="/update-delivery" element={<UpdateDeliveryStatus />} />
      <Route path="/update-transport" element={<UpdateTransport />} />
      <Route path="/update-shipment-date" element={<UpdateShipment />} />
      <Route path="/update-delivery-status" element={<UpdateDeliveryStatus />} />
      <Route path="/update-location" element={<UpdateLocation />} />
      <Route path="/update-delivery-date" element={<UpdateDelivery />} />
      <Route path="/regulator-dashboard" element={<RegulatorDashboard />} />
      <Route path="/view-product-regulator" element={<ViewProductRegulator />} />
      <Route path="/view-delivery-regulator" element={<ViewDeliveryRegulator />} />
      <Route path="/fill-packages" element={<FillNumberOfPackages />} />
      <Route path="/check-stock" element={<CheckStockAndNotifyForm />} />
      
      <Route path="/view-delivery" element={<ViewDelivery />} />
    </Routes>
  </ConfigProvider>
);

export default App;
