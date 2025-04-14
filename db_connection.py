import mysql.connector

db = mysql.connector.connect(
    host="localhost",
    user="root",
    password="yourpassword",
    database="ecommerce"
)

cursor = db.cursor()
cursor.execute("SHOW TABLES")

for table in cursor:
    print(table)

db.close()
