module.exports = class Service {
  static async index(req, res) {
    res.status(200).json({ message: 'Welcome to API FLASHVOLVE' });
  }

  static async dataSave(req, res) {
    const { email, phoneNumber } = req.body;
    const data = {
      email,
      phoneNumber,
    };
    res.status(201).json({ created: data });
  }
};
