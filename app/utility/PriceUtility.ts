import CurrencyLocale from 'models/CurrencyLocale';

interface InternalNumberFormatPart {
  type: string;
  value: string;
}

export default class PriceUtility {
  public static format(price: number, currencyLocale: CurrencyLocale): string {
    return new Intl.NumberFormat(currencyLocale.locale, {
      style: 'currency',
      currency: currencyLocale.currency,
      maximumFractionDigits: 10,
    }).format(price);
  }

  public static formatMarketCap(
    price: number,
    currencyLocale: CurrencyLocale,
  ): string {
    const currencyFormat = new Intl.NumberFormat(currencyLocale.locale, {
      style: 'currency',
      currency: currencyLocale.currency,
    });

    const currencySymbol = currencyFormat
      .formatToParts()
      .find(e => e.type === 'currency')?.value;
    const parts = new Intl.NumberFormat(currencyLocale.locale, {
      notation: 'compact',
      compactDisplay: 'long',
      minimumSignificantDigits: 2,
      maximumSignificantDigits: 4,
    }).formatToParts(price);

    return currencySymbol + formatMarketCapValue(parts);
  }
}

const formatMarketCapValue = (parts: InternalNumberFormatPart[]): string => {
  let outputValue = '';

  parts.forEach(part => {
    if (part.type === 'compact') {
      part.value =
        part.value.substring(0, 1).toUpperCase() + part.value.substring(1);
    }

    if (part.type === 'fraction') {
      part.value = part.value.substr(0, 2);
    }

    outputValue += part.value;
  });

  return outputValue;
};
