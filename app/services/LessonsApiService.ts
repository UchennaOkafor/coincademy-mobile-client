import Lesson from 'models/Lesson';
import LessonSlide from 'models/LessonSlide';
import Topic from 'models/Topic';

export default class NewsArticleApiService {
  public static getUsersLessons(): Topic[] {
    const sampleSlides: LessonSlide[] = [{
      id: '1',
      title: 'In the beginning there was Bitcoin',
      content: 'The first ever cryptocurrency was Bitcoin. Bitcoin was developed by an anonymous individual or group who went by the pseudonym Satoshi Nakamoto. \n\nSatoshi released the idea of Bitcoin in 2008 and described it as a “purely peer-to-peer version” of electronic money.',
      imageUrl: 'https://ethereum.org/static/ddb9a22d53fdaaae70c0a0d94577f2aa/135ab/eth.png',
      type: 'generic_content'
    }, {
      id: '2',
      title: 'What year was the first cryptocurrency created?',
      falseAnswers: [{id: '1', title: '2005'}, {id: '2', title: '2006'}, {id: '3', title: '2007'}],
      correctAnswer: {id: '4', title: '2008'},
      type: 'multi_choice_question'
    }, {
      id: '3',
      title: 'What is Bitcoin?',
      content: 'Bitcoin is a digital currency that has been created without the intervention of a central bank.\n\nIt\'s like a online version of cash Bitcoin was created to provide a way to pay for transactions without a third-party like a bank. The transactions occur betw',
      imageUrl: 'https://api.time.com/wp-content/uploads/2020/09/vitalik-buterin-time-100-2021.jpg?quality=85&crop=7px%2C255px%2C1793px%2C938px&resize=1200%2C628&strip',
      type: 'generic_content'
    }, {
      id: '4',
      title: 'Bulding on the Etheruem network',
      content: 'Ethereum is the community-run technology powering the cryptocurrency ether (ETH) and thousands of decentralized applications.',
      imageUrl: 'https://ethereum.org/static/bf78b49d7e23b88a7eea934225b0cf96/ed396/enterprise-eth.png',
      type: 'generic_content'
    }, {
      id: '5',
      title: 'What are smart contracts?',
      content: 'Ethereum is the community-run technology powering the cryptocurrency ether (ETH) and thousands of decentralized applications.',
      imageUrl: 'https://ethereum.org/static/4d030a46f561e5c754cabfc1a97528ff/ed396/impact_transparent.png',
      type: 'generic_content'
    }];

    const ethSlides: LessonSlide[] = [{
      id: '1',
      title: 'What is Etheruem?',
      content: 'Ethereum is the community-run technology powering the cryptocurrency ether (ETH) and thousands of decentralized applications.',
      imageUrl: 'https://ethereum.org/static/ddb9a22d53fdaaae70c0a0d94577f2aa/135ab/eth.png',
      type: 'generic_content'
    }, {
      id: '2',
      title: 'Which coin makes you look the coolest amongst your friends?',
      falseAnswers: [{id: '1', title: 'Bitcoin'}, {id: '2', title: 'SHIB'}, {id: '3', title: 'Safemoon'}],
      correctAnswer: {id: '4', title: 'Dogecoin'},
      type: 'multi_choice_question'
    }, {
      id: '3',
      title: 'The Creator of Etheruem',
      content: 'Vitalik Buterin created ethereum, the technology behind the cryptocurrency ether, after World of Warcraft developers weakened his prized character.',
      imageUrl: 'https://api.time.com/wp-content/uploads/2020/09/vitalik-buterin-time-100-2021.jpg?quality=85&crop=7px%2C255px%2C1793px%2C938px&resize=1200%2C628&strip',
      type: 'generic_content'
    }, {
      id: '4',
      title: 'Bulding on the Etheruem network',
      content: 'Ethereum is the community-run technology powering the cryptocurrency ether (ETH) and thousands of decentralized applications.',
      imageUrl: 'https://ethereum.org/static/bf78b49d7e23b88a7eea934225b0cf96/ed396/enterprise-eth.png',
      type: 'generic_content'
    }, {
      id: '5',
      title: 'What are smart contracts?',
      content: 'Ethereum is the community-run technology powering the cryptocurrency ether (ETH) and thousands of decentralized applications.',
      imageUrl: 'https://ethereum.org/static/4d030a46f561e5c754cabfc1a97528ff/ed396/impact_transparent.png',
      type: 'generic_content'
    }];

    const introductionLessons: Lesson[] = [{
      id: '1',
      title: 'Bitcoin',
      duration: '3 minutes',
      progress: 100,
      locked: false,
      iconUrl: 'https://cdn3d.iconscout.com/3d/free/thumb/bitcoin-3443546-2879622.png',
      slides: sampleSlides
    }, {
      id: '2',
      title: 'The Blockchain',
      duration: '5 minutes',
      progress: 33,
      locked: false,
      iconUrl: 'https://cdn3d.iconscout.com/3d/free/thumb/cryptocurrency-encryption-3678188-3061799@0.png',
      slides: ethSlides
    }, {
      id: '3',
      title: 'Dogecoin',
      duration: '11 minutes',
      progress: 0,
      locked: false,
      iconUrl: 'https://cdn3d.iconscout.com/3d/free/thumb/dogecoin-3443575-2879624.png',
      slides: sampleSlides
    }, {
      id: '4',
      title: 'NFTs',
      duration: '6 minutes',
      progress: 0,
      locked: true,
      iconUrl: 'https://cdn3d.iconscout.com/3d/free/thumb/crypto-creation-3678199-3061792@0.png',
      slides: sampleSlides
    }];

    const web3Lessons: Lesson[] = [{
      id: '5',
      title: 'What is Web3?',
      duration: '5 minutes',
      progress: 0,
      locked: true,
      iconUrl: 'https://cdn3d.iconscout.com/3d/free/thumb/ethereum-coin-3678200-3061793@0.png',
      slides: ethSlides
    }, {
      id: '6',
      title: 'Smart Contracts',
      duration: '7 minutes',
      progress: 0,
      locked: true,
      iconUrl: 'https://cdn3d.iconscout.com/3d/free/thumb/contract-3543024-2969411.png',
      slides: ethSlides
    }, {
      id: '7',
      title: 'Cryptography',
      duration: '4 minutes',
      progress: 0,
      locked: true,
      iconUrl: 'https://cdn3d.iconscout.com/3d/free/thumb/login-3543023-2969410.png',
      slides: ethSlides
    }, {
      id: '8',
      title: 'Cold Wallet',
      duration: '3 minutes',
      progress: 0,
      locked: true,
      iconUrl: 'https://cdn3d.iconscout.com/3d/free/thumb/cryptocurrency-wallet-3678197-3061804@0.png',
      slides: ethSlides
    }];

    return [{
      id: '1',
      title: 'Introduction',
      lessons: introductionLessons
    }, {
      id: '2',
      title: 'Ethereum',
      lessons: web3Lessons
    }];
  }
}
