// routes/propertyRequests.js
const express = require('express');
const router = express.Router();

module.exports = (pool) => {

  // Create Table if not exists
  pool.query(`
    CREATE TABLE IF NOT EXISTS property_requests (
      id SERIAL PRIMARY KEY,      
      property_type VARCHAR(50),
      transaction_type VARCHAR(25),
      description TEXT,
      location VARCHAR(255),
      price NUMERIC,
      bedrooms INT,
      bathrooms INT,
      area_sqft INT,
      contact_name VARCHAR(100),
      contact_phone VARCHAR(20),
      images BYTEA,
      email VARCHAR(50),
      isActive boolean DEFAULT true,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `);

  // Add Property Request
  router.post('/properties/addPropertyRequest', async (req, res) => {

    const {
      propertyType,
      transactionType,
      description,
      location,
      price,
      bedrooms,
      bathrooms,
      areaSqft,
      contactName,
      contactPhone,
      imageData, // Expect base64 encoded image string here
      email,
    } = req.body;

    try {
      let imageBuffer = null;
      if (imageData) {
        imageBuffer = Buffer.from(imageData, 'base64');
      }

      await pool.query(
        `INSERT INTO property_requests 
         (property_type, transaction_type, description, location, price, bedrooms, bathrooms, area_sqft, contact_name, contact_phone, images, email)
         VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)`,
        [propertyType, transactionType, description, location, price, bedrooms, bathrooms, areaSqft, contactName, contactPhone, imageBuffer, email]
      );
      res.status(200).json({ message: 'Property request added successfully' });
    } catch (err) {
      console.error('Error inserting property request:', err);
      res.status(500).json({ error: 'Failed to add property request' });
    }
  });

  // Fetch property requests with optional filters
  router.get('/properties/search', async (req, res) => {
    try {
      const {
        propertyType,
        transactionType,
        location,
        minPrice,
        maxPrice,
        minBedrooms,
        maxBedrooms
      } = req.query;

      let conditions = [];
      let values = [];
      let idx = 1;

      if (propertyType) {
        conditions.push(`property_type = $${idx++}`);
        values.push(propertyType);
      }
      if (transactionType) {
        conditions.push(`transaction_type = $${idx++}`);
        values.push(transactionType);
      }
      if (location) {
        conditions.push(`location ILIKE $${idx++}`);
        values.push(`%${location}%`);
      }
      if (minPrice) {
        conditions.push(`price >= $${idx++}`);
        values.push(minPrice);
      }
      if (maxPrice) {
        conditions.push(`price <= $${idx++}`);
        values.push(maxPrice);
      }
      if (minBedrooms) {
        conditions.push(`bedrooms >= $${idx++}`);
        values.push(minBedrooms);
      }
      if (maxBedrooms) {
        conditions.push(`bedrooms <= $${idx++}`);
        values.push(maxBedrooms);
      }

      let query = `SELECT * FROM property_requests`;

      if (conditions.length > 0) {
        query += ' WHERE ' + conditions.join(' AND ') + ' AND isactive=true';
      } else {
        // If no conditions, just add WHERE isactive=true
        query += ' WHERE isactive=true';
      }

      query += ' ORDER BY created_at DESC';
      console.log(query);
      const result = await pool.query(query, values);
      res.json(result.rows);
    } catch (err) {
      console.error('Error fetching property requests:', err);
      res.status(500).json({ error: 'Failed to fetch property requests' });
    }
  });
  router.get('/properties/myad', async (req, res) => {
    try {
      const {
        email
      } = req.query;

      let conditions = [];
      let values = [];
      let idx = 1;

      if (email) {
        conditions.push(`email = $${idx++}`);
        values.push(email);
      }
      let query = `SELECT * FROM property_requests`;

      if (conditions.length > 0) {
        query += ' WHERE ' + conditions.join(' AND ');
      }

      query += ' ORDER BY created_at DESC';

      const result = await pool.query(query, values);
      res.json(result.rows);
    } catch (err) {
      console.error('Error fetching property requests:', err);
      res.status(500).json({ error: 'Failed to fetch property requests' });
    }
  });

  // Toggle Active/Deactive status of a property
  router.patch('/properties/toggleActive/:propertyId', async (req, res) => {
    const { propertyId } = req.params;
    // Validate the propertyId if needed
    try {
      // Toggle isActive boolean in properties table and return updated row
      const updateQuery = `
        UPDATE property_requests
        SET isActive = NOT isActive
        WHERE id = $1
        RETURNING *;
      `;
      const result = await pool.query(updateQuery, [propertyId]);
      if (result.rows.length === 0) {
        return res.status(404).json({ message: 'Property not found' });
      }
      res.json(result.rows[0]);
    } catch (error) {
      console.error('Toggle active error:', error);
      res.status(500).json({ message: 'Failed to update the property status' });
    }
  });

  // Delete a property by ID
  router.delete('/properties/delete/:propertyId', async (req, res) => {
    const { propertyId } = req.params;
    try {
      const deleteQuery = 'DELETE FROM property_requests WHERE id = $1 RETURNING *;';
      const result = await pool.query(deleteQuery, [propertyId]);
      if (result.rows.length === 0) {
        return res.status(404).json({ message: 'Property not found' });
      }
      res.json({ message: 'Property deleted successfully' });
    } catch (error) {
      console.error('Delete property error:', error);
      res.status(500).json({ message: 'Failed to delete the property' });
    }
  });

  return router;
};
