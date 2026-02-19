const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.post("/leetcode", async (req, res) => {
    try {
        console.log("Incoming request body:", req.body);

        const response = await fetch("https://leetcode.com/graphql", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "User-Agent": "Mozilla/5.0",
                "Referer": "https://leetcode.com/"
            },
            body: JSON.stringify(req.body),
        });

        const data = await response.json();

        console.log("LeetCode response:", data);

        res.json(data);

    } catch (error) {
        console.error("Server Error:", error);
        res.status(500).json({ error: error.message });
    }
});

app.listen(5000, () => {
    console.log("Server running on http://localhost:5000");
});
