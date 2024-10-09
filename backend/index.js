const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

/**
 * Fetch image from a URL and convert it to base64 format.
 * @param {string} url - The URL of the image.
 * @returns {string} - The base64 encoded image.
 */
const fetchBase64Image = async (url) => {
  try {
    const response = await axios.get(url, {
      responseType: 'arraybuffer', // Fetch the image as binary data
    });
    const buffer = Buffer.from(response.data, 'binary').toString('base64');
    return `data:${response.headers['content-type']};base64,${buffer}`;
  } catch (error) {
    console.error(`Failed to fetch or convert image: ${error.message}`);
    throw new Error('Image fetch or conversion failed');
  }
};

// Proxycurl API handler
app.get('/api/linkedin', async (req, res) => {
  const { url } = req.query;

  if (!url) {
    return res.status(400).json({ error: 'LinkedIn profile URL is required' });
  }

  try {
    const profileResponse = await axios.get('https://nubela.co/proxycurl/api/v2/linkedin', {
      params: { linkedin_profile_url: url },
      headers: { Authorization: `Bearer ${process.env.PROXYCURL_API_KEY}` },
    });

    const profileData = profileResponse.data;

    // Convert the profile picture to Base64 if it exists
    if (profileData.profile_pic_url) {
      try {
        profileData.profile_pic_base64 = await fetchBase64Image(profileData.profile_pic_url);
      } catch (err) {
        console.error('Failed to convert profile picture to base64:', err.message);
        // Optionally, provide a default base64 placeholder or null
        profileData.profile_pic_base64 = null;
      }
    }

    res.json(profileData); // Send the modified profile data back to the frontend
  } catch (error) {
    console.error('Failed to fetch LinkedIn profile data:', error.message);
    res.status(500).json({ error: 'Failed to fetch LinkedIn profile data' });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
