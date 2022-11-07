import OnboardingCarouselItem from '@models/OnboardingCarouselItem';
import EmojiItem from '@models/EmojiItem';

export default class OnboardingData {
  static getCarouselItems() {
    const items: OnboardingCarouselItem[] = [
      {
        uri: 'https://ouch-cdn2.icons8.com/3AJDAtGJK8yJNkrBIr8TAGFeI1LGOGhOSPQTCB6mBRg/rs:fit:456:456/czM6Ly9pY29uczgu/b3VjaC1wcm9kLmFz/c2V0cy9zdmcvMTQy/L2UwMmRiMmI3LTc2/NzgtNGU4ZC1iNTc1/LTZmNjk0ZjBjYmNj/MC5zdmc.png',
        title: 'Learn Crypto',
        description:
          'A fun way to learn and explore the world of cryptocurrencies.'
      },
      {
        uri: 'https://ouch-cdn2.icons8.com/vS0N5EBMzu5sCInhQ68aMnucLx67F8oskyszSgpBDWM/rs:fit:456:456/czM6Ly9pY29uczgu/b3VjaC1wcm9kLmFz/c2V0cy9zdmcvMjM0/L2YwZTI2ZTEzLWIy/ZWEtNDFkMi05MjRh/LTY4ZDg1Y2UyYTVi/OC5zdmc.png',
        title: 'Earn Rewards',
        description:
          'Get rewarded with Coincademy tokens as you learn and complete challenges.'
      },
      {
        uri: 'https://ouch-cdn2.icons8.com/42ASHOv4yirDsYAUQni0xeWBS7kf11a3AUtt3Wpzxl8/rs:fit:456:456/czM6Ly9pY29uczgu/b3VjaC1wcm9kLmFz/c2V0cy9zdmcvODc2/LzE1ZjJhOGVkLTE1/NTgtNDc2MC04NGIz/LTExOTZhODQ4Yzk5/My5zdmc.png',
        title: 'Ready to start?',
        description: "You're just a few taps away."
      }
    ];

    return items;
  }

  static getInterests(): EmojiItem[] {
    const items: EmojiItem[] = [{
      id: 'web3',
      emoji: '🌎',
      name: 'web3'
    }, {
      id: 'tech',
      emoji: '🧑‍💻',
      name: 'Tech'
    }, {
      id: 'devtools',
      emoji: '💻',
      name: 'Dev Tools'
    }, {
      id: 'startups',
      emoji: '🦄',
      name: 'Startups'
    }, {
      id: 'ar-vr',
      emoji: '🥽',
      name: 'AR/VR'
    }, {
      id: 'fintech',
      emoji: '💰',
      name: 'Fintech'
    }, {
      id: 'passive-income',
      emoji: '💸',
      name: 'Passive Income'
    }, {
      id: 'meme-coins',
      emoji: '🐕',
      name: 'Meme Coins'
    }, {
      id: 'metaverse',
      emoji: '🕶',
      name: 'Metaverse'
    }, {
      id: 'collectibles-nfts',
      emoji: '🖼',
      name: 'Collectibles/NFTs'
    }, {
      id: 'defi',
      emoji: '🪙',
      name: 'DeFi'
    }, {
      id: 'esports-and-gaming',
      emoji: '🎮',
      name: 'eSports & Gaming'
    }, {
      id: 'sustainability',
      emoji: '♻️',
      name: 'Sustainability'
    }, {
      id: 'green-energy',
      emoji: '🍃',
      name: 'Green Energy'
    }, {
      id: 'healthcare',
      emoji: '💊',
      name: 'Healthcare'
    },  {
      id: 'real-estate',
      emoji: '🏡',
      name: 'Real Estate'
    }, {
      id: 'business',
      emoji: '💼',
      name: 'Business'
    }, {
      id: 'fitness-and-wellbeing',
      emoji: '🏃‍♂️',
      name: 'Fitness & Wellbeing'
    }, {
      id: 'education',
      emoji: '🎓',
      name: 'Education'
    }, {
      id: 'media-and-entertainment',
      emoji: '🍿',
      name: 'Media & Entertainment'
    }];

    return items;
  }

  static getExperienceLevels(): EmojiItem[] {
    const items: EmojiItem[] = [{
      id: 'beginner',
      emoji: '🐣',
      name: 'Beginner'
    }, {
      id: 'intermediate',
      emoji: '🐥',
      name: 'Intermediate'
    }, {
      id: 'expert',
      emoji: '🐓',
      name: 'Expert'
    }];

    return items;
  }
}
