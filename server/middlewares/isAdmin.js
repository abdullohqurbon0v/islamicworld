const jwt = require("jsonwebtoken");

function isAdminMiddleware(req,res,next) {
     const token = req.headers.authorization?.split(" ")[1];
      if (!token) {
        return res.status(401).json({ message: "Token yoq" });
      }
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log(decoded)
        if(decoded.user.email !== 'admin@gmail.com') {
            return res.status(400).json({
                message: "Savolar faqat admin tomonlama yarata olinishi mumkun"
            })
        } else {
            next()
        }
      } catch (error) {
        return res.status(401).json({ message: "Tokenda hatolik" });
      }
}

module.exports = isAdminMiddleware
