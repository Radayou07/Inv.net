# Gemini

some terms used:

- You mean gemini-cli should just call party X
- Me mean the person who make this project or the retailer or the one who buy product from supplier, I called party A
- Supplier mean the one who sell the product to Me, I called them party B
- Customer mean the one who buy product from Me or buy from party A, I called them party C

Understand Database:

- employee entity (party A)
  - id
  - name
  - number
  - email
  - role: (sales, manager, admin)
  - image: link image which i use imgbb as storage

- Supplier entity
  - id
  - name
  - email
  - address

- purchase entity
  - id
  - date: when product being bought
  - total: the total price of all products being bought at that time
  - supplier_id: the person party A bought product from
  - employee: a person respone for bought product from party B

- purchase detail entity
  - id
  - price: price here is product price party A bought from party B
  - sub_total: sub_total is the total price of one type of product. e.g each msi laptop are 1000$ each, so if I bough 10 from supplier, the sub_price is (price of 1 laptop * quantity) or (1000$ * 10 = 10,000$)
  - quantity
  - purchase_id
  - product_id

- payment_supplier entity
  - id
  - date: when party A give party B payment
  - total: total money that party A bough the product from party B
  - method: the way party A pay party B (cash, credit card, transfer)
  - purchase_id: just indicate which purchase being paid
  - employee_id: person who respone for this task

- Product entity
  - id: product unique id
  - name: product name
  - price: price here mean the product price party A sell to party C
  - expire: when product expire
  - brand: product brand
  - description: product description
  - category: product category
  - supplier: the person who sale product to Me (party B)
  - discount

- category entity
  - id
  - name
  - description
  
- discount
  - id
  - code
  - percentage
  - start_date
  - end_date
  - one_use: boolean (true, false)
  - used: if not one_use, how many use

- image entity
  - id
  - path: imgbb part
  - product_id
  
- Inventory entity
  - last_update
  - quantity
  - product_id + warehouse_id: it just combination of each ids, to avoid duplicate.

- warehouse entity
  - id
  - name
  - capacity: boolean just not full or full
  - employee: a person who manage that warehouse (employee who have role manager)
  
- customer entity (party C)
  - id
  - name
  - number
  - email
  - address
  - image
  
- orders entity
  - id
  - date: when party C bought products from party A
  - payment_status: boolean (have paid, havent paid)
  - status: boolean (have got the product, havent got the product)
  - preorder: boolean (preorder, not preorder) useful when the products are out of stock or not have enough
  - total: total price of party C bought product from party A
  - customer_id: party C who made orders
  
- order_detail entity
  - id
  - quantity
  - price: price ot one type of product party A sold
  - sub_total: the total price of one type of product
  - order_id
  - product_id
  
- payment_customer entity
  - id
  - date
  - total
  - status
  - method: (cash, credit card, transfer)
  - employee: a persomn respone for this payment (party A)
  - order_id

## case in website

- gemini role is to connect frontend to backend

### Home

- 1st
  - Total customers:
  - total products
  - low stock: stock that have less than 10
- 2nd
  - top product: the most sold products
  - Financial series: income vs spend
- 3rd
  - top customer: rank with total revenue
  - category Domination: most sold category

### Product

- New Product modal:
  - name
  - expire
  - brand
  - category
  - supplier
  - buy cost (purchase_detail.price)
  - sell price (product.price)
  - gain price: sell price - buy cost
  - description
- edit product modal:
  - name
  - sell price (product.price)
  - expire
  - brand
  - category
  - supplier
  - corrent stock level
  - buy cost (purchase_detail.price)
  - sell price (product.price)
  - gain: sell - buy
  - buy total: quantity * buy (quatity here mean the amount Me buy from party B not the corrent stock level)
  - sell total: quantity * sell (quatity here mean the amount Me buy from party B not the corrent stock level)
  - gain total: sell total - buy total
  - space note
  - delete (only for admin/manager only)
  - cancel
  - save changes

### Inventory

- add warehouse modal
  - name
  - location
  - capacity (full, not full) default "not full"
  - manager
  - cancel
  - create warehouse
- warehouse A, B, C
- current stock detail: show product and which warehouse they stored in

### Customer

- add customer modal
  - name
  - phone number
  - email
  - address
  - image
- customer
- on click
  - show customer history
    - product: what customer bought
      - date (orders.date): exact date when buy from Me
      - each product (product.name)
      - quantity (order_detail.quatity)
      - price (product.price)
      - sub_total (order_detail.sup_total): price * quantity
      - total (orders.total): sum(sub_total)

### supplier

- new supplier modal (admin/manager role only)
  - name
  - phone number
  - email
  - address
  - image

### 