import React, { useState } from "react";
import EditProductForm from "./EditProductForm";
import { api } from "../utils/api";

const LandingPage = ({ products, onProductUpdated, onProductDeleted, onShowFullView }) => {
  const [editingProduct, setEditingProduct] = useState(null);
  const [showAll, setShowAll] = useState(false);

  if (products.length === 0) {
    return (
      <div
        style={{
          textAlign: "center",
          padding: "40px 20px",
          minHeight: "60vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            fontSize: "4rem",
            marginBottom: "20px",
          }}
        >
          🛒
        </div>
        <h1 style={{ fontSize: "2rem", marginBottom: "12px", fontWeight: 700 }}>
          Grocery Store Management
        </h1>
        <p style={{ fontSize: "1.1rem", color: "#6b7280", marginBottom: "20px" }}>
          No products available yet.
        </p>
      </div>
    );
  }

  const displayProducts = showAll ? products : products.slice(0, 6);

  return (
    <div style={{ padding: "20px 12px" }}>
      <div
        style={{
          textAlign: "center",
          marginBottom: "30px",
        }}
      >
        <h1
          style={{
            fontSize: "2.5rem",
            fontWeight: 700,
            marginBottom: "8px",
            color: "#1f2937",
          }}
        >
          🛒 Grocery Store Management
        </h1>
        <p style={{ fontSize: "1.1rem", color: "#6b7280", marginBottom: "16px" }}>
          Total Products: <strong>{products.length}</strong>
        </p>
        <button
          onClick={() => setShowAll(!showAll)}
          style={{
            background: showAll ? "#f3f4f6" : "#28c76f",
            color: showAll ? "#1f2937" : "white",
            fontSize: "1rem",
            fontWeight: 600,
            padding: "10px 20px",
            borderRadius: "8px",
            border: showAll ? "1px solid #d1d5db" : "none",
            cursor: "pointer",
            marginRight: "8px",
          }}
        >
          {showAll ? "Show Less" : "View All Products"}
        </button>
        <button
          onClick={() => {
            if (onShowFullView) {
              onShowFullView();
            }
          }}
          style={{
            background: "#3b82f6",
            color: "white",
            fontSize: "1rem",
            fontWeight: 600,
            padding: "10px 20px",
            borderRadius: "8px",
            border: "none",
            cursor: "pointer",
          }}
        >
          📊 Full Management View
        </button>
      </div>

      {editingProduct && (
        <div style={{ marginBottom: "20px" }}>
          <EditProductForm
            product={editingProduct}
            onProductUpdated={() => {
              onProductUpdated();
              setEditingProduct(null);
            }}
            onCancel={() => setEditingProduct(null)}
          />
        </div>
      )}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
          gap: "16px",
        }}
      >
        {displayProducts.map((product) => (
          <div
            key={product.Product_ID}
            onClick={() => setEditingProduct(product)}
            style={{
              background: "#ffffff",
              border: "1px solid #e5e7eb",
              borderRadius: "12px",
              padding: "16px",
              cursor: "pointer",
              transition: "all 0.2s ease",
              boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = "0 6px 16px rgba(0,0,0,0.12)";
              e.currentTarget.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = "0 2px 4px rgba(0,0,0,0.05)";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "space-between",
                marginBottom: "12px",
              }}
            >
              <div style={{ flex: 1 }}>
                <h3
                  style={{
                    margin: "0 0 8px 0",
                    fontSize: "1.1rem",
                    fontWeight: 600,
                    color: "#1f2937",
                  }}
                >
                  {product.Product_name}
                </h3>
                <div
                  style={{
                    display: "flex",
                    gap: "8px",
                    alignItems: "center",
                    color: "#6b7280",
                    fontSize: "0.9rem",
                  }}
                >
                  <span
                    style={{
                      padding: "4px 10px",
                      borderRadius: "9999px",
                      background: "#eef2ff",
                      color: "#3730a3",
                      fontSize: "12px",
                      fontWeight: 700,
                    }}
                  >
                    {product.UOM_Name || `ID: ${product.UOM_ID}`}
                  </span>
                  <span>•</span>
                  <span>ID: {product.Product_ID}</span>
                </div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div
                  style={{
                    fontWeight: 800,
                    fontSize: "1.1rem",
                    color: "#111827",
                  }}
                >
                  ₹{parseFloat(product.Price_per_unit).toFixed(2)}
                </div>
                <div style={{ fontSize: "12px", color: "#6b7280" }}>per unit</div>
              </div>
            </div>

            <div
              style={{
                marginTop: "12px",
                paddingTop: "12px",
                borderTop: "1px solid #e5e7eb",
                display: "flex",
                gap: "8px",
              }}
            >
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setEditingProduct(product);
                }}
                style={{
                  flex: 1,
                  padding: "8px 10px",
                  borderRadius: "6px",
                  fontWeight: 600,
                  cursor: "pointer",
                  border: "none",
                  background: "#f3f4f6",
                  color: "#1f2937",
                }}
              >
                ✏️ Edit
              </button>
              <button
                onClick={async (e) => {
                  e.stopPropagation();
                  if (
                    window.confirm(`Delete "${product.Product_name}"?`)
                  ) {
                    try {
                      await api.deleteProduct(product.Product_ID);
                      onProductDeleted();
                    } catch {
                      alert("Failed to delete product.");
                    }
                  }
                }}
                style={{
                  flex: 1,
                  padding: "8px 10px",
                  borderRadius: "6px",
                  fontWeight: 600,
                  cursor: "pointer",
                  border: "none",
                  background: "#fee2e2",
                  color: "#b91c1c",
                }}
              >
                🗑️ Delete
              </button>
            </div>
            <div
              style={{
                marginTop: "8px",
                fontSize: "12px",
                color: "#9ca3af",
                textAlign: "center",
              }}
            >
              Click card to edit
            </div>
          </div>
        ))}
      </div>

      {!showAll && products.length > 6 && (
        <div style={{ textAlign: "center", marginTop: "24px" }}>
          <p style={{ color: "#6b7280", marginBottom: "12px" }}>
            Showing 6 of {products.length} products
          </p>
        </div>
      )}
    </div>
  );
};

export default LandingPage;

