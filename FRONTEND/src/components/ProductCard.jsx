import React, { useState } from "react";
import { api } from "../utils/api";

const ProductCard = ({ product, onEdit, onDelete }) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const cardStyle = {
    background: "#ffffff",
    border: "1px solid #e5e7eb",
    borderRadius: "12px",
    padding: "16px",
    marginBottom: "14px",
    transition: "box-shadow 0.15s ease, transform 0.15s ease",
  };

  const cardHoverStyle = {
    boxShadow: "0 6px 16px rgba(0,0,0,0.08)",
    transform: "translateY(-2px)",
  };

  const headerStyle = {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "space-between",
    marginBottom: "12px",
  };

  const titleStyle = {
    margin: "0 0 6px 0",
    fontSize: "1.05rem",
    fontWeight: "600",
    color: "#1f2937",
  };

  const uomBadgeStyle = {
    padding: "4px 10px",
    borderRadius: "9999px",
    background: "#eef2ff",
    color: "#3730a3",
    fontSize: "12px",
    fontWeight: "700",
  };

  const priceStyle = {
    fontWeight: 800,
    fontSize: "1rem",
    color: "#111827",
  };

  const priceSubStyle = {
    fontSize: "12px",
    color: "#6b7280",
  };

  const actionsStyle = {
    display: "flex",
    gap: "8px",
    marginTop: "10px",
  };

  const btnStyle = {
    flex: 1,
    padding: "8px 10px",
    borderRadius: "8px",
    fontWeight: "600",
    cursor: "pointer",
    border: "none",
    transition: "background 0.2s ease, transform 0.1s ease",
  };

  const btnEdit = {
    ...btnStyle,
    background: "#f3f4f6",
  };

  const btnDelete = {
    ...btnStyle,
    background: "#fee2e2",
    color: "#b91c1c",
  };

  const [hover, setHover] = useState(false);

  const handleDelete = async () => {
    if (!window.confirm(`Delete "${product.Product_name}"?`)) return;

    setIsDeleting(true);
    try {
      await api.deleteProduct(product.Product_ID);
      onDelete();
    } catch {
      alert("Failed to delete product.");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div
      style={hover ? { ...cardStyle, ...cardHoverStyle } : cardStyle}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div style={headerStyle}>
        <div>
          <h3 style={titleStyle}>{product.Product_name}</h3>

          <div style={{ display: "flex", gap: 8, alignItems: "center", color: "#6b7280" }}>
            <span style={uomBadgeStyle}>
              {product.UOM_Name || `ID: ${product.UOM_ID}`}
            </span>
            <span>•</span>
            <span>ID: {product.Product_ID}</span>
          </div>
        </div>

        <div style={{ textAlign: "right" }}>
          <div style={priceStyle}>₹{parseFloat(product.Price_per_unit).toFixed(2)}</div>
          <div style={priceSubStyle}>per unit</div>
        </div>
      </div>

      <div style={actionsStyle}>
        <button style={btnEdit} onClick={onEdit}>
          ✏️ Edit
        </button>
        <button style={btnDelete} onClick={handleDelete} disabled={isDeleting}>
          {isDeleting ? "Deleting..." : "🗑️ Delete"}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
