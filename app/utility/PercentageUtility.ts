import { Theme } from 'styles/Index';

const getColorValue = (percentage: number) => {
  if (percentage === 0) {
    return Theme.colors.gray;
  }

  return percentage > 0 ? Theme.colors.green : Theme.colors.red;
};

interface PercentageValues {
  value: string;
  color: string;
}

export default class PercentageUtility {
  public static getFormat(percentage: number): PercentageValues {
    const value = `${percentage > 0 ? '+' : ''}${percentage.toFixed(2)}%`;
    const color = getColorValue(percentage);

    return {
      value,
      color,
    };
  }
}
