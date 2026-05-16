const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
const PORT = 3000;

// middleware
app.use(cors());
app.use(express.json());

// API endpoint
app.get('/api/schooltrips', (req, res) => {
  // Return some sample data
  const schoolTrips = [
    {
      id: 1,
      name: "Sataflia",
      description: "Explore dinosaur footprints, ancient caves, and stunning glass walkways in this nature reserve",
      date: "2023-06-15"
    },
    {
      id: 2,
      name: "Gelati",
      description: "UNESCO World Heritage site with breathtaking medieval frescoes and rich history",
      date: "2023-07-01"
    },
    {
      id: 3,
      name: "Signagi",
      description: "The 'City of Love' with panoramic Alazani Valley views and charming cobblestone streets",
      date: "2023-07-15"
    },
    {
      id: 4,
      name: "Motsameta",
      description: "Cliff-edge monastery surrounded by lush forests and the scenic Tskaltsitela River canyon",
      date: "2023-08-01"
    }
  ];
  res.json(schoolTrips);
});

// Serve static files from the React app build directory
app.use(express.static(path.join(__dirname, '..', 'dist')));

// Catch all handler: send back index.html for any non-API routes
app.get(/^\/(?!api).*/, (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});