const express = require('express');
const router = express.Router();

module.exports = (pool) => {

  // Create Property Requests Table
  pool.query(`
    CREATE TABLE IF NOT EXISTS property_requests (
      id SERIAL PRIMARY KEY,      
      ad_given_by VARCHAR(50),
      property_category VARCHAR(50),
      property_type VARCHAR(50),
      transaction_type VARCHAR(25),
      description TEXT,
      location VARCHAR(255),
      address VARCHAR(255),
      latitude NUMERIC,
      longitude NUMERIC,
      price NUMERIC,
      area_sqft INT,
      contact_name VARCHAR(100),
      contact_phone VARCHAR(20),
      images BYTEA,
      email VARCHAR(50),
      isActive boolean DEFAULT true,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `);
  // Create Room Detail Table
  pool.query(`
    CREATE TABLE IF NOT EXISTS property_room_detail (
      id SERIAL PRIMARY KEY,
      property_id INT REFERENCES property_requests(id) ON DELETE CASCADE,
      bedrooms INT,
      bathrooms INT,
      hall INT,
      kitchen INT
    );
  `);

  // Create Owner Detail Table
  pool.query(`
    CREATE TABLE IF NOT EXISTS property_owner_detail (
      id SERIAL PRIMARY KEY,
      property_id INT REFERENCES property_requests(id) ON DELETE CASCADE,
      owner_name VARCHAR(100),
      owner_contact VARCHAR(20)
    );
  `);

  // Add Property Request with conditionally insert room and owner details
  router.post('/properties/addPropertyRequest', async (req, res) => {
    const client = await pool.connect();
    const {
      adGivenBy,
      ownerName,
      ownerContact,
      propertyCategory,
      propertyType,
      transactionType,
      description,
      location,
      address,
      latitude,
      longitude,
      price,
      bedrooms,
      bathrooms,
      hall,
      kitchen,
      areaSqft,
      contactName,
      contactPhone,
      imageData,
      email,
    } = req.body;

    try {
      let imageBuffer = null;
      if (imageData) {
        imageBuffer = Buffer.from(imageData, 'base64');
      }
      await client.query('BEGIN');

      // Insert into property_requests
      const insertPropertyText = `
        INSERT INTO property_requests
          (ad_given_by, property_category, property_type, transaction_type, description, location, address, latitude, longitude, price, area_sqft, contact_name, contact_phone, images, email)
        VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15)
        RETURNING id;
      `;
      const insertPropertyValues = [
        adGivenBy, propertyCategory, propertyType, transactionType, description,
        location, address, latitude, longitude, price, areaSqft,
        contactName, contactPhone, imageBuffer, email
      ];

      const result = await client.query(insertPropertyText, insertPropertyValues);
      const propertyId = result.rows[0].id;

      // Conditionally insert into property_room_detail for flats and individual homes
      if (["flat", "individual_home", "villa", "builderfloor", "studioapartment", "penthouse"].includes(propertyType)) {
        await client.query(
          `INSERT INTO property_room_detail (property_id, bedrooms, bathrooms, hall, kitchen)
           VALUES ($1, $2, $3, $4, $5)`,
          [propertyId, bedrooms || 0, bathrooms || 0, hall || 0, kitchen || 0]
        );
      }

      // Conditionally insert into property_owner_detail for brokers
      if (adGivenBy && adGivenBy.toLowerCase() === "agent") {
        await client.query(
          `INSERT INTO property_owner_detail (property_id, owner_name, owner_contact)
           VALUES ($1, $2, $3)`,
          [propertyId, ownerName || null, ownerContact || null]
        );
      }

      await client.query('COMMIT');
      res.status(200).json({ message: 'Property request and details added successfully', propertyId });
    } catch (err) {
      await client.query('ROLLBACK');
      console.error('Error inserting property request:', err);
      res.status(500).json({ error: 'Failed to add property and details' });
    } finally {
      client.release();
    }
  });

  // Search properties with join on property_room_detail and property_owner_detail, filter based on input
  router.get('/properties/search', async (req, res) => {
    try {
      const {
        propertyCategory,
        propertyType,
        transactionType,
        location,
        address,
        minPrice,
        maxPrice,
        minBedrooms,
        maxBedrooms
      } = req.query;

      let conditions = ['pr.isActive = true'];
      let values = [];
      let idx = 1;

      if (propertyCategory) {
        conditions.push(`pr.property_category = $${idx++}`);
        values.push(propertyCategory);
      }
      if (propertyType) {
        conditions.push(`pr.property_type = $${idx++}`);
        values.push(propertyType);
      }
      if (transactionType) {
        conditions.push(`pr.transaction_type = $${idx++}`);
        values.push(transactionType);
      }
      if (location) {
        conditions.push(`pr.location ILIKE $${idx++}`);
        values.push(`%${location}%`);
      }
      if (address) {
        conditions.push(`pr.address ILIKE $${idx++}`);
        values.push(`%${address}%`);
      }
      if (minPrice) {
        conditions.push(`pr.price >= $${idx++}`);
        values.push(minPrice);
      }
      if (maxPrice) {
        conditions.push(`pr.price <= $${idx++}`);
        values.push(maxPrice);
      }
      if (minBedrooms) {
        conditions.push(`rd.bedrooms >= $${idx++}`);
        values.push(minBedrooms);
      }
      if (maxBedrooms) {
        conditions.push(`rd.bedrooms <= $${idx++}`);
        values.push(maxBedrooms);
      }

      const query = `
        SELECT 
          pr.*, 
          rd.bedrooms, rd.bathrooms, rd.hall, rd.kitchen, 
          od.owner_name AS broker_name, od.owner_contact AS broker_contact
        FROM property_requests pr
        LEFT JOIN property_room_detail rd ON pr.id = rd.property_id
        LEFT JOIN property_owner_detail od ON pr.id = od.property_id
        WHERE ${conditions.join(' AND ')}
        ORDER BY pr.created_at DESC
      `;

      const result = await pool.query(query, values);
      res.json(result.rows);
    } catch (err) {
      console.error('Error fetching property requests:', err);
      res.status(500).json({ error: 'Failed to fetch property requests' });
    }
  });

  // Fetch my ads with joined room and owner details
  router.get('/properties/myad', async (req, res) => {
    try {
      const { email } = req.query;

      let conditions = ['pr.isActive = true'];
      let values = [];
      let idx = 1;

      if (email) {
        conditions.push(`pr.email = $${idx++}`);
        values.push(email);
      }

      const query = `
      SELECT 
        pr.*, 
        rd.bedrooms, rd.bathrooms, rd.hall, rd.kitchen, 
        od.owner_name AS owner_name, od.owner_contact AS owner_contact
      FROM property_requests pr
      LEFT JOIN property_room_detail rd ON pr.id = rd.property_id
      LEFT JOIN property_owner_detail od ON pr.id = od.property_id
      WHERE ${conditions.join(' AND ')}
      ORDER BY pr.created_at DESC
    `;

      const result = await pool.query(query, values);
      res.json(result.rows);
    } catch (err) {
      console.error('Error fetching user property requests:', err);
      res.status(500).json({ error: 'Failed to fetch property requests' });
    }
  });

  // Toggle Active/Inactive status
  router.patch('/properties/toggleActive/:propertyId', async (req, res) => {
    const { propertyId } = req.params;
    try {
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

  // Delete property by ID (will cascade delete due to foreign key constraints)
  router.delete('/properties/delete/:propertyId', async (req, res) => {
    const { propertyId } = req.params;
    const client = await pool.connect();
    try {
      await client.query('BEGIN');

      // Delete from property_owner_detail if there are rows for this property
      await client.query('DELETE FROM property_owner_detail WHERE property_id = $1;', [propertyId]);

      // Delete from property_room_detail if there are rows for this property
      await client.query('DELETE FROM property_room_detail WHERE property_id = $1;', [propertyId]);

      // Delete the property (will cascade to other FK tables if defined)
      const deleteQuery = 'DELETE FROM property_requests WHERE id = $1 RETURNING *;';
      const result = await client.query(deleteQuery, [propertyId]);

      if (result.rows.length === 0) {
        await client.query('ROLLBACK');
        return res.status(404).json({ message: 'Property not found' });
      }

      await client.query('COMMIT');
      res.json({ message: 'Property deleted successfully' });
    } catch (error) {
      await client.query('ROLLBACK');
      console.error('Delete property error:', error);
      res.status(500).json({ message: 'Failed to delete the property' });
    } finally {
      client.release();
    }
  });

  return router;
};
