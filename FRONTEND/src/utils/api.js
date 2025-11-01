// Use relative paths - Vite will proxy these to the backend
const API_BASE = '/api';

export const api = {
  // Test connection
  testConnection: async () => {
    try {
      console.log('🔌 Testing backend connection via proxy...');
      const response = await fetch(`${API_BASE}/getproducts`);
      console.log('✅ Proxy connection test - Status:', response.status);
      return response.ok;
    } catch (error) {
      console.error('❌ Proxy connection failed:', error);
      return false;
    }
  },

  // Get all products
  getProducts: async () => {
    try {
      const response = await fetch(`${API_BASE}/getproducts`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log('📦 Retrieved products via proxy:', data.length);
      return data;
    } catch (error) {
      console.error('❌ Error fetching products via proxy:', error);
      throw error;
    }
  },

  // Add product
  addProduct: async (product) => {
    try {
      const response = await fetch(`${API_BASE}/addproduct`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(product),
      });
      if (!response.ok) throw new Error('Failed to add product');
      return await response.json();
    } catch (error) {
      console.error('❌ Error adding product:', error);
      throw error;
    }
  },

  // Update product
  updateProduct: async (productId, product) => {
    try {
      const response = await fetch(`${API_BASE}/updateproduct/${productId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(product),
      });
      if (!response.ok) throw new Error('Failed to update product');
      return await response.json();
    } catch (error) {
      console.error('❌ Error updating product:', error);
      throw error;
    }
  },

  // Delete product
  deleteProduct: async (productId) => {
    try {
      const response = await fetch(`${API_BASE}/deleteproduct/${productId}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete product');
      return await response.json();
    } catch (error) {
      console.error('❌ Error deleting product:', error);
      throw error;
    }
  },
};