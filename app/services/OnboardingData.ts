import OnboardingCarouselItem from '@models/OnboardingCarouselItem';

export default class OnboardingData {
  static getCarouselItems() {
    const items: OnboardingCarouselItem[] = [
      {
        uri: 'https://cdni.iconscout.com/illustration/premium/thumb/bitcoin-trading-3323944-2809536.png',
        title: 'Learn Crypto',
        description:
          'A fun way to learn and explore the world of cryptocurrencies.',
      },
      {
        uri: 'https://cdni.iconscout.com/illustration/premium/thumb/businessman-trading-bitcoins-3323946-2809538.png',
        title: 'Earn Rewards',
        description: 'Get rewarded with Eko tokens as you learn and complete challenges.',
      },
      {
        uri: 'https://cdni.iconscout.com/illustration/premium/thumb/initial-coin-offering-3323945-2809537.png',
        title: 'Ready to start?',
        description: "You're only a tap away.",
      },
    ];

    return items;
  }
}
