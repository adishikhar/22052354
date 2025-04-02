const express = require('express');
const axios = require('axios');

const app = express();
const PORT = 3000;

// Sliding window storage
const WINDOW_SIZE = 10;
let numberWindow = new Set(); // Using Set to ensure uniqueness

// Function to fetch numbers from the third-party API
const fetchNumbers = async (numberType) => {
    const apiUrl = `http://20.244.56.144/evaluation-service/prime`;
    
    try {
        const response = await axios.get(apiUrl, { timeout: 500 });
        return response.data.numbers || [];
    } catch (error) {
        console.error("API request failed:", error.message);
        return [];
    }
};

// Function to maintain sliding window
const updateWindow = (newNumbers) => {
    newNumbers.forEach(num => numberWindow.add(num));
    
    while (numberWindow.size > WINDOW_SIZE) {
        numberWindow.delete([...numberWindow][0]); // Remove the oldest number
    }
};

// API Endpoint: GET /numbers/:numberid
app.get('/numbers/:numberid', async (req, res) => {
    const { numberid } = req.params;
    if (!(['p', 'f', 'e', 'r'].includes(numberid))) {
        return res.status(400).json({ error: "Invalid number ID. Use 'p', 'f', 'e', or 'r'." });
    }

    const prevState = [...numberWindow]; // Snapshot before API call
    const fetchedNumbers = await fetchNumbers(numberid);
    updateWindow(fetchedNumbers);
    const currState = [...numberWindow]; // Snapshot after API call

    // Calculate average
    const avg = currState.length ? (currState.reduce((sum, num) => sum + num, 0) / currState.length).toFixed(2) : 0;

    // Response format
    res.json({
        windowPrevState: prevState,
        windowCurrState: currState,
        numbers: fetchedNumbers,
        avg: parseFloat(avg)
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
