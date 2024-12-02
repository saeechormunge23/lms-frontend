import React from "react";
import { Routes, Route } from "react-router-dom";
import OffersContent from "../Offers/OffersContent";
import Layout from "../Common/Layout";
import FormikForm from "../Offers/FormicForm";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="offers" element={<OffersContent />} />
        <Route path="offers/add" element={<FormikForm />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
