from app import app
from model import db, Category, Supplier, Warehouse, Employee

with app.app_context():
    # 1. Categories
    categories = [
        Category(name="Hardware", description="Physical components"),
        Category(name="Software", description="Digital products"),
        Category(name="Electronics", description="Electronic devices"),
        Category(name="Networking", description="Networking equipment")
    ]
    for c in categories:
        if not Category.query.filter_by(name=c.name).first():
            db.session.add(c)
    
    # 2. Suppliers
    suppliers = [
        Supplier(name="Global Tech Logistics Corp", number="123456789", email="contact@globaltech.com", address="123 Tech Ave"),
        Supplier(name="Nexus Systems", number="987654321", email="sales@nexus.com", address="456 System Rd"),
        Supplier(name="TechCo Supply Chain", number="555666777", email="info@techco.com", address="789 Supply St")
    ]
    for s in suppliers:
        if not Supplier.query.filter_by(name=s.name).first():
            db.session.add(s)

    # 3. Warehouses
    admin = Employee.query.filter_by(username='admin').first()
    if admin:
        warehouses = [
            Warehouse(name="Warehouse A", location="North America", capacity=1000, employee_id=admin.id),
            Warehouse(name="Warehouse B", location="Europe", capacity=800, employee_id=admin.id),
            Warehouse(name="Global Dist.", location="APAC Region", capacity=1500, employee_id=admin.id)
        ]
        for w in warehouses:
            if not Warehouse.query.filter_by(name=w.name).first():
                db.session.add(w)

    db.session.commit()
    print("Database seeded with initial categories, suppliers, and warehouses.")
