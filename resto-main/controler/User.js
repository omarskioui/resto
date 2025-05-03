const User = require ("../models/user")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
exports. signin = async (req, res) => {
    try {
        const found = await User.findOne({ email: req.body.email })
        if (!found) {
            res.status(400).send({ msg: "user not found" })
        }
        else {
            const match = bcrypt.compareSync(req.body.password, found.password)
            if (!match) {
                res.status(400).send({ msg: "password is incorrect" })
            }
            else {
                const secretkey = "abc123"
                const token = jwt.sign({ id: found._id, name: found.name }, secretkey, { expiresIn: "6d" })
                res.status(200).send({ msg: "login successfully", token, user: found })
            }
        }
    } catch (error) {
        res.status(500).send({ msg: "login failed", error })
    }
}

exports. signup = async (req, res) => {
    const {password,email} = req.body
    try {
        
          
        const salt = 10
        const hpassword = bcrypt.hashSync(password,salt)
        console.log(hpassword)
        const user = new User(req.body)
        user.password = hpassword
        await user.save()
       
        res.status(200).send({ msg: "account added successfully", user})

    } catch (error) {
        res.status(500).send({ msg: "failed to register", error })
    }
}
exports.updateuser = async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true })
        res.status(200).send(updatedUser)
        
    } catch (error) {
        res.status(500).send({ msg: "failed to update user", error })
        }
    }