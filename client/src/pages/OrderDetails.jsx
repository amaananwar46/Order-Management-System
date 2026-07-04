import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../services/api";

function OrderDetails() {
  const { id } = useParams();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [history, setHistory] = useState([]);

useEffect(() => {
  const getOrder = async () => {
    try {
      setLoading(true);

      const [orderRes, historyRes] = await Promise.all([
        api.get(`/orders/${id}`),
        api.get(`/orders/${id}/history`)
      ]);

      setOrder(orderRes.data.order);
      setHistory(historyRes.data.history || []);
    } catch (err) {
      console.error(err);
      setError("Failed to load order.");
    } finally {
      setLoading(false);
    }
  };

  getOrder();
}, [id]);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto p-8">
        <p className="text-center text-slate-500">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto p-8">
        <p className="text-center text-red-500">{error}</p>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="max-w-4xl mx-auto p-8">
        <p className="text-center">Order not found.</p>
      </div>
    );
  }

return (
  <div className="min-h-screen bg-slate-100 py-10">

    {/* Order Details Card */}
    <div className="max-w-4xl mx-auto bg-white rounded-xl shadow p-8">

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">
          Order Details
        </h1>

        <Link
          to="/"
          className="bg-slate-800 text-white px-4 py-2 rounded hover:bg-slate-700"
        >
          Back
        </Link>
      </div>

      <div className="grid md:grid-cols-2 gap-6">

        <div>
          <p className="text-gray-500">Order ID</p>
          <h3 className="font-semibold">{order.orderId}</h3>
        </div>

        <div>
          <p className="text-gray-500">Customer</p>
          <h3 className="font-semibold">{order.customerName}</h3>
        </div>

        <div>
          <p className="text-gray-500">Phone</p>
          <h3 className="font-semibold">{order.phone}</h3>
        </div>

        <div>
          <p className="text-gray-500">Product</p>
          <h3 className="font-semibold">{order.productName}</h3>
        </div>

        <div>
          <p className="text-gray-500">Amount</p>
          <h3 className="font-semibold">₹{order.amount}</h3>
        </div>

        <div>
          <p className="text-gray-500">Payment Status</p>

          <span
            className={`px-3 py-1 rounded-full text-sm font-medium ${
              order.paymentStatus === "PAID"
                ? "bg-green-100 text-green-700"
                : order.paymentStatus === "FAILED"
                ? "bg-red-100 text-red-700"
                : "bg-yellow-100 text-yellow-700"
            }`}
          >
            {order.paymentStatus}
          </span>
        </div>

        <div>
          <p className="text-gray-500">Order Status</p>

          <span
            className={`px-3 py-1 rounded-full text-sm font-medium ${
              order.orderStatus === "PLACED"
                ? "bg-blue-100 text-blue-700"
                : order.orderStatus === "PROCESSING"
                ? "bg-yellow-100 text-yellow-700"
                : order.orderStatus === "READY_TO_SHIP"
                ? "bg-purple-100 text-purple-700"
                : order.orderStatus === "SHIPPED"
                ? "bg-indigo-100 text-indigo-700"
                : "bg-green-100 text-green-700"
            }`}
          >
            {order.orderStatus}
          </span>
        </div>

        <div>
          <p className="text-gray-500">Created At</p>
          <h3 className="font-semibold">
            {new Date(order.createdAt).toLocaleString()}
          </h3>
        </div>

      </div>
    </div>

    {/* Order History */}
    <div className="max-w-4xl mx-auto bg-white rounded-xl shadow p-8 mt-6">

      <h2 className="text-2xl font-bold mb-5">
        Order History
      </h2>

      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-slate-100">
            <th className="p-3 text-left">From Status</th>
            <th className="p-3 text-left">To Status</th>
            <th className="p-3 text-left">Changed By</th>
            <th className="p-3 text-left">Changed At</th>
          </tr>
        </thead>

        <tbody>
          {history.length > 0 ? (
            history.map((item) => (
              <tr
                key={item._id}
                className="border-b hover:bg-slate-50"
              >
                <td className="p-3">{item.fromStatus}</td>
                <td className="p-3">{item.toStatus}</td>
                <td className="p-3">{item.changedBy}</td>
                <td className="p-3">
                  {new Date(item.changedAt).toLocaleString()}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan="4"
                className="text-center p-6 text-gray-500"
              >
                No History Found
              </td>
            </tr>
          )}
        </tbody>
      </table>

    </div>

  </div>
);
}

export default OrderDetails;