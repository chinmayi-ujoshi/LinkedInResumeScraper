const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = 5000;  // Backend server running on port 5000

app.use(cors());
app.use(express.json());

//Proxycurl API call
app.get('/api/linkedin', async (req, res) => {
    const { url } = req.query;  // Get LinkedIn URL from frontend

    if (!url) {
        return res.status(400).json({ error: 'LinkedIn profile URL is required' });
    }

    const apiKey = process.env.PROXYCURL_API_KEY;  // Get API key from .env file
    const apiEndpoint = 'https://nubela.co/proxycurl/api/v2/linkedin';

    try {
        const response = await axios.get(apiEndpoint, {
            params: { linkedin_profile_url: url },
            headers: { Authorization: `Bearer ${apiKey}` },
        });

        res.json(response.data);  // Send the LinkedIn profile data to the frontend
    } catch (error) {
        console.error('Error fetching LinkedIn profile:', error.message);
        res.status(500).json({ error: 'Failed to fetch LinkedIn profile data' });
    }
});

// app.get('/api/linkedin', async (req, res) => {
//   const { url } = req.query;

//   if (!url) {
//     return res.status(400).json({ error: 'LinkedIn profile URL is required' });
//   }

//   // Mock response
//   const mockResponse = {
//     full_name: "John Doe",
//     email: "john.doe@example.com",
//     profile_picture_url: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.istockphoto.com%2Fphotos%2Fman&psig=AOvVaw2ERT-2P_DXGlEIIEgUL-LW&ust=1728348323693000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCMC88cyF-4gDFQAAAAAdAAAAABAE",  // Placeholder image
//     experiences: [
//       {
//         title: "Software Engineer",
//         company: "Tech Company",
//         start_date: "January 2020",
//         end_date: "Present",
//         description: "Working on full-stack development."
//       },
//       {
//         title: "Junior Developer",
//         company: "Another Company",
//         start_date: "June 2018",
//         end_date: "December 2019",
//         description: "Worked on front-end development."
//       }
//     ],
//     education: [
//       {
//         school: "University of Technology",
//         degree: "Bachelor of Science",
//         field_of_study: "Computer Science",
//         start_date: "2014",
//         end_date: "2018"
//       }
//     ]
//   };

//   // Send mock response to frontend
//   res.json(mockResponse);
// });


app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
