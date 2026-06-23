const Parent = require('../models/parentSchema');
const Student = require('../models/studentSchema');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const parentRegister = async (req, res) => {
    try {
        const { email, password, name, phone, school, childrenRolls } = req.body;
        const existingParent = await Parent.findOne({ email });
        if (existingParent) {
            return res.send({ message: 'Email already exists' });
        }

        // Resolve students by roll numbers and school
        const students = await Student.find({ school, rollNum: { $in: childrenRolls } });
        const childrenIds = students.map(s => s._id);

        const parent = new Parent({
            name,
            email,
            password, // Will be hashed by mongoose pre-save hook
            phone,
            school,
            children: childrenIds
        });

        let result = await parent.save();
        result.password = undefined;

        const token = jwt.sign(
            { id: result._id, role: 'Parent', school: result.school },
            process.env.JWT_SECRET || 'fallback_secret',
            { expiresIn: '24h' }
        );

        res.send({ user: result, token });
    } catch (err) {
        res.status(500).json(err);
    }
};

const parentLogIn = async (req, res) => {
    const { email, password } = req.body;
    if (email && password) {
        try {
            let parent = await Parent.findOne({ email }).populate({
                path: 'children',
                populate: [
                    { path: 'sclassName', select: 'sclassName' },
                    { path: 'school', select: 'schoolName' }
                ]
            });
            if (parent) {
                const validated = await bcrypt.compare(password, parent.password);
                if (validated) {
                    parent.password = undefined;
                    const token = jwt.sign(
                        { id: parent._id, role: 'Parent', school: parent.school },
                        process.env.JWT_SECRET || 'fallback_secret',
                        { expiresIn: '24h' }
                    );
                    res.send({ user: parent, token });
                } else {
                    res.send({ message: "Invalid password" });
                }
            } else {
                res.send({ message: "Parent user not found" });
            }
        } catch (err) {
            res.status(500).json(err);
        }
    } else {
        res.send({ message: "Email and password are required" });
    }
};

const getParentDetail = async (req, res) => {
    try {
        let parent = await Parent.findById(req.params.id).populate({
            path: 'children',
            populate: [
                { path: 'sclassName', select: 'sclassName' },
                { path: 'school', select: 'schoolName' }
            ]
        });
        if (parent) {
            parent.password = undefined;
            res.send(parent);
        } else {
            res.send({ message: "No parent found" });
        }
    } catch (err) {
        res.status(500).json(err);
    }
};

module.exports = { parentRegister, parentLogIn, getParentDetail };
