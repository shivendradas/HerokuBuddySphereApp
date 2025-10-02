// routes/browseAdRequests.js
const express = require('express');
const router = express.Router();

module.exports = (pool) => {

  // Create table if not exists
  pool.query(`
    CREATE TABLE IF NOT EXISTS classified_ads (
      id SERIAL PRIMARY KEY,
      category VARCHAR(100),
      condition VARCHAR(50),
      title VARCHAR(200),
      description TEXT,
      price NUMERIC,
      brand VARCHAR(100),
      model VARCHAR(100),
      year_of_purchase INT,
      email VARCHAR(100),
      contact_phone VARCHAR(20),
      location VARCHAR(255),
      ad_image BYTEA,
      is_active BOOLEAN DEFAULT TRUE,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `);

  // Add new ad
  router.post('/classifieds/add', async (req, res) => {
    const {
      category,
      condition,
      title,
      description,
      price,
      brand,
      model,
      yearOfPurchase,
      contactEmail,
      contactPhone,
      location,
      adImageData // base64 image string
    } = req.body;

    try {
      let imageBuffer = null;
      if (adImageData) {
        imageBuffer = Buffer.from(adImageData, 'base64');
      }

      const query = `
        INSERT INTO classified_ads
          (category, condition, title, description, price, brand, model, year_of_purchase,
           email, contact_phone, location, ad_image)
        VALUES
          ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)
        RETURNING *;
      `;

      const values = [
        category,
        condition,
        title,
        description,
        price,
        brand,
        model,
        yearOfPurchase,
        contactEmail,
        contactPhone,
        location,
        imageBuffer
      ];

      const result = await pool.query(query, values);
      res.status(200).json({ message: 'Ad posted successfully', ad: result.rows[0] });

    } catch (err) {
      console.error('Error adding classified ad:', err);
      res.status(500).json({ error: 'Failed to post ad' });
    }
  });

  // Search ads with optional filters
  router.get('/classifieds/search', async (req, res) => {
    try {
      const {
        category,
        condition,
        minPrice,
        maxPrice,
        brand,
        location,
        isActive
      } = req.query;

      let conditions = [];
      let values = [];
      let idx = 1;

      if (category) {
        conditions.push(`category ILIKE $${idx++}`);
        values.push(`%${category}%`);
      }
      if (condition) {
        conditions.push(`condition = $${idx++}`);
        values.push(condition);
      }
      if (minPrice) {
        conditions.push(`price >= $${idx++}`);
        values.push(minPrice);
      }
      if (maxPrice) {
        conditions.push(`price <= $${idx++}`);
        values.push(maxPrice);
      }
      if (brand) {
        conditions.push(`brand ILIKE $${idx++}`);
        values.push(`%${brand}%`);
      }
      if (location) {
        conditions.push(`location ILIKE $${idx++}`);
        values.push(`%${location}%`);
      }
      if (isActive !== undefined) {
        conditions.push(`is_active = $${idx++}`);
        values.push(isActive === 'true');
      } else {
        conditions.push(`is_active = true`);
      }

      let query = `SELECT * FROM classified_ads`;
      if (conditions.length > 0) {
        query += ' WHERE ' + conditions.join(' AND ');
      }
      query += ' ORDER BY created_at DESC';

      const result = await pool.query(query, values);
      res.json(result.rows);

    } catch (err) {
      console.error('Error searching classified ads:', err);
      res.status(500).json({ error: 'Failed to fetch classifieds' });
    }
  });
  router.get('/classifieds/myad', async (req, res) => {
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
      let query = `SELECT * FROM classified_ads`;

      if (conditions.length > 0) {
        query += ' WHERE ' + conditions.join(' AND ');
      }

      query += ' ORDER BY created_at DESC';

      const result = await pool.query(query, values);
      res.json(result.rows);
    } catch (err) {
      console.error('Error fetching my requests:', err);
      res.status(500).json({ error: 'Failed to fetch my requests' });
    }
  });

  // Toggle Active/Deactive status of a ads
  router.patch('/classifieds/toggleActive/:adId', async (req, res) => {
    const { adId } = req.params;
    // Validate the adId if needed
    try {
      // Toggle isActive boolean in ads table and return updated row
      const updateQuery = `
        UPDATE classified_ads
        SET is_active = NOT is_active
        WHERE id = $1
        RETURNING *;
      `;
      const result = await pool.query(updateQuery, [adId]);
      if (result.rows.length === 0) {
        return res.status(404).json({ message: 'Ads not found' });
      }
      res.json(result.rows[0]);
    } catch (error) {
      console.error('Toggle active error:', error);
      res.status(500).json({ message: 'Failed to update the ads status' });
    }
  });

  // Update ad by id
  router.put('/classifieds/update/:id', async (req, res) => {
    const { id } = req.params;
    const {
      category,
      condition,
      title,
      description,
      price,
      brand,
      model,
      yearOfPurchase,
      contactEmail,
      contactPhone,
      location,
      adImageData,
      isActive
    } = req.body;

    try {
      let imageBuffer = null;
      if (adImageData) {
        imageBuffer = Buffer.from(adImageData, 'base64');
      }

      let query = `
        UPDATE classified_ads SET
          category=$1, condition=$2, title=$3, description=$4, price=$5, brand=$6, model=$7,
          year_of_purchase=$8, email=$9, contact_phone=$10, location=$11, is_active=$12
      `;

      const params = [
        category,
        condition,
        title,
        description,
        price,
        brand,
        model,
        yearOfPurchase,
        contactEmail,
        contactPhone,
        location,
        isActive !== undefined ? isActive : true
      ];

      if (imageBuffer) {
        query += `, ad_image=$13 WHERE id=$14 RETURNING *;`;
        params.push(imageBuffer, id);
      } else {
        query += ` WHERE id=$13 RETURNING *;`;
        params.push(id);
      }

      const result = await pool.query(query, params);
      if (result.rows.length === 0) {
        return res.status(404).json({ message: 'Ad not found for update' });
      }

      res.json({ message: 'Ad updated successfully', ad: result.rows[0] });

    } catch (err) {
      console.error('Error updating classified ad:', err);
      res.status(500).json({ error: 'Failed to update ad' });
    }
  });

  // Delete ad by id
  router.delete('/classifieds/delete/:id', async (req, res) => {
    const { id } = req.params;
    try {
      const result = await pool.query('DELETE FROM classified_ads WHERE id=$1 RETURNING *;', [id]);
      if (result.rows.length === 0) {
        return res.status(404).json({ message: 'Ad not found' });
      }
      res.json({ message: 'Ad deleted successfully' });
    } catch (err) {
      console.error('Error deleting classified ad:', err);
      res.status(500).json({ message: 'Failed to delete ad' });
    }
  });

  return router;
};
