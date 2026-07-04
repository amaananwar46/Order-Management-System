import { Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import MainLayout from "./layouts/MainLayout";
import OrderDetails from "./pages/OrderDetails";

function App() {
  return (
    <Routes>

      {/* Layout wrapper */}
      <Route element={<MainLayout />}>
  <Route path="/" element={<Dashboard />} />
  <Route path="/orders/:id" element={<OrderDetails />} />
</Route>

      {/* fallback route */}
      <Route path="*" element={<NotFound />} />

    </Routes>
  );
}

export default App;