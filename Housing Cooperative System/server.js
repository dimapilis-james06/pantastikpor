const express = require('express');
const cors = require('cors');
const residentRoutes = require('./routes/residentRoute');
const maintenanceRoutes = require('./routes/maintenanceRoute');
const announcementRoutes = require('./routes/announcementRoute');
const attendeesRoutes = require('./routes/attendeesRoute');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/residents', residentRoutes);
app.use('/api/maintenance', maintenanceRoutes);
app.use('/api/announcements', announcementRoutes);
app.use('/api/attendees', attendeesRoutes);



app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
//   console.log(`API URL: http://localhost:${PORT}/api/residents`);
});