import React, { useState } from "react";
import { api } from "../utils/api";

const AddProductForm = ({ onProductAdded, onCancel }) => {
  const [formData, setFormData] = useState({
    Product_name: "",
    UOM_Name: "Piece",
    Price_per_unit: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      if (!formData.Product_name.trim()) {
        setError("Product name is required");
        return;
      }
      if (
        !formData.Price_per_unit ||
        parseFloat(formData.Price_per_unit) <= 0
      ) {
        setError("Price must be greater than 0");
        return;
      }

      await api.addProduct({
        Product_name: formData.Product_name.trim(),
        UOM_Name: formData.UOM_Name,
        Price_per_unit: parseFloat(formData.Price_per_unit),
      });

      setFormData({ Product_name: "", UOM_Name: "Piece", Price_per_unit: "" });
      onProductAdded();
    } catch (error) {
      console.error("Error adding product:", error);
      setError("Failed to add product. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    if (error) setError("");
  };

  return (
    <div
      style={{
        background: "rgba(255,255,255,0.5)",
        backdropFilter: "blur(12px)",
        borderRadius: "16px",
        padding: "30px",
        marginBottom: "20px",
        border: "1px solid rgba(0,0,0,0.1)",
        boxShadow: "0 4px 14px rgba(0,0,0,0.08)",
      }}
    >
      <div
        style={{ display: "flex", alignItems: "center", marginBottom: "24px" }}
      >
        <div
          style={{
            width: "60px",
            height: "60px",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "#20b859",
            boxShadow: "0 6px 14px rgba(32,184,89, 0.3)",
            marginRight: "16px",
          }}
        >
          <span style={{ fontSize: "1.5rem", color: "white" }}>➕</span>
        </div>
        <div>
          <h3 style={{ fontSize: "1.75rem", color: "#1a1a1a", margin: 0 }}>
            Add New Product
          </h3>
          <p style={{ fontSize: "1rem", fontWeight: 500, margin: 0 }}>
            Fill in the details below to add a new product to your inventory
          </p>
        </div>
      </div>

      {error && (
        <div
          style={{
            fontFamily: "'Poppins','sans-serif'",
            background: "#ffdddd",
            padding: "10px",
            borderRadius: "8px",
            marginBottom: "20px",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            border: "1px solid #ff9c9c",
          }}
        >
          <span style={{ fontSize: "1.25rem" }}>⚠️</span>
          <span>{error}</span>
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "20px" }}
      >
        <div>
          <label
            style={{
              fontWeight: 600,
              marginBottom: "6px",
              display: "inline-block",
            }}
          >
            <h3>Product Name:</h3>
          </label>
          <input
            style={{
              padding: "12px",
              fontFamily:"'Poppins','sans-serif'",
              border: "1px solid black",
              borderRadius: "10px",
              width: "100%",
            }}
            type="text"
            name="Product_name"
            value={formData.Product_name}
            onChange={handleChange}
            placeholder="Enter product name"
            disabled={isSubmitting}
          />
        </div>

        <div>
          <label
            style={{
              fontWeight: 600,
              marginBottom: "6px",
              display: "inline-block",
            }}
          >
            <h3>Unit of Measure *</h3>
          </label>
          <select
            style={{
              padding: "12px",
              border: "1px solid black",
              borderRadius: "10px",
              width: "100%",
              background: "white",
            }}
            name="UOM_Name"
            value={formData.UOM_Name}
            onChange={handleChange}
            disabled={isSubmitting}
          >
            <option value="Kilogram">Kilogram (kg)</option>
            <option value="Liter">Liter (L)</option>
            <option value="Piece">Piece (pcs)</option>
          </select>
        </div>

        <div>
          <label
            style={{
              fontWeight: 600,
              marginBottom: "6px",
              display: "inline-block",
            }}
          >
            <h3>Price per Unit ($)</h3>
          </label>
          <input
            style={{
              padding: "12px",
              border: "1px solid black",
              borderRadius: "10px",
              width: "100%",
            }}
            type="number"
            name="Price_per_unit"
            value={formData.Price_per_unit}
            onChange={handleChange}
            step="0.01"
            min="0.01"
            placeholder="0.00"
            disabled={isSubmitting}
          />
        </div>

        <div style={{ display: "flex", gap: "12px" }}>
          <button
            style={{
              flex: 1,
              background: "#28c76f",
              color: "white",
              fontSize: "1rem",
              fontWeight: 600,
              padding: "12px 22px",
              borderRadius: "10px",
              border: "none",
              cursor: "pointer",
              letterSpacing: "0.5px",
            }}
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Adding..." : "➕ Add Product"}
          </button>

          <button
            style={{
              flex: 1,
              background: "#f5f5f5",
              color: "black",
              fontSize: "1rem",
              fontWeight: 600,
              padding: "12px 22px",
              borderRadius: "10px",
              border: "1px solid #ccc",
              cursor: "pointer",
              letterSpacing: "0.5px",
            }}
            type="button"
            onClick={onCancel}
            disabled={isSubmitting}
          >
            ✕ Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProductForm;
