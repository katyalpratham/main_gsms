from sql_connection import get_sql_connection
import products_dao

def test_backend():
    try:
        print("🧪 Testing backend components...")
        
        # Test database connection
        connection = get_sql_connection()
        print("✅ Database connection successful")
        
        # Test products DAO
        products = products_dao.get_all_products(connection)
        print(f"✅ Products DAO working - found {len(products)} products")
        
        # Show sample products
        for product in products[:3]:  # Show first 3 products
            print(f"   - {product['Product_name']}: ${product['Price_per_unit']}")
        
        connection.close()
        return True
        
    except Exception as e:
        print(f"❌ Backend test failed: {e}")
        return False

if __name__ == "__main__":
    test_backend()