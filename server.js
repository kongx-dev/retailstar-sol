import express from 'express';
import axios from 'axios';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// GET /api/domains route
app.get('/api/domains', async (req, res) => {
  try {
    const baseId = process.env.VITE_BASE_ID;
    const tableName = process.env.VITE_AIRTABLE_TABLE_NAME || 'Domains';
    const apiKey = process.env.VITE_AIRTABLE_API_KEY;

    if (!baseId || !tableName || !apiKey) {
      return res.status(500).json({
        error: 'Missing required environment variables',
        required: ['VITE_BASE_ID', 'VITE_AIRTABLE_TABLE_NAME', 'VITE_AIRTABLE_API_KEY']
      });
    }

    const url = `https://api.airtable.com/v0/${baseId}/${encodeURIComponent(tableName)}`;
    const response = await axios.get(url, {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      }
    });

    res.json({
      success: true,
      data: response.data.records,
      count: response.data.records.length
    });
  } catch (error) {
    console.error('Airtable API Error:', error.response?.data || error.message);
    if (error.response?.status === 401) {
      return res.status(401).json({
        error: 'Unauthorized - Check your Airtable API key and permissions',
        details: error.response.data
      });
    }
    if (error.response?.status === 404) {
      return res.status(404).json({
        error: 'Not Found - Check your base ID and table name',
        details: error.response.data
      });
    }
    res.status(500).json({
      error: 'Internal server error',
      message: error.message
    });
  }
});

// Health check route
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`Airtable API endpoint: http://localhost:${PORT}/api/domains`);
}); 