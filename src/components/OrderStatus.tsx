const OrderStatus = ({ status }: { status: number }) => {
  const statusClasses = {
    0: "bg-yellow-500 text-white",
    1: "bg-blue-500 text-white",
    2: "bg-green-500 text-white",
    3: "bg-red-500 text-white",
  };

  const statusLabels: { [key: number]: string } = {
    0: "Pending",
    1: "In Progress",
    2: "Completed",
    3: "Cancelled",
  };

  return (
    <span
      className={`px-2 py-1 rounded-full ${
        statusClasses[status] || "bg-gray-500 text-white"
      }`}
    >
      {statusLabels[status] || "Unknown Status"}
    </span>
  );
};

export default OrderStatus;
