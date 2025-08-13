import express from 'express';
import { processRoomStrings } from './regex.js';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();
const PORT = process.env.PORT || 3000;
// Middleware to parse JSON bodies
app.use(express.json());
// Serve static files (HTML, CSS, JS)
app.use(express.static(__dirname));
// Root route serves the test page
app.get('/', (req, res) => {
    res.sendFile(join(__dirname, 'test.html'));
});
// Health check endpoint
app.get('/health', (req, res) => {
    res.json({ status: 'OK', message: 'Room matching service is running' });
});
// Main endpoint to compare room strings
app.post('/compare-rooms', (req, res) => {
    try {
        const { supplierroom, eps_room } = req.body;
        // Validate input
        if (!supplierroom || !eps_room) {
            return res.status(400).json({
                error: 'Missing required parameters',
                message: 'Both supplierroom and eps_room are required',
                example: {
                    supplierroom: 'deluxe room, 1 king bed',
                    eps_room: 'deluxe room, king'
                }
            });
        }
        // Process the room strings
        const isMatch = processRoomStrings(eps_room, supplierroom);
        // Return the result
        res.json({
            success: true,
            result: {
                supplierroom,
                eps_room,
                isMatch,
                timestamp: new Date().toISOString()
            }
        });
    }
    catch (error) {
        console.error('Error processing request:', error);
        res.status(500).json({
            error: 'Internal server error',
            message: 'Failed to process room comparison'
        });
    }
});
// Example usage endpoint
app.get('/example', (req, res) => {
    res.json({
        message: 'Example POST request to /compare-rooms',
        example: {
            method: 'POST',
            url: '/compare-rooms',
            headers: {
                'Content-Type': 'application/json'
            },
            body: {
                supplierroom: 'deluxe room, 1 king bed',
                eps_room: 'deluxe room, king'
            }
        },
        expectedResponse: {
            success: true,
            result: {
                supplierroom: 'deluxe room, 1 king bed',
                eps_room: 'deluxe room, king',
                isMatch: true,
                timestamp: '2024-01-01T00:00:00.000Z'
            }
        }
    });
});
app.listen(PORT, () => {
    console.log(`🚀 Room matching service running on port ${PORT}`);
    console.log(`📖 Health check: http://localhost:${PORT}/health`);
    console.log(`📖 Example usage: http://localhost:${PORT}/example`);
    console.log(`🔍 Compare rooms: POST http://localhost:${PORT}/compare-rooms`);
});
