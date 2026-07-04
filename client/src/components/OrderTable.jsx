import { Link } from "react-router-dom";

function OrderTable({ orders }) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mt-8 overflow-x-auto">
      <h2 className="text-2xl font-semibold mb-5">
        Orders
      </h2>

      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-slate-100">
            <th className="p-3 text-left">Order ID</th>
            <th className="p-3 text-left">Customer</th>
            <th className="p-3 text-left">Phone</th>
            <th className="p-3 text-left">Product</th>
            <th className="p-3 text-left">Amount</th>
            <th className="p-3 text-left">Payment</th>
            <th className="p-3 text-left">Status</th>
            <th className="p-3 text-center">Action</th>
          </tr>
        </thead>

        <tbody>
          {orders.length > 0 ? (
            orders.map((order) => (
              <tr
                key={order._id}
                className="border-b hover:bg-slate-50"
              >
                <td className="p-3">{order.orderId}</td>
                <td className="p-3">{order.customerName}</td>
                <td className="p-3">{order.phone}</td>
                <td className="p-3">{order.productName}</td>
                <td className="p-3">₹{order.amount}</td>

                <td className="p-3">
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
                </td>

                <td className="p-3">
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
                        : order.orderStatus === "DELIVERED"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {order.orderStatus}
                  </span>
                </td>

               <td className="p-3 text-center">
  <Link
    to={`/orders/${order.orderId}`}
    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm transition"
  >
    View
  </Link>
</td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan="8"
                className="text-center p-6 text-gray-500"
              >
                No Orders Found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default OrderTable;