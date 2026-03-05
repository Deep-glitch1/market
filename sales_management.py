# sales_management.py
from sqlalchemy import text
from tabulate import tabulate
from db import engine
from auth import has_permission, get_current_user, get_current_name

# ----------------- Process Sale (Cashier/Manager/Admin) -----------------
def process_sale():
    """Process a new sale. Uses currently logged-in employee as employee_id."""
    if not has_permission(["CASHIER", "MANAGER", "ADMIN"]):
        return

    cart = []
    cart_items = []  # Temporary list to collect items before validation
    total = 0.0
    current_user = get_current_user()
    current_name = get_current_name()

    # First, show products once at the start
    from product_management import view_products
    view_products()
    
    # Collect all items first (no DB queries in loop)
    while True:
        product_id = input("Enter Product ID (or 'done' to finish): ").strip()
        if product_id.lower() == 'done':
            break

        try:
            pid = int(product_id)
        except ValueError:
            print("❌ Invalid Product ID. Try again.")
            continue

        try:
            quantity = int(input("Enter quantity: ").strip())
            if quantity <= 0:
                print("❌ Quantity must be positive.")
                continue
        except ValueError:
            print("❌ Invalid number. Try again.")
            continue

        cart_items.append({'product_id': pid, 'quantity': quantity})
        print(f"✅ Added Product ID {pid} (Qty: {quantity}) to cart")

    if not cart_items:
        print("❌ Cart is empty. Sale cancelled.")
        return

    # OPTIMIZED: Batch fetch all products in ONE query instead of N queries
    try:
        with engine.connect() as conn:
            product_ids = [item['product_id'] for item in cart_items]
            placeholders = ','.join([str(pid) for pid in product_ids])
            
            result = conn.execute(text(f"""
                SELECT product_id, name, price, stock_quantity
                FROM products
                WHERE product_id IN ({placeholders})
            """))
            products_map = {row[0]: {'name': row[1], 'price': float(row[2]), 'stock': row[3]} 
                          for row in result.fetchall()}
        
        # Validate all items and build cart
        for item in cart_items:
            pid = item['product_id']
            quantity = item['quantity']
            
            if pid not in products_map:
                print(f"❌ Product ID {pid} not found. Skipping...")
                continue
                
            product_data = products_map[pid]
            if product_data['stock'] < quantity:
                print(f"❌ Only {product_data['stock']} units in stock for {product_data['name']}. Skipping...")
                continue

            item_total = product_data['price'] * quantity
            cart.append({
                'product_id': pid,
                'name': product_data['name'],
                'price': product_data['price'],
                'quantity': quantity,
                'item_total': item_total
            })
            total += item_total
            print(f"✅ Validated: {quantity} x {product_data['name']} = ₹{item_total:.2f}")

    except Exception as e:
        print(f"❌ Database error: {e}")
        return

    if not cart:
        print("❌ No valid items in cart. Sale cancelled.")
        return

    # Payment
    print(f"\nTotal Amount: ₹{total:.2f}")
    payment_method = input("Enter payment method (CASH/CARD/UPI/WALLET): ").strip().upper()
    if payment_method not in ('CASH', 'CARD', 'UPI', 'WALLET'):
        print("❌ Invalid payment method. Sale cancelled.")
        return

    customer_id = input("Enter customer ID (or leave blank if walk-in): ").strip() or None

    try:
        with engine.begin() as conn:
            # Validate customer if provided
            if customer_id:
                res = conn.execute(text("SELECT 1 FROM customers WHERE customer_id = :cid"), {"cid": customer_id})
                if res.fetchone() is None:
                    print("❌ Invalid customer ID. Sale cancelled.")
                    return

            # Insert sale using the current_user as employee_id
            result = conn.execute(text("""
                INSERT INTO sales (total_amount, payment_method, customer_id, employee_id)
                VALUES (:total, :pm, :cid, :eid)
                RETURNING sale_id
            """), {
                "total": round(total, 2),
                "pm": payment_method,
                "cid": customer_id,
                "eid": current_user
            })
            sale_id_row = result.fetchone()
            if not sale_id_row:
                raise RuntimeError("Failed to create sale record.")
            sale_id = sale_id_row[0]

            # Insert sale items
            for item in cart:
                conn.execute(text("""
                    INSERT INTO sale_items (sale_id, product_id, quantity, unit_price)
                    VALUES (:sale_id, :pid, :qty, :price)
                """), {
                    "sale_id": sale_id,
                    "pid": item['product_id'],
                    "qty": item['quantity'],
                    "price": item['price']
                })

        print("🎉 Sale completed successfully!")
        print(f"🧾 Sale ID: {sale_id} | Total: ₹{total:.2f} | Cashier: {current_name}")

    except Exception as e:
        print(f"❌ Transaction cancelled due to error: {e}")