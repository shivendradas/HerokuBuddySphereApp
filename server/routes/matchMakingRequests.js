// routes/matchMakingRequests.js
const express = require('express');
const router = express.Router();

module.exports = (pool) => {

  // Create Table if not exists
  pool.query(`
    CREATE TABLE IF NOT EXISTS matchmaking_profiles (
      name VARCHAR(100),
      date_of_birth DATE,
      age INT,
      gender VARCHAR(20),
      marital_status VARCHAR(50),
      height INT,
      weight INT,
      religion VARCHAR(50),
      caste VARCHAR(100),
      mother_tongue VARCHAR(100),
      nationality VARCHAR(100),
      email VARCHAR(100) PRIMARY KEY,
      phone VARCHAR(20),
      education VARCHAR(200),
      occupation VARCHAR(200),
      annual_income NUMERIC,
      father_occupation VARCHAR(200),
      mother_occupation VARCHAR(200),
      siblings INT,
      family_type VARCHAR(50),
      food_habits VARCHAR(50),
      smoking_habit VARCHAR(50),
      drinking_habit VARCHAR(50),
      languages_known TEXT,
      about_yourself TEXT,
      partner_age_range VARCHAR(50),
      partner_height_range VARCHAR(50),
      partner_religion VARCHAR(50),
      partner_caste VARCHAR(100),
      partner_location VARCHAR(255),
      partner_education VARCHAR(200),
      partner_occupation VARCHAR(200),
      profile_image BYTEA,
      is_active BOOLEAN DEFAULT TRUE,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `);

  // Add profile
  router.post('/matchmaking/addProfile', async (req, res) => {
    const {
      name,
      dateOfBirth,
      age,
      gender,
      maritalStatus,
      height,
      weight,
      religion,
      caste,
      motherTongue,
      nationality,
      email,
      phone,
      education,
      occupation,
      annualIncome,
      fatherOccupation,
      motherOccupation,
      siblings,
      familyType,
      foodHabits,
      smokingHabit,
      drinkingHabit,
      languagesKnown,
      aboutYourself,
      partnerAgeRange,
      partnerHeightRange,
      partnerReligion,
      partnerCaste,
      partnerLocation,
      partnerEducation,
      partnerOccupation,
      profileImageData, // expect base64 image string
    } = req.body;

    try {
      let imageBuffer = null;
      if (profileImageData) {
        imageBuffer = Buffer.from(profileImageData, 'base64');
      }

      await pool.query(`
        INSERT INTO matchmaking_profiles (
          name, date_of_birth, age, gender, marital_status, height, weight, religion, caste, mother_tongue,
          nationality, email, phone, education, occupation, annual_income, father_occupation, mother_occupation,
          siblings, family_type, food_habits, smoking_habit, drinking_habit, languages_known, about_yourself,
          partner_age_range, partner_height_range, partner_religion, partner_caste, partner_location, partner_education,
          partner_occupation, profile_image
        )
        VALUES (
          $1,$2,$3,$4,$5,$6,$7,$8,$9,$10,
          $11,$12,$13,$14,$15,$16,$17,$18,
          $19,$20,$21,$22,$23,$24,$25,
          $26,$27,$28,$29,$30,$31,$32, $33
        )
      `, [
        name, dateOfBirth, age, gender, maritalStatus, height, weight, religion, caste, motherTongue,
        nationality, email, phone, education, occupation, annualIncome, fatherOccupation, motherOccupation,
        siblings, familyType, foodHabits, smokingHabit, drinkingHabit, languagesKnown, aboutYourself,
        partnerAgeRange, partnerHeightRange, partnerReligion, partnerCaste, partnerLocation, partnerEducation,
        partnerOccupation, imageBuffer
      ]);

      res.status(200).json({ message: 'Profile added successfully' });
    } catch (err) {
      console.error('Error adding profile:', err);
      res.status(500).json({ error: 'Failed to add profile' });
    }
  });

  // Search profiles with optional filters
  router.get('/matchmaking/search', async (req, res) => {
    try {
      const {
        name,
        gender,
        religion,
        maritalStatus,
        minAge,
        maxAge,
        location,
        isActive
      } = req.query;

      let conditions = [];
      let values = [];
      let idx = 1;

      if (name) {
        conditions.push(`name ILIKE $${idx++}`);
        values.push(`%${name}%`);
      }
      if (gender) {
        conditions.push(`gender = $${idx++}`);
        values.push(gender);
      }
      if (religion) {
        conditions.push(`religion = $${idx++}`);
        values.push(religion);
      }
      if (maritalStatus) {
        conditions.push(`marital_status = $${idx++}`);
        values.push(maritalStatus);
      }
      if (minAge) {
        conditions.push(`age >= $${idx++}`);
        values.push(minAge);
      }
      if (maxAge) {
        conditions.push(`age <= $${idx++}`);
        values.push(maxAge);
      }
      if (location) {
        conditions.push(`partner_location ILIKE $${idx++}`);
        values.push(`%${location}%`);
      }
      if (isActive !== undefined) {
        conditions.push(`is_active = $${idx++}`);
        values.push(isActive === 'true');
      } else {
        conditions.push(`is_active = true`);
      }

      let query = `SELECT * FROM matchmaking_profiles`;
      if (conditions.length > 0) {
        query += ' WHERE ' + conditions.join(' AND ');
      }
      query += ' ORDER BY created_at DESC';

      const result = await pool.query(query, values);
      res.json(result.rows);
    } catch (err) {
      console.error('Error fetching profiles:', err);
      res.status(500).json({ error: 'Failed to fetch profiles' });
    }
  });
  // Update profile by email
  router.put('/matchmaking/updateProfile/:email', async (req, res) => {
    const { email } = req.params;
    const {
      name,
      dateOfBirth,
      age,
      gender,
      maritalStatus,
      height,
      weight,
      religion,
      caste,
      motherTongue,
      nationality,
      phone,
      education,
      occupation,
      annualIncome,
      fatherOccupation,
      motherOccupation,
      siblings,
      familyType,
      foodHabits,
      smokingHabit,
      drinkingHabit,
      languagesKnown,
      aboutYourself,
      partnerAgeRange,
      partnerHeightRange,
      partnerReligion,
      partnerCaste,
      partnerLocation,
      partnerEducation,
      partnerOccupation,
      profileImageData,
      isActive,
    } = req.body;

    try {
      let imageBuffer = null;
      if (profileImageData) {
        imageBuffer = Buffer.from(profileImageData, 'base64');
      }

      // Build SQL update query with parameter placeholders
      // Include profile_image only if imageBuffer is provided
      let query = `
      UPDATE matchmaking_profiles
      SET name=$1, date_of_birth=$2, age=$3, gender=$4, marital_status=$5, height=$6, weight=$7,
          religion=$8, caste=$9, mother_tongue=$10, nationality=$11, phone=$12, education=$13,
          occupation=$14, annual_income=$15, father_occupation=$16, mother_occupation=$17,
          siblings=$18, family_type=$19, food_habits=$20, smoking_habit=$21, drinking_habit=$22,
          languages_known=$23, about_yourself=$24, partner_age_range=$25, partner_height_range=$26,
          partner_religion=$27, partner_caste=$28, partner_location=$29, partner_education=$30,
          partner_occupation=$31, is_active=$32
    `;

      const params = [
        name, dateOfBirth, age, gender, maritalStatus, height, weight, religion, caste, motherTongue,
        nationality, phone, education, occupation, annualIncome, fatherOccupation, motherOccupation,
        siblings, familyType, foodHabits, smokingHabit, drinkingHabit, languagesKnown, aboutYourself,
        partnerAgeRange, partnerHeightRange, partnerReligion, partnerCaste, partnerLocation, partnerEducation,
        partnerOccupation, isActive
      ];

      if (imageBuffer) {
        query += `, profile_image=$32 `;
        params.push(imageBuffer);
      }

      query += ` WHERE email=$${params.length + 1} RETURNING *;`;
      params.push(email);

      const result = await pool.query(query, params);

      if (result.rows.length === 0) {
        return res.status(404).json({ message: 'Profile not found to update' });
      }

      res.json({ message: 'Profile updated successfully', profile: result.rows[0] });
    } catch (err) {
      console.error('Error updating profile:', err);
      res.status(500).json({ error: 'Failed to update profile' });
    }
  });


  // Fetch profiles by email
  router.get('/matchmaking/myprofile', async (req, res) => {
    const { email } = req.query;
    if (!email) {
      return res.status(400).json({ error: 'Email query parameter is required' });
    }
    try {
      const result = await pool.query(`SELECT * FROM matchmaking_profiles WHERE email = $1 ORDER BY created_at DESC`, [email]);
      res.json(result.rows);
    } catch (err) {
      console.error('Error fetching profile by email:', err);
      res.status(500).json({ error: 'Failed to fetch profile' });
    }
  });

  // Toggle active status
  router.patch('/matchmaking/toggleActive/:profileId', async (req, res) => {
    const { profileId } = req.params;
    try {
      const updateQuery = `
        UPDATE matchmaking_profiles
        SET is_active = NOT is_active
        WHERE id = $1
        RETURNING *;
      `;
      const result = await pool.query(updateQuery, [profileId]);
      if (result.rows.length === 0) {
        return res.status(404).json({ message: 'Profile not found' });
      }
      res.json(result.rows[0]);
    } catch (err) {
      console.error('Toggle active error:', err);
      res.status(500).json({ message: 'Failed to update profile status' });
    }
  });

  // Delete profile by ID
  router.delete('/matchmaking/delete/:profileId', async (req, res) => {
    const { profileId } = req.params;
    try {
      const deleteQuery = 'DELETE FROM matchmaking_profiles WHERE id = $1 RETURNING *;';
      const result = await pool.query(deleteQuery, [profileId]);
      if (result.rows.length === 0) {
        return res.status(404).json({ message: 'Profile not found' });
      }
      res.json({ message: 'Profile deleted successfully' });
    } catch (err) {
      console.error('Delete profile error:', err);
      res.status(500).json({ message: 'Failed to delete profile' });
    }
  });

  return router;
};
