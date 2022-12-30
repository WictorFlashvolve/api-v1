const PNF = require('google-libphonenumber').PhoneNumberFormat;
const phoneUtil =
  require('google-libphonenumber').PhoneNumberUtil.getInstance();

module.exports = class Service {
  static async index(req, res) {
    res.status(200).json({ message: 'Welcome to API FLASHVOLVE' });
  }

  static async dataSave(req, res) {
    const phoneNumber = req.body.phoneNumber;
    if (req.body.phoneNumber !== phoneNumber) {
      res.status(400).json({ error: 'Invalid' });
    }
    const number = phoneUtil.parseAndKeepRawInput(phoneNumber, 'BR');
    const dataPhone = {
      dddi_country: number.getCountryCode(),
      original_phone: number.getNationalNumber(),
      bb: phoneUtil.isPossibleNumber(number),
      format_national: phoneUtil.format(number, PNF.NATIONAL),
      format_international: phoneUtil.format(number, PNF.INTERNATIONAL),
    };
    res.status(200).json({ message: dataPhone });
  }
};
