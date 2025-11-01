from flask import Flask, request, jsonify
from sql_connection import get_sql_connection
import products_dao

# Create Flask app
app = Flask(__name__)

# Database connection
connection = get_sql_connection()

@app.route('/')
def home():
    return jsonify({
        "message": "Grocery Store API is running!",
        "endpoints": {
            "get_products": "GET /api/getproducts",
            "add_product": "POST /api/addproduct", 
            "update_product": "PUT /api/updateproduct/<id>",
            "delete_product": "DELETE /api/deleteproduct/<id>"
        }
    })

@app.route('/api/getproducts', methods=['GET'])
def get_products():
    try:
        print("🔄 Fetching products...")
        products = products_dao.get_all_products(connection)
        print(f"✅ Sending {len(products)} products to frontend")
        return jsonify(products)
    except Exception as e:
        print(f"❌ Error in /api/getproducts: {e}")
        return jsonify({"error": str(e), "products": []}), 500

@app.route('/api/addproduct', methods=['POST'])
def add_product():
    try:
        data = request.get_json()
        print("📨 Received data for new product:", data)
        
        if not data:
            return jsonify({"error": "No data provided"}), 400
            
        # Frontend sends UOM_Name; DAO maps it to UOM_ID
        required_fields = ['Product_name', 'UOM_Name', 'Price_per_unit']
        for field in required_fields:
            if field not in data:
                return jsonify({"error": f"Missing field: {field}"}), 400
        
        product_id = products_dao.insert_new_product(connection, data)
        
        if product_id:
            return jsonify({
                "message": "Product added successfully!",
                "product_id": product_id
            })
        else:
            return jsonify({"error": "Failed to add product"}), 500
            
    except Exception as e:
        print(f"❌ Error in /api/addproduct: {e}")
        return jsonify({"error": str(e)}), 500

@app.route('/api/deleteproduct/<int:product_id>', methods=['DELETE'])
def delete_product(product_id):
    try:
        print(f"🔄 Deleting product {product_id}...")
        result = products_dao.delete_product(connection, product_id)
        if result > 0:
            return jsonify({"message": "Product deleted successfully!"})
        else:
            return jsonify({"error": "Product not found"}), 404
    except Exception as e:
        print(f"❌ Error in /api/deleteproduct: {e}")
        return jsonify({"error": str(e)}), 500

@app.route('/api/updateproduct/<int:product_id>', methods=['PUT'])
def update_product(product_id):
    try:
        data = request.get_json()
        print(f"🔄 Updating product {product_id} with data:", data)
        
        if not data:
            return jsonify({"error": "No data provided"}), 400
            
        # Frontend sends UOM_Name; DAO maps it to UOM_ID
        required_fields = ['Product_name', 'UOM_Name', 'Price_per_unit']
        for field in required_fields:
            if field not in data:
                return jsonify({"error": f"Missing field: {field}"}), 400
        
        result = products_dao.update_product(connection, product_id, data)
        
        if result > 0:
            return jsonify({"message": "Product updated successfully!"})
        else:
            return jsonify({"error": "Product not found"}), 404
            
    except Exception as e:
        print(f"❌ Error in /api/updateproduct: {e}")
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    print('🚀 Starting Python Flask server for Grocery Store Management System...')
    print('🌐 Server running on http://127.0.0.1:5000')
    print('📊 API endpoints available at:')
    print('   GET  http://127.0.0.1:5000/api/getproducts')
    print('🔧 Using Vite proxy - no CORS needed')
    app.run(port=5000, debug=True, host='127.0.0.1')