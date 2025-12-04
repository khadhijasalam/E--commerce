const jwt = require("jsonwebtoken");


// Creating middleware to fetch user
const fetchUser = async (req, res, next) => {
    const token = req.header('auth-token');
    if (!token) {
        return res.status(401).send({ errors: "Please authenticate using valid token" });
    }
    else {
        try {
            const data = jwt.verify(token, process.env.JWT_SECRET)
            next();
        } catch (error) {
            res.status(401).send({ errors: "Please authenticate using valid token" });
        }
    }
}

module.exports=fetchUser;