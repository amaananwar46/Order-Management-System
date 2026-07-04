function DashboardStats({ orders }) {
  const totalOrders = orders.length;

  const placed = orders.filter(
    (order) => order.orderStatus === "PLACED"
  ).length;

  const processing = orders.filter(
    (order) => order.orderStatus === "PROCESSING"
  ).length;

  const readyToShip = orders.filter(
    (order) => order.orderStatus === "READY_TO_SHIP"
  ).length;

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mb-8">
      <div className="bg-white rounded-xl shadow-md p-5">
        <h3 className="text-gray-500 text-sm">Total Orders</h3>
        <p className="text-3xl font-bold mt-2">{totalOrders}</p>
      </div>

      <div className="bg-blue-100 rounded-xl shadow-md p-5">
        <h3 className="text-blue-700 text-sm">Placed</h3>
        <p className="text-3xl font-bold mt-2">{placed}</p>
      </div>

      <div className="bg-yellow-100 rounded-xl shadow-md p-5">
        <h3 className="text-yellow-700 text-sm">Processing</h3>
        <p className="text-3xl font-bold mt-2">{processing}</p>
      </div>

      <div className="bg-purple-100 rounded-xl shadow-md p-5">
        <h3 className="text-purple-700 text-sm">Ready To Ship</h3>
        <p className="text-3xl font-bold mt-2">{readyToShip}</p>
      </div>
    </div>
  );
}

export default DashboardStats;