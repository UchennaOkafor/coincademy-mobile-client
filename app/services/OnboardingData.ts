import OnboardingCarouselItem from '@models/OnboardingCarouselItem';

export default class OnboardingData {
  static getCarouselItems() {
    const items: OnboardingCarouselItem[] = [
      {
        uri: 'https://ouch-cdn2.icons8.com/3AJDAtGJK8yJNkrBIr8TAGFeI1LGOGhOSPQTCB6mBRg/rs:fit:456:456/czM6Ly9pY29uczgu/b3VjaC1wcm9kLmFz/c2V0cy9zdmcvMTQy/L2UwMmRiMmI3LTc2/NzgtNGU4ZC1iNTc1/LTZmNjk0ZjBjYmNj/MC5zdmc.png',
        title: 'Learn Crypto',
        description:
          'A fun way to learn and explore the world of cryptocurrencies.',
      },
      {
        uri: 'https://ouch-cdn2.icons8.com/vS0N5EBMzu5sCInhQ68aMnucLx67F8oskyszSgpBDWM/rs:fit:456:456/czM6Ly9pY29uczgu/b3VjaC1wcm9kLmFz/c2V0cy9zdmcvMjM0/L2YwZTI2ZTEzLWIy/ZWEtNDFkMi05MjRh/LTY4ZDg1Y2UyYTVi/OC5zdmc.png',
        title: 'Earn Rewards',
        description: 'Get rewarded with Eko tokens as you learn and complete challenges.',
      },
      {
        uri: 'https://ouch-cdn2.icons8.com/42ASHOv4yirDsYAUQni0xeWBS7kf11a3AUtt3Wpzxl8/rs:fit:456:456/czM6Ly9pY29uczgu/b3VjaC1wcm9kLmFz/c2V0cy9zdmcvODc2/LzE1ZjJhOGVkLTE1/NTgtNDc2MC04NGIz/LTExOTZhODQ4Yzk5/My5zdmc.png',
        title: 'Ready to start?',
        description: "You're only a tap away.",
      },
    ];

    return items;
  }
}
