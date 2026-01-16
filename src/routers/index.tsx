import { lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Layout from "@/components/Layout";

// Lazy load page components
const Home = lazy(() => import("@/pages/Home"));
const History = lazy(() => import("@/pages/History"));
const NotFound = lazy(() => import("@/pages/NotFound"));

// Main route configuration
const AppRoutes = () => (
  <Routes>
    <Route element={<Layout />}>
      <Route path="/" element={<Home />} />
      <Route path="/history" element={<History />} />
      <Route path="/setting" element={<Navigate to="/history?tab=settings" replace />} />
      <Route path="/setting/*" element={<Navigate to="/history?tab=settings" replace />} />
    </Route>
    <Route path="*" element={<NotFound />} />
  </Routes>
);

export default AppRoutes;