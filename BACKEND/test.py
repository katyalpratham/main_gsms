from sql_connection
import get_sql_connection as g;
c=g();
cur=c.cursor();
cur.execute("SELECT Product_ID, Prodcut_name, UOM_ID, Price_per_unit FROM products ORDER BY Product_ID DESC LIMIT 10"); print(cur.fetchall()); cur.close(); c.close()"