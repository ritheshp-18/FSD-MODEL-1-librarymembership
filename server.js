const express = require("express");
const { MongoClient } = require("mongodb");
const path = require("path");
require("dotenv").config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "public")));

const client = new MongoClient(process.env.MONGO_URI);

let membersCollection;

async function connectDB() {
    try {
        await client.connect();

        const db = client.db("library_management");

        membersCollection = db.collection("members");

        console.log("MongoDB connected successfully");

    } catch (error) {
        console.error("MongoDB connection failed:", error);
    }
}

app.post("/api/members", async (req, res) => {
    try {
        const {
            memberId,
            name,
            email,
            phone,
            department,
            membershipType
        } = req.body;

        if (!memberId || !name || !email || !phone ||
            !department || !membershipType) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        const existingMember = await membersCollection.findOne({
            memberId: memberId
        });

        if (existingMember) {
            return res.status(400).json({
                success: false,
                message: "Member ID already exists"
            });
        }

        const member = {
            memberId,
            name,
            email,
            phone,
            department,
            membershipType
        };

        const result = await membersCollection.insertOne(member);

        res.json({
            success: true,
            message: "Member added successfully",
            insertedId: result.insertedId
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Failed to add member"
        });
    }
});


app.get("/api/members/:memberId", async (req, res) => {
    try {
        const memberId = req.params.memberId;

        const member = await membersCollection.findOne({
            memberId: memberId
        });

        if (!member) {
            return res.status(404).json({
                success: false,
                message: "Member not found"
            });
        }

        res.json({
            success: true,
            memberId: member.memberId,
            membershipType: member.membershipType
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Failed to find member"
        });
    }
});


app.get("/api/members", async (req, res) => {
    try {
        const members = await membersCollection.find().toArray();

        res.json({
            success: true,
            members: members
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch members"
        });
    }
});


const PORT = process.env.PORT || 8080;

connectDB().then(() => {
    app.listen(PORT, "0.0.0.0", () => {
        console.log(`Server running on port ${PORT}`);
    });
});