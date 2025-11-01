import mysql.connector 
from sql_connection import get_sql_connection

def get_all_products(connection):
    cursor = None
    try:
        cursor = connection.cursor()
        
        print("🔍 Executing products query...")
        
        # Use your actual column names: UOM_Id and UOM_Namel
        query = """
        SELECT 
            p.Product_ID, 
            p.Prodcut_name, 
            p.UOM_ID, 
            p.Price_per_unit, 
            u.UOM_Namel 
        FROM products p 
        INNER JOIN uom u ON u.UOM_Id = p.UOM_ID
        ORDER BY p.Product_ID
        """
        
        print(f"📝 Query: {query}")
        cursor.execute(query)
        
        response = []
        for row in cursor:
            print(f"📦 Raw row: {row}")
            product = {
                "Product_ID": row[0],
                "Product_name": row[1],
                "UOM_ID": row[2],
                "Price_per_unit": float(row[3]) if row[3] else 0.0,
                "UOM_Name": row[4]  # This will show "each" or "kg"
            }
            response.append(product)
        
        print(f"✅ Found {len(response)} products")
        for product in response:
            print(f"   - {product['Product_name']} (${product['Price_per_unit']}) - {product['UOM_Name']}")
        
        return response
        
    except Exception as e:
        print(f"❌ Error in get_all_products: {e}")
        return []
    finally:
        if cursor:
            cursor.close()

def insert_new_product(connection, product):
    cursor = None
    try:
        cursor = connection.cursor()
        print(f"🔄 Inserting product: {product}")
        
        # Map UOM names to your existing UOM IDs
        uom_mapping = {
            'Kilogram': 2,  # 'kg' in your database
            'Liter': 2,     # Use 'kg' for liquids too (temporary)
            'Piece': 1      # 'each' in your database
        }
        
        # Get the correct UOM_ID based on the UOM name
        uom_name = product.get('UOM_Name', 'Piece')
        uom_id = uom_mapping.get(uom_name, 1)  # Default to 'each'
        
        query = "INSERT INTO products (Prodcut_name, UOM_ID, Price_per_unit) VALUES (%s, %s, %s)"
        data = (product['Product_name'], uom_id, product['Price_per_unit'])
        
        cursor.execute(query, data)
        connection.commit()
        product_id = cursor.lastrowid
        
        print(f"✅ Inserted product with ID: {product_id}")
        return product_id
        
    except Exception as e:
        print(f"❌ Error in insert_new_product: {e}")
        connection.rollback()
        return None
    finally:
        if cursor:
            cursor.close()

def delete_product(connection, Product_ID):
    cursor = None
    try:
        cursor = connection.cursor()
        query = "DELETE FROM products WHERE Product_ID = %s"
        cursor.execute(query, (Product_ID,))
        connection.commit()
        print(f"✅ Deleted product with ID: {Product_ID}")
        return cursor.rowcount
    except Exception as e:
        print(f"❌ Error in delete_product: {e}")
        connection.rollback()
        return 0
    finally:
        if cursor:
            cursor.close()

def update_product(connection, product_id, product):
    cursor = None
    try:
        cursor = connection.cursor()
        
        # Map UOM names to your existing UOM IDs
        uom_mapping = {
            'Kilogram': 2,  # 'kg' in your database
            'Liter': 2,     # Use 'kg' for liquids too (temporary)
            'Piece': 1      # 'each' in your database
        }
        
        # Get the correct UOM_ID based on the UOM name
        uom_name = product.get('UOM_Name', 'Piece')
        uom_id = uom_mapping.get(uom_name, 1)  # Default to 'each'
        
        query = """
        UPDATE products 
        SET Prodcut_name = %s, UOM_ID = %s, Price_per_unit = %s 
        WHERE Product_ID = %s
        """
        data = (product['Product_name'], uom_id, product['Price_per_unit'], product_id)
        
        cursor.execute(query, data)
        connection.commit()
        print(f"✅ Updated product with ID: {product_id}")
        return cursor.rowcount
        
    except Exception as e:
        print(f"❌ Error in update_product: {e}")
        connection.rollback()
        return 0
    finally:
        if cursor:
            cursor.close()

if __name__ == '__main__':
    connection = get_sql_connection()
    
    # Test the functions
    print("Testing products_dao...")
    
    # Get all products
    products = get_all_products(connection)
    print("Products:", products)
    
    connection.close()