
import React from "react";
import { CheckCircle, Clock, AlertCircle, XCircle } from "lucide-react";

const OrderStatus = ({ status }: { status: number }) => {
  const statusConfig = {
    0: {
      label: "Pending",
      icon: Clock,
      className: "bg-gradient-to-r from-yellow-600 to-yellow-500 text-white shadow-lg shadow-yellow-500/25",
      iconColor: "text-yellow-100"
    },
    1: {
      label: "In Progress", 
      icon: AlertCircle,
      className: "bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-lg shadow-blue-500/25",
      iconColor: "text-blue-100"
    },
    2: {
      label: "Completed",
      icon: CheckCircle,
      className: "bg-gradient-to-r from-green-600 to-green-500 text-white shadow-lg shadow-green-500/25",
      iconColor: "text-green-100"
    },
    3: {
      label: "Cancelled",
      icon: XCircle,
      className: "bg-gradient-to-r from-red-600 to-red-500 text-white shadow-lg shadow-red-500/25",
      iconColor: "text-red-100"
    },
  };

  const config = statusConfig[status] || {
    label: "Unknown Status",
    icon: AlertCircle,
    className: "bg-gradient-to-r from-gray-600 to-gray-500 text-white shadow-lg shadow-gray-500/25",
    iconColor: "text-gray-100"
  };

  const IconComponent = config.icon;

  return (
    <span
      className={`
        inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium
        border border-white/10 backdrop-blur-sm
        transition-all duration-200 hover:scale-105 hover:shadow-xl
        ${config.className}
      `}
    >
      <IconComponent size={14} className={config.iconColor} />
      {config.label}
    </span>
  );
};

export default OrderStatus;
