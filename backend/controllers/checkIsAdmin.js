const checkIsAdmin = (req, res,next) => {
    const { email, password } = req.body;
    if (!email) {
      return res.status(404).send("email is required")
    }
    if (!password) {
      return res.status(404).send("password is required")
    }
    if(email === 'admin@gmail.com' && password === "admin@123"){
        return res.status(200).send({
            role: 2,
            name:"Admin",
        });
    }
    next();
  };
  
  module.exports = checkIsAdmin;