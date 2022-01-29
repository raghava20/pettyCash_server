import jwt from "jsonwebtoken"

export const auth = async (req, res, next) => {
    if (!req.headers['token']) return res.status(401).send({ message: "Token doesn't exists" }) //checking the token is exist or not

    try {
        const decodedToken = await jwt.verify(req.headers['token'], process.env.SECRET_KEY)     //checking the token is correct
        req.body.user = decodedToken;
        next();
    }
    catch (err) {
        res.send(err)
    }
}