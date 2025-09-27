const express = require('express');
const cors = require('cors');
const fs = require('fs').promises;
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const DATA_FILE = path.join(__dirname, 'registrations.json');

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public')); // Serve static files

// Initialize data file if it doesn't exist
async function initializeDataFile() {
    try {
        await fs.access(DATA_FILE);
    } catch (error) {
        // File doesn't exist, create it with empty array
        await fs.writeFile(DATA_FILE, JSON.stringify([], null, 2));
        console.log('📁 Created new registrations.json file');
    }
}

// Helper function to read registrations from file
async function readRegistrations() {
    try {
        const data = await fs.readFile(DATA_FILE, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Error reading registrations:', error);
        return [];
    }
}

// Helper function to write registrations to file
async function writeRegistrations(registrations) {
    try {
        await fs.writeFile(DATA_FILE, JSON.stringify(registrations, null, 2));
    } catch (error) {
        console.error('Error writing registrations:', error);
        throw error;
    }
}

// Email validation function
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Routes

// GET / - Serve the registration page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// POST /register - Handle registration submission
app.post('/register', async (req, res) => {
    try {
        const { name, email, phone, organization, role, experience, interests } = req.body;

        // Validation
        if (!name || !email) {
            return res.status(400).json({
                success: false,
                error: 'Name and email are required'
            });
        }

        if (name.trim().length < 2) {
            return res.status(400).json({
                success: false,
                error: 'Name must be at least 2 characters long'
            });
        }

        if (!isValidEmail(email.trim())) {
            return res.status(400).json({
                success: false,
                error: 'Please provide a valid email address'
            });
        }

        // Read existing registrations
        const registrations = await readRegistrations();

        // Check for duplicate email
        const existingRegistration = registrations.find(
            reg => reg.email.toLowerCase() === email.trim().toLowerCase()
        );

        if (existingRegistration) {
            return res.status(409).json({
                success: false,
                error: 'This email is already registered'
            });
        }

        // Create new registration
        const newRegistration = {
    id: Date.now(),
    name: name.trim(),
    phone: phone ? phone.trim() : '',
    email: email.trim().toLowerCase(),
    timestamp: new Date().toISOString(),
    role: role || '',
     interests: interests ? interests.trim() : '',
    registrationNumber: registrations.length + 1
};

        // Add to registrations array
        registrations.push(newRegistration);

        // Save to file
        await writeRegistrations(registrations);

        // Log to console
        console.log('🎉 New Registration for Tech Summit 2025:');
        console.log('📝 Name:', newRegistration.name);
        console.log('📧 Email:', newRegistration.email);
        console.log('📱 Phone:', newRegistration.phone || 'Not provided');
        console.log('🏢 Organization:', newRegistration.organization || 'Not provided');
        console.log('👤 Role:', newRegistration.role || 'Not specified');
        console.log('📈 Experience:', newRegistration.experience || 'Not specified');
        console.log('🎯 Interests:', newRegistration.interests || 'Not specified');
        console.log('🕐 Time:', new Date(newRegistration.timestamp).toLocaleString());
        console.log('📊 Total Registrations:', registrations.length);
        console.log('-----------------------------------');

        // Send success response
        res.status(201).json({
            success: true,
            message: 'Registration successful!',
            data: {
                id: newRegistration.id,
                name: newRegistration.name,
                email: newRegistration.email,
                phone: newRegistration.phone,
                organization: newRegistration.organization,
                role: newRegistration.role,
                experience: newRegistration.experience,
                interests: newRegistration.interests,
                registrationNumber: newRegistration.registrationNumber,
                timestamp: newRegistration.timestamp
            }
        });

    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({
            success: false,
            error: 'Internal server error. Please try again.'
        });
    }
});

// GET /registrations - Get all registrations
app.get('/registrations', async (req, res) => {
    try {
        const registrations = await readRegistrations();
        
        // Sort by timestamp (newest first)
        const sortedRegistrations = registrations.sort(
            (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
        );

        res.json({
            success: true,
            count: registrations.length,
            data: sortedRegistrations
        });

    } catch (error) {
        console.error('Error fetching registrations:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to fetch registrations'
        });
    }
});

// GET /registrations/count - Get registration count
app.get('/registrations/count', async (req, res) => {
    try {
        const registrations = await readRegistrations();
        res.json({
            success: true,
            count: registrations.length
        });
    } catch (error) {
        console.error('Error getting count:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to get registration count'
        });
    }
});

// DELETE /registrations/:id - Delete a registration (for admin use)
app.delete('/registrations/:id', async (req, res) => {
    try {
        const registrationId = parseInt(req.params.id);
        const registrations = await readRegistrations();
        
        const registrationIndex = registrations.findIndex(
            reg => reg.id === registrationId
        );

        if (registrationIndex === -1) {
            return res.status(404).json({
                success: false,
                error: 'Registration not found'
            });
        }

        // Remove the registration
        const deletedRegistration = registrations.splice(registrationIndex, 1)[0];
        
        // Save updated registrations
        await writeRegistrations(registrations);

        console.log('🗑️ Registration deleted:', deletedRegistration.email);

        res.json({
            success: true,
            message: 'Registration deleted successfully',
            data: deletedRegistration
        });

    } catch (error) {
        console.error('Delete error:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to delete registration'
        });
    }
});

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({
        success: true,
        message: 'Event Registration Server is running!',
        timestamp: new Date().toISOString()
    });
});

// 404 handler
app.use('*', (req, res) => {
    res.status(404).json({
        success: false,
        error: 'Endpoint not found'
    });
});

// Error handling middleware
app.use((error, req, res, next) => {
    console.error('Unhandled error:', error);
    res.status(500).json({
        success: false,
        error: 'Something went wrong!'
    });
});

// Start server
async function startServer() {
    try {
        await initializeDataFile();
        
        app.listen(PORT, () => {
            console.log('🚀 Event Registration Server Started!');
            console.log(`📍 Server running on: http://localhost:${PORT}`);
            console.log(`📁 Data file: ${DATA_FILE}`);
            console.log('-----------------------------------');
            console.log('Available endpoints:');
            console.log('📝 POST /register - Submit registration');
            console.log('📋 GET /registrations - View all registrations');
            console.log('📊 GET /registrations/count - Get registration count');
            console.log('❤️ GET /health - Health check');
            console.log('-----------------------------------');
        });
        
    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
}

// Handle graceful shutdown
process.on('SIGINT', () => {
    console.log('\n🛑 Server shutting down gracefully...');
    process.exit(0);
});

// Start the server
startServer();
