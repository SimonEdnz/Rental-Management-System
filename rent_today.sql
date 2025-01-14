
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  role ENUM('landlord', 'customer') NOT NULL
);

CREATE TABLE properties (
  id INT AUTO_INCREMENT PRIMARY KEY,
  landlord_id INT NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  address VARCHAR(255) NOT NULL,
  FOREIGN KEY (landlord_id) REFERENCES users(id)
);

CREATE TABLE inquiries (
  id INT AUTO_INCREMENT PRIMARY KEY,
  property_id INT NOT NULL,
  customer_id INT NOT NULL,
  message TEXT,
  status ENUM('pending', 'responded') DEFAULT 'pending',
  FOREIGN KEY (property_id) REFERENCES properties(id),
  FOREIGN KEY (customer_id) REFERENCES users(id)
);
