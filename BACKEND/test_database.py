from sql_connection import get_sql_connection

def test_database():
    try:
        connection = get_sql_connection()
        cursor = connection.cursor()
        
        print("✅ Database connected successfully!")
        
        # Check if products table exists and has data
        cursor.execute("SHOW TABLES")
        tables = cursor.fetchall()
        print("📊 Tables in database:", tables)
        
        # Check products table structure
        cursor.execute("DESCRIBE products")
        product_columns = cursor.fetchall()
        print("📋 Products table structure:")
        for column in product_columns:
            print(f"  - {column}")
        
        # Check uom table structure
        cursor.execute("DESCRIBE uom")
        uom_columns = cursor.fetchall()
        print("📋 UOM table structure:")
        for column in uom_columns:
            print(f"  - {column}")
        
        # Count products
        cursor.execute("SELECT COUNT(*) FROM products")
        product_count = cursor.fetchone()[0]
        print(f"🛒 Total products in database: {product_count}")
        
        # Count UOM entries
        cursor.execute("SELECT COUNT(*) FROM uom")
        uom_count = cursor.fetchone()[0]
        print(f"📏 Total UOM entries: {uom_count}")
        
        # Show sample products
        if product_count > 0:
            cursor.execute("SELECT * FROM products LIMIT 5")
            products = cursor.fetchall()
            print("📦 Sample products:")
            for product in products:
                print(f"  - {product}")
        
        # Show UOM data
        if uom_count > 0:
            cursor.execute("SELECT * FROM uom")
            uom_data = cursor.fetchall()
            print("📐 UOM data:")
            for uom in uom_data:
                print(f"  - {uom}")
        
        cursor.close()
        connection.close()
        
    except Exception as e:
        print(f"❌ Error: {e}")

if __name__ == "__main__":
    test_database()