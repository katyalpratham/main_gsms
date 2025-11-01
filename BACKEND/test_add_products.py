import requests
import json

def test_add_products():
    base_url = "http://localhost:5000/api"
    
    sample_products = [
        {
            "Product_name": "Potato",
            "UOM_Id": 1,
            "Price_per_unit": 10.50
        },
        {
            "Product_name": "Tomato",
            "UOM_Id": 1, 
            "Price_per_unit": 25.00
        },
        {
            "Product_name": "Milk",
            "UOM_Id": 2,
            "Price_per_unit": 60.00
        },
        {
            "Product_name": "Eggs",
            "UOM_Id": 3,
            "Price_per_unit": 8.00
        },
        {
            "Product_name": "Bread",
            "UOM_Id": 3,
            "Price_per_unit": 35.00
        }
    ]
    
    print("🔄 Adding sample products via API...")
    
    for product in sample_products:
        try:
            response = requests.post(
                f"{base_url}/addproduct",
                headers={"Content-Type": "application/json"},
                data=json.dumps(product)
            )
            
            if response.status_code == 200:
                result = response.json()
                print(f"✅ Added: {product['Product_name']} (ID: {result.get('product_id', 'N/A')})")
            else:
                print(f"❌ Failed to add {product['Product_name']}: {response.text}")
                
        except Exception as e:
            print(f"❌ Error adding {product['Product_name']}: {e}")
    
    print("\n📦 Verifying products were added...")
    
    try:
        response = requests.get(f"{base_url}/getproducts")
        if response.status_code == 200:
            products = response.json()
            print(f"Total products in database: {len(products)}")
            
            for product in products:
                print(f" - {product['Product_name']}: ${product['Price_per_unit']} ({product['UOM_Name']})")
        else:
            print(f"❌ Failed to get products: {response.text}")
            
    except Exception as e:
        print(f"❌ Error getting products: {e}")

if __name__ == "__main__":
    test_add_products()