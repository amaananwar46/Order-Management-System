import { useEffect, useState } from "react";
import api from "../services/api";

import DashboardStats from "../components/DashboardStats";
import StatusFilter from "../components/StatusFilter";
import OrderForm from "../components/OrderForm";
import OrderTable from "../components/OrderTable";
import SchedulerLogs from "../components/SchedulerLogs";

function Dashboard() {
  const [orders, setOrders] = useState([]);
  const [status, setStatus] = useState("");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const getOrders = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get(
        `/orders?status=${status}&search=${search}&page=${page}`
      );

      setOrders(response.data.orders || []);
      setTotalPages(response.data.totalPages || 1);
    } catch (error) {
      console.error("Error fetching orders:", error);
      setError("Failed to load orders");
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

useEffect(() => {
  const timer = setTimeout(() => {
    getOrders();
  }, 400);

  return () => clearTimeout(timer);
}, [status, search, page]);

  return (
    <div className="min-h-screen bg-slate-100">
      <div className="max-w-7xl mx-auto p-8">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-800">
            Order Management System
          </h1>

          <p className="text-slate-500 mt-2">
            Manage Orders & Scheduler Dashboard
          </p>
        </div>

        {/* Stats */}
        <DashboardStats orders={orders} />

        {/* Filter + Search */}
        <div className="flex flex-col md:flex-row gap-4 items-center mb-4">
          <StatusFilter status={status} setStatus={setStatus} />

          <input
            type="text"
            placeholder="Search by Order ID or Customer"
            className="border p-2 rounded w-full md:w-1/3"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1); // reset page on search
            }}
          />
        </div>

        {/* Create Order */}
        <OrderForm fetchOrders={getOrders} />

        {/* Error */}
        {error && (
          <div className="text-red-500 text-center mb-4">
            {error}
          </div>
        )}

        {/* Orders */}
       {loading ? (
  <div className="text-center py-10 text-slate-500">
    Loading orders...
  </div>
) : (
  <OrderTable orders={orders} fetchOrders={getOrders} />
)}

{/* 👇 YAHAN ADD KARNA HAI */}
{orders.length === 0 && !loading && (
  <div className="text-center text-gray-500 py-10">
    No orders found
  </div>
)}

        {/* Pagination */}
        <div className="flex gap-2 mt-6 justify-center items-center">
          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
          >
            Prev
          </button>

          <span className="px-3 py-1">
            Page {page} of {totalPages}
          </span>

          <button
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
            className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>

        {/* Scheduler Logs */}
        <SchedulerLogs />

      </div>
    </div>
  );
}

export default Dashboard;