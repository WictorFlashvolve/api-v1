const PNF = require('google-libphonenumber').PhoneNumberFormat;
const phoneUtil =
  require('google-libphonenumber').PhoneNumberUtil.getInstance();

module.exports = class Service {
  static async index(req, res) {
    res.status(200).json({ message: 'Welcome to API FLASHVOLVE' });
  }

  static async dataSave(req, res) {
    const countryNumber = req.body.country;
    if (!req.body.phoneNumber) {
      console.log({ error: 'Need a number valid' });
      return res.status(400).json({ error: 'Need a number valid' });
    }
    let phoneNumber = req.body.phoneNumber;
    phoneNumber = phoneNumber.replace(/[ÀÁÂÃÄÅ]/g, 'A');
    phoneNumber = phoneNumber.replace(/[àáâãäå]/g, 'a');
    phoneNumber = phoneNumber.replace(/[ÈÉÊË]/g, 'E');
    phoneNumber = phoneNumber.replace(/[^a-z0-9]/gi, '');

    const number = phoneUtil.parseAndKeepRawInput(phoneNumber, countryNumber);
    try {
      const dataPhone = {
        nation: phoneUtil.getRegionCodeForNumber(number),
        is_valid: phoneUtil.isValidNumberForRegion(number, countryNumber),
        dddi_country: number.getCountryCode(),
        original_phone: number.getNationalNumber(),
        format_national: phoneUtil.format(number, PNF.NATIONAL),
        format_international: phoneUtil.format(number, PNF.INTERNATIONAL),
      };
      if (phoneUtil.isValidNumberForRegion(number, countryNumber) == false) {
        console.log({ error: 'does not have a ninth or invalid digit' });
        return res
          .status(400)
          .json({ error: 'does not have a ninth or invalid digit' });
      }
      if (dataPhone.nation === 'BR') {
        if (dataPhone.format_national.length < 15) {
          console.log({ error: 'Invalid national number' });
          return res.status(400).json({ message: 'number invalid' });
        }
      }
      console.log(dataPhone);
      res.status(200).json({ message: dataPhone });
    } catch (error) {
      return console.log(`🔥 ${error}`);
    }
  }
};
