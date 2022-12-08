import connectToDatabase from "../../config/database";

export default async function handler (req, res) {
    const db = await connectToDatabase();

    const Users = await db.collection('users')
    const allUsers = await Users
    .find({})
    .sort({_id: -1})
    .toArray();

    res.json(allUsers)
}