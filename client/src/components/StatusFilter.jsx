function StatusFilter({ status, setStatus }) {
  return (
    <div className="mb-6">
      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        className="border rounded-lg p-3 bg-white"
      >
        <option value="">All Orders</option>
        <option value="PLACED">Placed</option>
        <option value="PROCESSING">Processing</option>
        <option value="READY_TO_SHIP">Ready To Ship</option>
        <option value="SHIPPED">Shipped</option>
        <option value="DELIVERED">Delivered</option>
        <option value="CANCELLED">Cancelled</option>
      </select>
    </div>
  );
}

export default StatusFilter;