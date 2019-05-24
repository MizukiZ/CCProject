import { countries, currencies, lookup } from "country-data"

const CountryInfomation = {
  AUD: {
    flag: require("./country_flags/AUD.png"),
    countryName: countryName("AUD"),
    currencyName: currencyName("AUD"),
    currencySymbol: currencySymbol("AUD"),
    countryEmoji: countryEmoji("AUD")
  },
  BGN: {
    flag: require("./country_flags/BGN.png"),
    countryName: countryName("BGN"),
    currencyName: currencyName("BGN"),
    currencySymbol: currencySymbol("BGN"),
    countryEmoji: countryEmoji("BGN")
  },
  BRL: {
    flag: require("./country_flags/BRL.png"),
    countryName: countryName("BRL"),
    currencyName: currencyName("BRL"),
    currencySymbol: currencySymbol("BRL"),
    countryEmoji: countryEmoji("BRL")
  },
  CAD: {
    flag: require("./country_flags/CAD.png"),
    countryName: countryName("CAD"),
    currencyName: currencyName("CAD"),
    currencySymbol: currencySymbol("CAD"),
    countryEmoji: countryEmoji("CAD")
  },
  CHF: {
    flag: require("./country_flags/CHF.png"),
    countryName: countryName("CHF"),
    currencyName: currencyName("CHF"),
    currencySymbol: currencySymbol("CHF"),
    countryEmoji: countryEmoji("CHF")
  },
  CNY: {
    flag: require("./country_flags/CNY.png"),
    countryName: countryName("CNY"),
    currencyName: currencyName("CNY"),
    currencySymbol: currencySymbol("CNY"),
    countryEmoji: countryEmoji("CNY")
  },
  CZK: {
    flag: require("./country_flags/CZK.png"),
    countryName: countryName("CZK"),
    currencyName: currencyName("CZK"),
    currencySymbol: currencySymbol("CZK"),
    countryEmoji: countryEmoji("CZK")
  },
  DKK: {
    flag: require("./country_flags/DKK.png"),
    countryName: countryName("DKK"),
    currencyName: currencyName("DKK"),
    currencySymbol: currencySymbol("DKK"),
    countryEmoji: countryEmoji("DKK")
  },
  EUR: {
    flag: require("./country_flags/EUR.png"),
    countryName: countryName("EUR"),
    currencyName: currencyName("EUR"),
    currencySymbol: currencySymbol("EUR"),
    countryEmoji: countryEmoji("EUR")
  },
  GBP: {
    flag: require("./country_flags/GBP.png"),
    countryName: countryName("GBP"),
    currencyName: currencyName("GBP"),
    currencySymbol: currencySymbol("GBP"),
    countryEmoji: countryEmoji("GBP")
  },
  HKD: {
    flag: require("./country_flags/HKD.png"),
    countryName: countryName("HKD"),
    currencyName: currencyName("HKD"),
    currencySymbol: currencySymbol("HKD"),
    countryEmoji: countryEmoji("HKD")
  },
  HRK: {
    flag: require("./country_flags/HRK.png"),
    countryName: countryName("HRK"),
    currencyName: currencyName("HRK"),
    currencySymbol: currencySymbol("HRK"),
    countryEmoji: countryEmoji("HRK")
  },
  HUF: {
    flag: require("./country_flags/HUF.png"),
    countryName: countryName("HUF"),
    currencyName: currencyName("HUF"),
    currencySymbol: currencySymbol("HUF"),
    countryEmoji: countryEmoji("HUF")
  },
  IDR: {
    flag: require("./country_flags/IDR.png"),
    countryName: countryName("IDR"),
    currencyName: currencyName("IDR"),
    currencySymbol: currencySymbol("IDR"),
    countryEmoji: countryEmoji("IDR")
  },
  ILS: {
    flag: require("./country_flags/ILS.png"),
    countryName: countryName("ILS"),
    currencyName: currencyName("ILS"),
    currencySymbol: currencySymbol("ILS"),
    countryEmoji: countryEmoji("ILS")
  },
  INR: {
    flag: require("./country_flags/INR.png"),
    countryName: countryName("INR"),
    currencyName: currencyName("INR"),
    currencySymbol: currencySymbol("INR"),
    countryEmoji: countryEmoji("INR")
  },
  ISK: {
    flag: require("./country_flags/ISK.png"),
    countryName: countryName("ISK"),
    currencyName: currencyName("ISK"),
    currencySymbol: currencySymbol("ISK"),
    countryEmoji: countryEmoji("ISK")
  },
  JPY: {
    flag: require("./country_flags/JPY.png"),
    countryName: countryName("JPY"),
    currencyName: currencyName("JPY"),
    currencySymbol: countryEmoji("JPY"),
    countryEmoji: currencySymbol("JPY")
  },
  KRW: {
    flag: require("./country_flags/KRW.png"),
    countryName: countryName("KRW"),
    currencyName: currencyName("KRW"),
    currencySymbol: currencySymbol("KRW"),
    countryEmoji: countryEmoji("KRW")
  },
  MXN: {
    flag: require("./country_flags/MXN.png"),
    countryName: countryName("MXN"),
    currencyName: currencyName("MXN"),
    currencySymbol: currencySymbol("MXN"),
    countryEmoji: countryEmoji("MXN")
  },
  MYR: {
    flag: require("./country_flags/MYR.png"),
    countryName: countryName("MYR"),
    currencyName: currencyName("MYR"),
    currencySymbol: currencySymbol("MYR"),
    countryEmoji: countryEmoji("MYR")
  },
  NOK: {
    flag: require("./country_flags/NOK.png"),
    countryName: countryName("NOK"),
    currencyName: currencyName("NOK"),
    currencySymbol: currencySymbol("NOK"),
    countryEmoji: countryEmoji("NOK")
  },
  NZD: {
    flag: require("./country_flags/NZD.png"),
    countryName: countryName("NZD"),
    currencyName: currencyName("NZD"),
    currencySymbol: currencySymbol("NZD"),
    countryEmoji: countryEmoji("NZD")
  },
  PHP: {
    flag: require("./country_flags/PHP.png"),
    countryName: countryName("PHP"),
    currencyName: currencyName("PHP"),
    currencySymbol: currencySymbol("PHP"),
    countryEmoji: countryEmoji("PHP")
  },
  PLN: {
    flag: require("./country_flags/PLN.png"),
    countryName: countryName("PLN"),
    currencyName: currencyName("PLN"),
    currencySymbol: currencySymbol("PLN"),
    countryEmoji: countryEmoji("PLN")
  },
  RON: {
    flag: require("./country_flags/RON.png"),
    countryName: countryName("RON"),
    currencyName: currencyName("RON"),
    currencySymbol: currencySymbol("RON"),
    countryEmoji: countryEmoji("RON")
  },
  RUB: {
    flag: require("./country_flags/RUB.png"),
    countryName: countryName("RUB"),
    currencyName: currencyName("RUB"),
    currencySymbol: currencySymbol("RUB"),
    countryEmoji: countryEmoji("RUB")
  },
  SEK: {
    flag: require("./country_flags/SEK.png"),
    countryName: countryName("SEK"),
    currencyName: currencyName("SEK"),
    currencySymbol: currencySymbol("SEK"),
    countryEmoji: countryEmoji("SEK")
  },
  SGD: {
    flag: require("./country_flags/SGD.png"),
    countryName: countryName("SGD"),
    currencyName: currencyName("SGD"),
    currencySymbol: currencySymbol("SGD"),
    countryEmoji: countryEmoji("SGD")
  },
  THB: {
    flag: require("./country_flags/THB.png"),
    countryName: countryName("THB"),
    currencyName: currencyName("THB"),
    currencySymbol: currencySymbol("THB"),
    countryEmoji: countryEmoji("THB")
  },
  TRY: {
    flag: require("./country_flags/TRY.png"),
    countryName: countryName("TRY"),
    currencyName: currencyName("TRY"),
    currencySymbol: currencySymbol("TRY"),
    countryEmoji: countryEmoji("TRY")
  },
  USD: {
    flag: require("./country_flags/USD.png"),
    countryName: countryName("USD"),
    currencyName: currencyName("USD"),
    currencySymbol: currencySymbol("USD"),
    countryEmoji: countryEmoji("USD")
  },
  ZAR: {
    flag: require("./country_flags/ZAR.png"),
    countryName: countryName("ZAR"),
    currencyName: currencyName("ZAR"),
    currencySymbol: currencySymbol("ZAR"),
    countryEmoji: countryEmoji("ZAR")
  }
}

function countryName(code) {
  return lookup.countries({ currencies: code })[0].name
}

function currencyName(code) {
  return lookup.currencies({ code: code })[0].name
}

function currencySymbol(code) {
  return lookup.currencies({ code: code })[0].symbol
}

function countryEmoji(code) {
  return lookup.countries({ currencies: code })[0].emoji
}

export default CountryInfomation
