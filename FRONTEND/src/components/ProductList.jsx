import React, { useState } from "react";
import ProductCard from "./ProductCard";
import EditProductForm from "./EditProductForm";

const ProductList = ({ products, onProductUpdated, onProductDeleted }) => {
  const [editingProduct, setEditingProduct] = useState(null);

  if (products.length === 0) {
    return (
      <div style={{ textAlign: "center", padding: "24px 0" }}>
        <div
          style={{
            width: 172,
            height: 72,
            borderRadius: 9999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 12px auto",
            background: "#eee",
          }}
        >
          <span style={{ fontSize: "2rem" }}>🛒</span>
        </div>
        <h3 style={{ margin: "6px 0" }}>No Products Yet</h3>
        <p style={{ margin: 0 }}>
          Add your first product using the Add Product button above.
        </p>
      </div>
    );
  }

  return (
    <div>
      {editingProduct && (
        <EditProductForm
          product={editingProduct}
          onProductUpdated={() => {
            onProductUpdated();
            setEditingProduct(null);
          }}
          onCancel={() => setEditingProduct(null)}
        />
      )}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
          gap: 16,
        }}
      >
        {products.map((product, index) => (
          <div
            key={product.Product_ID}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <ProductCard
              product={product}
              onEdit={() => setEditingProduct(product)}
              onDelete={onProductDeleted}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
