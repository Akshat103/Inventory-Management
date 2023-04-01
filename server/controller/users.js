const userModel = require("../models/users");

class User {

  async postAddUser(req, res) {
    let { name, email, password } = req.body;
    if (
      !name ||
      !email ||
      !password
    ) {
      return res.json({ message: "All filled must be required" });
    } else {
      try {
        let newUser = new userModel({
          name, email, password
        });
        let save = await newUser.save();
        if (save) {
          return res.json({ success: "User created successfully" });
        }
      } catch (err) {
        return res.json({ error: error });
      }
    }
  }

}

const ordersController = new User();
module.exports = ordersController;
