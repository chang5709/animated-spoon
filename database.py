import sqlite3

def get_connection():
    # Connect to the database (or create it if it doesn't exist)
    conn = sqlite3.connect('spoon.db')

    return conn

def get_cursor():
    conn = get_connection()

    # Create a cursor object
    cursor = conn.cursor()

    return cursor





# Create a table
# cursor.execute('''
# CREATE TABLE IF NOT EXISTS users (
#     id INTEGER PRIMARY KEY,
#     name TEXT NOT NULL,
#     age INTEGER NOT NULL
# )
# ''')

# Insert some data
# cursor.execute('INSERT INTO users (name, age) VALUES (?, ?)', ('Alice', 30))
# cursor.execute('INSERT INTO users (name, age) VALUES (?, ?)', ('Bob', 25))

# Commit the changes
# conn.commit()

# Query the data
# cursor.execute('SELECT * FROM users')
# rows = cursor.fetchall()

# Print the results
# for row in rows:
#     print(row)

# Close the connection
# conn.close()