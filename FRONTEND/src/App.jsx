import React, { useState, useEffect } from "react";
import ProductList from "./components/ProductList";
import AddProductForm from "./components/AddProductForm";
import LandingPage from "./components/LandingPage";
import { api } from "./utils/api";

function App() {
  const [products, setProducts] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [backendConnected, setBackendConnected] = useState(false);
  const [showFullView, setShowFullView] = useState(false);

  // Test backend connection and fetch products
  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError("");

      console.log("🔄 Testing backend connection...");

      // Test if backend is connected
      const isConnected = await api.testConnection();
      setBackendConnected(isConnected);

      if (!isConnected) {
        setError(
          "Cannot connect to backend server. The backend is running but the frontend cannot reach it."
        );
        setLoading(false);
        return;
      }

      console.log("✅ Backend connected, fetching products...");

      // Fetch products
      const productsData = await api.getProducts();
      setProducts(productsData);
      console.log(`✅ Loaded ${productsData.length} products`);
    } catch (error) {
      console.error("❌ Error:", error);
      setError("Failed to load products: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleProductAdded = () => {
    fetchProducts();
    setShowAddForm(false);
  };

  const retryConnection = () => {
    fetchProducts();
  };

  if (loading) {
    return (
      <div
        className="bg-green-400"
        style={{
          backgroundColor:"black",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <div style={{ marginBottom: 12 }}>Loading Grocery Store...</div>
          <div>Checking backend connection...</div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh" }}>
      <div
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          padding: "12px 12px 24px 12px",
        }}
      >
        {error && (
          <div
            style={{
              padding: 12,
              border: "1px solid #fca5a5",
              borderRadius: 6,
              background: "#fee2e2",
              marginBottom: 12,
            }}
          >
            <div style={{ fontWeight: 700, marginBottom: 6 }}>
              Connection Error
            </div>
            <div style={{ marginBottom: 8 }}>{error}</div>
            <button onClick={retryConnection}>Retry</button>
          </div>
        )}

        {backendConnected && (
          <div>
            {!showFullView ? (
              <LandingPage
                products={products}
                onProductUpdated={fetchProducts}
                onProductDeleted={fetchProducts}
                onShowFullView={() => setShowFullView(true)}
              />
            ) : (
              <div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: 12,
                  }}
                >
                  <h2 style={{ margin: 0 }}>
                    Product Inventory ({products.length})
                  </h2>
                  <div style={{ display: "flex", gap: "8px" }}>
                    <button
                      style={{
                        background: "#f3f4f6",
                        color: "#1f2937",
                        fontSize: "1rem",
                        fontWeight: 600,
                        padding: "10px 18px",
                        borderRadius: "8px",
                        border: "1px solid #d1d5db",
                        cursor: "pointer",
                      }}
                      onClick={() => setShowFullView(false)}
                    >
                      ← Back to Landing
                    </button>
                    <button
                      style={{
                        background: "#28c76f",
                        color: "white",
                        fontSize: "1rem",
                        fontWeight: 600,
                        padding: "10px 18px",
                        borderRadius: "8px",
                        border: "none",
                        cursor: "pointer",
                        letterSpacing: "0.5px",
                        transition: "0.2s",
                        whiteSpace: "nowrap",
                      }}
                      onClick={() => setShowAddForm(!showAddForm)}
                    >
                      {showAddForm ? "Cancel" : "Add Product"}
                    </button>
                  </div>
                </div>

                {showAddForm && (
                  <div style={{ marginBottom: 12 }}>
                    <AddProductForm
                      onProductAdded={handleProductAdded}
                      onCancel={() => setShowAddForm(false)}
                    />
                  </div>
                )}

                <ProductList
                  products={products}
                  onProductUpdated={fetchProducts}
                  onProductDeleted={fetchProducts}
                />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
