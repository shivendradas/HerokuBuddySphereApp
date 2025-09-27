// routes/travelRequests.js
module.exports = (pool) => {
    const express = require('express');
    const router = express.Router();

    // Create Table if not exists
    pool.query(`
    CREATE TABLE IF NOT EXISTS travel_requests (
        id SERIAL PRIMARY KEY,
        from_city VARCHAR(100),
        to_city VARCHAR(100),
        date_time TIMESTAMP,
        name VARCHAR(100),
        mobile VARCHAR(20),
        email VARCHAR(100),
        user_type VARCHAR(20),
        description VARCHAR(100),
        isActive boolean DEFAULT true
    );
`);

    // ➕ Add Request API (with userType & description)
    router.post('/addRequest', async (req, res) => {
        const { from, to, dateTime, name, mobile, email, userType, description, isActive } = req.body;
        try {
            await pool.query(
                `INSERT INTO travel_requests 
       (from_city, to_city, date_time, name, mobile, email, user_type, description, isActive) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
                [from, to, dateTime, name, mobile, email, userType, description, isActive]
            );
            res.status(200).json({ message: 'Request added successfully' });
        } catch (err) {
            console.error('Error inserting request:', err);
            res.status(500).json({ error: 'Failed to add request' });
        }
    });

    // 🔍 Find Buddy API (returns new fields too)
    router.get('/findBuddy', async (req, res) => {
        const { from, to, fromDate, toDate, userType } = req.query;

        try {
            let conditions = [];
            let values = [];
            let idx = 1;

            if (from) {
                conditions.push(`from_city = $${idx++}`);
                values.push(from);
            }
            if (to) {
                conditions.push(`to_city = $${idx++}`);
                values.push(to);
            }
            if (fromDate) {
                conditions.push(`date_time >= $${idx++}`);
                values.push(fromDate);
            }
            if (toDate) {
                conditions.push(`date_time <= $${idx++}`);
                values.push(toDate);
            }
            if (userType) {
                conditions.push(`user_type = $${idx++}`);
                values.push(userType);
            }
            let query = `SELECT * FROM travel_requests`;

            if (conditions.length > 0) {
                query += ' WHERE ' + conditions.join(' AND ') + ' AND isactive=true';
            } else {
                // If no conditions, just add WHERE isactive=true
                query += ' WHERE isactive=true';
            }

            query += ` ORDER BY date_time ASC`;

            const result = await pool.query(query, values);
            res.json(result.rows);
        } catch (err) {
            console.error('Error fetching buddy data:', err);
            res.status(500).json({ error: 'Failed to fetch buddy data' });
        }
    });
    router.get('/findBuddy/myad', async (req, res) => {
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
            let query = `SELECT * FROM travel_requests`;

            if (conditions.length > 0) {
                query += ' WHERE ' + conditions.join(' AND ');
            }

            query += ` ORDER BY date_time ASC`;

            const result = await pool.query(query, values);
            res.json(result.rows);
        } catch (err) {
            console.error('Error fetching my buddy requests:', err);
            res.status(500).json({ error: 'Failed to fetch my buddy requests' });
        }
    });
    // Toggle Active/Deactive status of a property
    router.patch('/findBuddy/toggleActive/:id', async (req, res) => {
        const { id } = req.params;
        // Validate the id if needed
        try {
            // Toggle isActive boolean in properties table and return updated row
            const updateQuery = `
        UPDATE travel_requests
        SET isActive = NOT isActive
        WHERE id = $1
        RETURNING *;
      `;
            const result = await pool.query(updateQuery, [id]);
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
    router.delete('/findBuddy/delete/:id', async (req, res) => {
        const { id } = req.params;
        try {
            const deleteQuery = 'DELETE FROM travel_requests WHERE id = $1 RETURNING *;';
            const result = await pool.query(deleteQuery, [id]);
            if (result.rows.length === 0) {
                return res.status(404).json({ message: 'Property not found' });
            }
            res.json({ message: 'Property deleted successfully' });
        } catch (error) {
            console.error('Delete property error:', error);
            res.status(500).json({ message: 'Failed to delete the property' });
        }
    });

    // Add more routes as needed

    return router;
};

