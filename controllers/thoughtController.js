const { Thought, User } = require("../models");

module.exports = {

async getThoughts(req, res) {
    try {
        const thought = await Thought.find();
        res.json(err);
    } catch (err) {
        res.status(500).json(err);
    }
},

async getSingleThought(req, res) {
    try {
        const thought = await Thought.findOne({
            _id: req.params.thoughtId,
        }).select("__V");

    if (!thought) {
        return res
            .status(404)
            .json({ message: "There is no thought associated with that ID." });
        }
        res.json(thought);
    } catch (err) {
        res.status(500).json(err);
    }
},

async createThought(req, res) {
    try {
        const thought = await Thought.create(req.body);
        User.findOneAndUpdate(
            { _id: req.body._id },
            { $push: { thoughts: thought._id } }
        );

        res.json(thought);
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
},

async deleteThought(req, res) {
    try {
        const thought = await Thought.findOneAndDelete({
            _id: req.params.thoughtId,
        });

        if (!thought) {
            res.status(404).json({ message: "There is no thought with that ID" });
        }
        await Thought.deleteMany({ _id: { $in: thought.students } });
        res.json({ message: "The User and their Thought was deleted!" });
    } catch (err) {}
},

async updateThought(req, res) {
    try {
        const thought = await Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $set: req.body },
            { runValidators: true, new: true }
        );

        if (!thought) {
            res.status(404).json({ message: "Error. No thought" });
        }
        res.json(thought);
    } catch (err) {
        res.status(500).json(err);
    }
},
};  