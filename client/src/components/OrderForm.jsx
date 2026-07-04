import { useState } from "react";
import api from "../services/api";

function OrderForm({ fetchOrders }) {
  const [formData, setFormData] = useState({
    customerName: "",
    phone: "",
    productName: "",
    amount: "",
    paymentStatus: "PENDING",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/orders/createOrder", formData);

      alert("Order Created Successfully");

      setFormData({
        customerName: "",
        phone: "",
        productName: "",
        amount: "",
        paymentStatus: "PENDING",
      });

      fetchOrders();
    } catch (error) {
      alert(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
      <h2 className="text-2xl font-semibold mb-6">
        Create New Order
      </h2>

      <form
        onSubmit={handleSubmit}
        className="grid md:grid-cols-2 gap-5"
      >
        <input
          type="text"
          name="customerName"
          placeholder="Customer Name"
          value={formData.customerName}
          onChange={handleChange}
          className="border rounded-lg p-3"
        />

        <input
          type="text"
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
          className="border rounded-lg p-3"
        />

        <input
          type="text"
          name="productName"
          placeholder="Product Name"
          value={formData.productName}
          onChange={handleChange}
          className="border rounded-lg p-3"
        />

        <input
          type="number"
          name="amount"
          placeholder="Amount"
          value={formData.amount}
          onChange={handleChange}
          className="border rounded-lg p-3"
        />

        <select
          name="paymentStatus"
          value={formData.paymentStatus}
          onChange={handleChange}
          className="border rounded-lg p-3"
        >
          <option value="PENDING">PENDING</option>
          <option value="PAID">PAID</option>
          <option value="FAILED">FAILED</option>
        </select>

        <button
          type="submit"
          className="bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Create Order
        </button>
      </form>
    </div>
  );
}

export default OrderForm;