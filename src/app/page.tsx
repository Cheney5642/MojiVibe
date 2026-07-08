'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// 平假名数据
const hiraganaData = [
  { 
    character: 'あ', 
    romanji: 'a',
    gyo: 'あ行',
    dan: 'あ段',
    mnemonic: {
      title: '阿安来了',
      description: '首字"阿"是假名发音。想这句话时，大脑只需提取出"安了"两字，"安"字稍加变形后，即可得到平假名"あ"；"了"字稍加变形后，就可得到片假名"ア"。'
    }
  },
  { 
    character: 'い', 
    romanji: 'i',
    gyo: 'あ行',
    dan: 'い段',
    mnemonic: {
      title: '以理服人',
      description: '首字"以"是假名发音。想到"以理服人"这个常用词，很容易想起发音"以"，同时提取出"以人"两字，在进行相应转化，即得假名"い イ"。'
    }
  },
  { 
    character: 'う', 
    romanji: 'u',
    gyo: 'あ行',
    dan: 'う段',
    mnemonic: {
      title: '屋顶看宇宙',
      description: '"屋"是假名发音。提取"宇"字，去掉"宇"下面的"于"，将剩下的"宀"稍加变换，即得假名"う ウ"。'
    }
  },
  { 
    character: 'え', 
    romanji: 'e',
    gyo: 'あ行',
    dan: 'え段',
    mnemonic: {
      title: '爱上元首工作',
      description: '首字"爱"是假名发音。想这句时，提取"元工"两字，将"元"变形后可得平假名"え"，"工"即片假名"エ"。'
    }
  },
  { 
    character: 'お', 
    romanji: 'o',
    gyo: 'あ行',
    dan: 'お段',
    mnemonic: {
      title: '奥运求才',
      description: '"奥"是假名发音。"奥运求才"很容易理解记忆，提取"求才"两字并将其变形后，即得假名"お オ"。'
    }
  },
  { 
    character: 'か', 
    romanji: 'ka',
    gyo: 'か行',
    dan: 'あ段',
    mnemonic: {
      title: '（给）卡车加力',
      description: '"卡"是假名发音。提取"加力"两字，变形后，即得假名"か カ"。'
    }
  },
  { 
    character: 'き', 
    romanji: 'ki',
    gyo: 'か行',
    dan: 'い段',
    mnemonic: {
      title: '一把 "Key"（钥匙）',
      description: '"Key"是假名发音。钥匙（Key）断成两截，圆环是 き，断齿是 キ。'
    }
  },
  { 
    character: 'く', 
    romanji: 'ku',
    gyo: 'か行',
    dan: 'う段',
    mnemonic: {
      title: '哭了很久',
      description: '"哭"是假名发音。提取"久"，"久"的演变需要想象一下。中间渐渐抹去，得到平假名"く"；去掉最后一笔，即可得片假名"ク"。'
    }
  },
  { 
    character: 'け', 
    romanji: 'ke',
    gyo: 'か行',
    dan: 'え段',
    mnemonic: {
      title: '一棵 (ke) 竹子 け，砍成个片 ケ',
      description: '想象这原本是一棵 (ke) 竹子（け），被人砍成了一个个的片（ケ）。'
    }
  },
  { 
    character: 'こ', 
    romanji: 'ko',
    gyo: 'か行',
    dan: 'お段',
    mnemonic: {
      title: '靠自己',
      description: '"靠"是假名发音。提取"己"，"己"的变形要想象一下，去掉最后一笔，将剩下的部分变形后可得假名"こ コ"。'
    }
  },
  { 
    character: 'さ', 
    romanji: 'sa',
    gyo: 'さ行',
    dan: 'あ段',
    mnemonic: {
      title: '萨达姆为士兵打井',
      description: '"萨"是假名发音。提取"士井"两字，将"士"字的"十"与"一"分离，变形后可得平假名"さ"；"井"去掉一横，变形后即为片假名"サ"。'
    }
  },
  { 
    character: 'し', 
    romanji: 'shi',
    gyo: 'さ行',
    dan: 'い段',
    mnemonic: {
      title: '王羲之',
      description: '"王羲之"是我国古代著名书法家，人称"书圣"。"羲"是假名发音。提取"之"，想象一下，将其变形后可得到假名"し シ"。'
    }
  },
  { 
    character: 'す', 
    romanji: 'su',
    gyo: 'さ行',
    dan: 'う段',
    mnemonic: {
      title: '一个踩着板凳上吊的人',
      description: '"す（su）"的发音有类"死（si）"。想象一下一个人吊在横梁上的样子就像す，然后他脚底下还踩着一条小板凳像"ス"，没人救然后吊"su"了。'
    }
  },
  { 
    character: 'せ', 
    romanji: 'se',
    gyo: 'さ行',
    dan: 'え段',
    mnemonic: {
      title: '赛车世界',
      description: '"赛"是假名发音。提取"世"，去掉最后一笔，变形后可得到平假名"せ"；在"せ"基础上变形，很容易得到片假名"セ"。'
    }
  },
  { 
    character: 'そ', 
    romanji: 'so',
    gyo: 'さ行',
    dan: 'お段',
    mnemonic: {
      title: '扫荡3关',
      description: '"扫"是假名的发音。提取"3关"两字，"3"的变形其实很简单，只要将下面弯进去的反过来弯在外面，变形后可得到平假名"そ"；将"关"保留"丶丿"，变形后可得片假名"ソ"。'
    }
  },
  { 
    character: 'た', 
    romanji: 'ta',
    gyo: 'た行',
    dan: 'あ段',
    mnemonic: {
      title: '他太多变',
      description: '"他"是假名发音。提取"太多"两字，将"太"的第一、第二笔和其余部分分离，变形后可得到平假名"た"；"多"字保留上部，即可得到片假名"タ"。'
    }
  },
  { 
    character: 'ち', 
    romanji: 'chi',
    gyo: 'た行',
    dan: 'い段',
    mnemonic: {
      title: '千年古器',
      description: '"器"是假名发音。提取"古千"两字，"古"重点变形下边"口"字，变形后可得到平假名"ち"；将"千"字稍加变形，可得到片假名"チ"。'
    }
  },
  { 
    character: 'つ', 
    romanji: 'tsu',
    gyo: 'た行',
    dan: 'う段',
    mnemonic: {
      title: '一个钩子上布满了倒刺',
      description: '"刺"是假名发音。想象一个钩子"つ"上全是倒刺"ツ"（剌一下得多疼呀>_<)。'
    }
  },
  { 
    character: 'て', 
    romanji: 'te',
    gyo: 'た行',
    dan: 'え段',
    mnemonic: {
      title: '台历7元',
      description: '"台"是假名发音。提取"7 元"两字，将"7"稍加变形，即可得平假名"て"；"元"去掉最后一笔，可得到片假名"テ"。'
    }
  },
  { 
    character: 'と', 
    romanji: 'to',
    gyo: 'た行',
    dan: 'お段',
    mnemonic: {
      title: '丫头掏萝卜吃',
      description: '"掏"是假名发音。提取"丫卜"两字，"丫"重点变形下边，变形后可得平假名"と"；"卜"可直接得到片假名"ト"。'
    }
  },
  { 
    character: 'な', 
    romanji: 'na',
    gyo: 'な行',
    dan: 'あ段',
    mnemonic: {
      title: '那般奈何',
      description: '"那"是假名发音。提取"奈"，将"奈"的下部扭一下，变形后可得平假名"な"；保留"奈"的开始两笔，即得片假名"ナ"。'
    }
  },
  { 
    character: 'に', 
    romanji: 'ni',
    gyo: 'な行',
    dan: 'い段',
    mnemonic: {
      title: '泥人（仁）',
      description: '"泥"是假名发音。采取了同音字联想，由"人"想到"仁慈"的"仁"，将"仁"稍加变形，可得平假名"に"；保留"仁"右部，可得片假名"ニ"。'
    }
  },
  { 
    character: 'ぬ', 
    romanji: 'nu',
    gyo: 'な行',
    dan: 'う段',
    mnemonic: {
      title: '奴才',
      description: '"奴"是假名发音。提取"奴"，将"奴"稍加变形，可得到平假名"ぬ"；保留"奴"右部，可得片假名"ヌ"。'
    }
  },
  { 
    character: 'ね', 
    romanji: 'ne',
    gyo: 'な行',
    dan: 'え段',
    mnemonic: {
      title: '奶奶打衣裳（上海方言）',
      description: '"奶"是假名发音。提取"打衣"，而"打"重点变换右部，变形后可得平假名"ね"；"衣"变形后可得片假名"ネ"。'
    }
  },
  { 
    character: 'の', 
    romanji: 'no',
    gyo: 'な行',
    dan: 'お段',
    mnemonic: {
      title: '（乃）奶奶怕闹',
      description: '"闹"是假名发音。"奶"与"乃"采用的是同音字联想，"乃"变形后可得平假名"の"；保留"乃"的"丿"，即得片假名"ノ"。'
    }
  },
  { 
    character: 'は', 
    romanji: 'ha',
    gyo: 'は行',
    dan: 'あ段',
    mnemonic: {
      title: '哈利波特与八哥',
      description: '"哈"是假名发音。提取"波八"两字，"波"重点变化右部，变形后可得平假名"は"；"八"直接得片假名"ハ"。'
    }
  },
  { 
    character: 'ひ', 
    romanji: 'hi',
    gyo: 'は行',
    dan: 'い段',
    mnemonic: {
      title: '黑夜比武',
      description: '"黑"是假名发音。提取"比"，将"比"变形后可得到平假名"ひ"；将"匕"稍加变化，即得片假名"ヒ"。'
    }
  },
  { 
    character: 'ふ', 
    romanji: 'fu',
    gyo: 'は行',
    dan: 'う段',
    mnemonic: {
      title: '服不服',
      description: '"服"是假名发音。提取"不"，将"一"与下部分来，变形后可得到平假名"ふ"；取"不"的第一、第二笔，变形后可得片假名"フ"。'
    }
  },
  { 
    character: 'へ', 
    romanji: 'he',
    gyo: 'は行',
    dan: 'え段',
    mnemonic: {
      title: '海角7号（海角七号）',
      description: '"海"是假名发音。提取"7"，变形后可得到假名"へ ヘ"。'
    }
  },
  { 
    character: 'ほ', 
    romanji: 'ho',
    gyo: 'は行',
    dan: 'お段',
    mnemonic: {
      title: '好好环保',
      description: '"好"是假名发音。提取"保"，"保"重点变化右部，变形后可得平假名"ほ"；将"保"中的"木"稍加变形，可得到片假名"ホ"。'
    }
  },
  { 
    character: 'ま', 
    romanji: 'ma',
    gyo: 'ま行',
    dan: 'あ段',
    mnemonic: {
      title: '抹布坏了',
      description: '"抹"是假名发音。提取"抹了"两字，变化"抹"中"末"的下边，变形后可得平假名"ま"；变形"了"下部，可得到片假名"マ"。'
    }
  },
  { 
    character: 'み', 
    romanji: 'mi',
    gyo: 'ま行',
    dan: 'い段',
    mnemonic: {
      title: 'Me有三美',
      description: '英文"Me"是假名发音。提取"三美"两字，"美"的变形重点是下部，因为"み"的书写比较简单，所以不难变形后得到平假名"み"；"三"变形后，很容易得到片假名"ミ"。'
    }
  },
  { 
    character: 'む', 
    romanji: 'mu',
    gyo: 'ま行',
    dan: 'う段',
    mnemonic: {
      title: '母犬台历',
      description: '"母"是假名发音。提取"犬台"两字，"犬"主要变化下部，变形后可得平假名"む"；"台"保留上部，直接得片假名"ム"。'
    }
  },
  { 
    character: 'め', 
    romanji: 'me',
    gyo: 'ま行',
    dan: 'え段',
    mnemonic: {
      title: '麦女士',
      description: '"麦"是假名发音。提取"女士"两字，将"女"稍加变化，可得到平假名"め"；变化"士"中的"十"，变形后可得片假名"メ"。'
    }
  },
  { 
    character: 'も', 
    romanji: 'mo',
    gyo: 'ま行',
    dan: 'お段',
    mnemonic: {
      title: '毛毛雨',
      description: '"毛"是假名发音。提取"毛"，将"毛"第一笔去掉，第三横变短，变化后即得平假名"も"；去掉"毛"第三横，变化后即为片假名"モ"。'
    }
  },
  { 
    character: 'や', 
    romanji: 'ya',
    gyo: 'や行',
    dan: 'あ段',
    mnemonic: {
      title: '亚军也好',
      description: '"亚"是假名发音。提取"也"，将"也"稍加变形后，可得到平假名"や"和片假名"ヤ"。'
    }
  },
  { 
    character: 'ゆ', 
    romanji: 'yu',
    gyo: 'や行',
    dan: 'う段',
    mnemonic: {
      title: '由于2手',
      description: '"由"是假名发音。提取"由 2"两字，"由"字变形后可得到平假名"ゆ"；将"2"稍加变化，即得片假名"ユ"。'
    }
  },
  { 
    character: 'よ', 
    romanji: 'yo',
    gyo: 'や行',
    dan: 'お段',
    mnemonic: {
      title: '要求与会',
      description: '"要"是假名发音。提取"与"，变换"与"下部，可得到平假名"よ"；将"与"作整体变化，可得到片假名"ヨ"。'
    }
  },
  { 
    character: 'ら', 
    romanji: 'ra',
    gyo: 'ら行',
    dan: 'あ段',
    mnemonic: {
      title: '辣椒5文钱',
      description: '"辣"是假名发音。提取"5 文"两字，"5"稍加变化，很容易得到平假名"ら"；"文"去掉最后一笔，变形后即得片假名"ラ"。'
    }
  },
  { 
    character: 'り', 
    romanji: 'ri',
    gyo: 'ら行',
    dan: 'い段',
    mnemonic: {
      title: '利弊',
      description: '"利"是假名发音。提取"利"，保留"利"的右部，变形后很容易得到平假名"り"和片假名"リ"。'
    }
  },
  { 
    character: 'る', 
    romanji: 'ru',
    gyo: 'ら行',
    dan: 'う段',
    mnemonic: {
      title: '陆家有3儿',
      description: '"陆"是假名发音。提取"3 儿"，"3"变形后可得到平假名"る"；将"儿"稍加变形，即得到片假名"ル"。'
    }
  },
  { 
    character: 'れ', 
    romanji: 're',
    gyo: 'ら行',
    dan: 'え段',
    mnemonic: {
      title: '礼尚往来',
      description: '"来"是假名发音。提取"礼"，重点变化"礼"左边，变形后得平假名"れ"；保留"礼"右边，将其变形后可得到片假名"レ"。'
    }
  },
  { 
    character: 'ろ', 
    romanji: 'ro',
    gyo: 'ら行',
    dan: 'お段',
    mnemonic: {
      title: '老3口才好',
      description: '"老"是假名发音。提取"3 口"，"3"变形后可得到平假名"ろ"；将"口"稍加变形，可得到片假名"ロ"。'
    }
  },
  { 
    character: 'わ', 
    romanji: 'wa',
    gyo: 'わ行',
    dan: 'あ段',
    mnemonic: {
      title: '娃娃打口哨',
      description: '"娃"是假名发音。提取"打口"两字，将"打"变形后可得到平假名"わ"；"口"变形后可得到片假名"ワ"。'
    }
  },
  { 
    character: 'を', 
    romanji: 'wo',
    gyo: 'わ行',
    dan: 'お段',
    mnemonic: {
      title: '澳洲大于Cuba（古巴）',
      description: '"澳"是假名发音。提取"大于 C(Cuba首字母)"，将"大"和"C"上下组合，可得到平假名"を"；将"于"变形后可得到片假名"ヲ"。'
    }
  },
  { 
    character: 'ん', 
    romanji: 'n',
    gyo: 'ん行',
    dan: '拨音',
    mnemonic: {
      title: 'Hans二人',
      description: '"Hans"（汉斯）中的"n"是假名发音。提取"H(h) 二"，将"h"变形后可得到平假名"ん"；"二"变形后可得到片假名"ン"。'
    }
  },
];

// 片假名数据
const katakanaData = [
  { character: 'ア', romanji: 'a', gyo: 'あ行', dan: 'あ段' },
  { character: 'イ', romanji: 'i', gyo: 'あ行', dan: 'い段' },
  { character: 'ウ', romanji: 'u', gyo: 'あ行', dan: 'う段' },
  { character: 'エ', romanji: 'e', gyo: 'あ行', dan: 'え段' },
  { character: 'オ', romanji: 'o', gyo: 'あ行', dan: 'お段' },
  { character: 'カ', romanji: 'ka', gyo: 'か行', dan: 'あ段' },
  { character: 'キ', romanji: 'ki', gyo: 'か行', dan: 'い段' },
  { character: 'ク', romanji: 'ku', gyo: 'か行', dan: 'う段' },
  { character: 'ケ', romanji: 'ke', gyo: 'か行', dan: 'え段' },
  { character: 'コ', romanji: 'ko', gyo: 'か行', dan: 'お段' },
  { character: 'サ', romanji: 'sa', gyo: 'さ行', dan: 'あ段' },
  { character: 'シ', romanji: 'shi', gyo: 'さ行', dan: 'い段' },
  { character: 'ス', romanji: 'su', gyo: 'さ行', dan: 'う段' },
  { character: 'セ', romanji: 'se', gyo: 'さ行', dan: 'え段' },
  { character: 'ソ', romanji: 'so', gyo: 'さ行', dan: 'お段' },
  { character: 'タ', romanji: 'ta', gyo: 'た行', dan: 'あ段' },
  { character: 'チ', romanji: 'chi', gyo: 'た行', dan: 'い段' },
  { character: 'ツ', romanji: 'tsu', gyo: 'た行', dan: 'う段' },
  { character: 'テ', romanji: 'te', gyo: 'た行', dan: 'え段' },
  { character: 'ト', romanji: 'to', gyo: 'た行', dan: 'お段' },
  { character: 'ナ', romanji: 'na', gyo: 'な行', dan: 'あ段' },
  { character: 'ニ', romanji: 'ni', gyo: 'な行', dan: 'い段' },
  { character: 'ヌ', romanji: 'nu', gyo: 'な行', dan: 'う段' },
  { character: 'ネ', romanji: 'ne', gyo: 'な行', dan: 'え段' },
  { character: 'ノ', romanji: 'no', gyo: 'な行', dan: 'お段' },
  { character: 'ハ', romanji: 'ha', gyo: 'は行', dan: 'あ段' },
  { character: 'ヒ', romanji: 'hi', gyo: 'は行', dan: 'い段' },
  { character: 'フ', romanji: 'fu', gyo: 'は行', dan: 'う段' },
  { character: 'ヘ', romanji: 'he', gyo: 'は行', dan: 'え段' },
  { character: 'ホ', romanji: 'ho', gyo: 'は行', dan: 'お段' },
  { character: 'マ', romanji: 'ma', gyo: 'ま行', dan: 'あ段' },
  { character: 'ミ', romanji: 'mi', gyo: 'ま行', dan: 'い段' },
  { character: 'ム', romanji: 'mu', gyo: 'ま行', dan: 'う段' },
  { character: 'メ', romanji: 'me', gyo: 'ま行', dan: 'え段' },
  { character: 'モ', romanji: 'mo', gyo: 'ま行', dan: 'お段' },
  { character: 'ヤ', romanji: 'ya', gyo: 'や行', dan: 'あ段' },
  { character: 'ユ', romanji: 'yu', gyo: 'や行', dan: 'う段' },
  { character: 'ヨ', romanji: 'yo', gyo: 'や行', dan: 'お段' },
  { character: 'ラ', romanji: 'ra', gyo: 'ら行', dan: 'あ段' },
  { character: 'リ', romanji: 'ri', gyo: 'ら行', dan: 'い段' },
  { character: 'ル', romanji: 'ru', gyo: 'ら行', dan: 'う段' },
  { character: 'レ', romanji: 're', gyo: 'ら行', dan: 'え段' },
  { character: 'ロ', romanji: 'ro', gyo: 'ら行', dan: 'お段' },
  { character: 'ワ', romanji: 'wa', gyo: 'わ行', dan: 'あ段' },
  { character: 'ヲ', romanji: 'wo', gyo: 'わ行', dan: 'お段' },
  { character: 'ン', romanji: 'n', gyo: 'ん行', dan: '拨音' },
];

// 播放答题反馈音效
const playFeedbackSound = (isCorrect: boolean) => {
  if (typeof window === 'undefined' || !window.Audio) {
    return;
  }
  
  const filename = isCorrect ? 'correct.mp3' : 'wrong.mp3';
  const sfx = new window.Audio(`/sfx/${filename}`);
  sfx.play().catch((e) => console.warn(e));
};

const playPronunciation = (romanji: string) => {
  if (typeof window === 'undefined' || !window.Audio) {
    return;
  }
  
  try {
    const audio = new window.Audio(`/audio/${romanji}.mp3`);
    audio.volume = 1.0;
    
    audio.onerror = () => {
      console.warn(`音频文件缺失: ${romanji}.mp3`);
    };
    
    audio.play().catch((e) => {
      console.warn('播放中断或失败', e);
    });
  } catch (e) {
    console.warn('播放中断或失败', e);
  }
};

// 获取假名的SVG路径
const getKanaPath = (character: string) => {
  const paths: Record<string, string> = {
    'あ': 'M30,40 C30,30 40,25 50,25 C60,25 70,30 70,40 C70,50 60,60 50,60 C40,60 30,50 30,40 Z',
    'い': 'M45,30 C45,25 55,25 55,30 C55,60 45,80 45,80 C45,80 55,80 55,75 C55,55 45,35 45,30 Z',
    'う': 'M30,40 C30,30 40,25 50,25 C60,25 70,30 70,40 C70,50 60,60 50,60 C40,60 30,50 30,40 Z M40,40 C40,45 60,45 60,40',
    'え': 'M35,30 C35,25 45,25 45,30 C45,50 35,70 35,70 C35,70 45,70 45,65 C45,45 55,25 65,25 C65,25 55,45 55,65 C55,80 65,80 65,80',
    'お': 'M30,40 C30,30 40,25 50,25 C60,25 70,30 70,40 C70,50 60,60 50,60 C40,60 30,50 30,40 Z M40,60 C40,70 60,70 60,60',
    'か': 'M30,30 C30,25 40,25 40,30 C40,80 30,80 30,80 C30,80 40,80 40,75 C40,55 50,35 60,35 C70,35 80,45 80,55 C80,65 70,75 60,75',
    'き': 'M35,30 C35,25 45,25 45,30 C45,80 35,80 35,80 C35,80 45,80 45,75 C45,55 55,35 65,35 C75,35 80,40 80,45 C80,50 75,55 65,55 C55,55 45,75 45,75',
    'く': 'M30,40 C30,30 40,25 50,25 C60,25 70,30 70,40 C70,50 60,60 50,60 C40,60 30,50 30,40 Z M40,60 C40,70 60,70 60,60 M40,20 C40,10 60,10 60,20',
    'け': 'M35,30 C35,25 45,25 45,30 C45,80 35,80 35,80 C35,80 45,80 45,75 C45,55 55,35 65,35 C75,35 80,40 80,45 C80,50 75,55 65,55 C55,55 45,75 45,75',
    'こ': 'M30,40 C30,30 40,25 50,25 C60,25 70,30 70,40 C70,50 60,60 50,60 C40,60 30,50 30,40 Z M40,60 C40,70 60,70 60,60',
    'さ': 'M30,30 C30,25 40,25 40,30 C40,80 30,80 30,80 C30,80 40,80 40,75 C40,55 50,35 60,35 C70,35 80,45 80,55 C80,65 70,75 60,75',
    'し': 'M30,30 C30,25 40,25 40,30 C40,50 30,70 30,70 C30,70 40,70 40,65 C40,45 50,25 60,25 C70,25 80,35 80,45 C80,55 70,65 60,65',
    'す': 'M30,40 C30,30 40,25 50,25 C60,25 70,30 70,40 C70,50 60,60 50,60 C40,60 30,50 30,40 Z M40,60 C40,70 60,70 60,60',
    'せ': 'M35,30 C35,25 45,25 45,30 C45,80 35,80 35,80 C35,80 45,80 45,75 C45,55 55,35 65,35 C75,35 80,40 80,45 C80,50 75,55 65,55 C55,55 45,75 45,75',
    'そ': 'M30,40 C30,30 40,25 50,25 C60,25 70,30 70,40 C70,50 60,60 50,60 C40,60 30,50 30,40 Z M40,60 C40,70 60,70 60,60',
    'た': 'M30,30 C30,25 40,25 40,30 C40,80 30,80 30,80 C30,80 40,80 40,75 C40,55 50,35 60,35 C70,35 80,45 80,55 C80,65 70,75 60,75',
    'ち': 'M35,30 C35,25 45,25 45,30 C45,80 35,80 35,80 C35,80 45,80 45,75 C45,55 55,35 65,35 C75,35 80,40 80,45 C80,50 75,55 65,55 C55,55 45,75 45,75',
    'つ': 'M30,40 C30,30 40,25 50,25 C60,25 70,30 70,40 C70,50 60,60 50,60 C40,60 30,50 30,40 Z M40,60 C40,70 60,70 60,60',
    'て': 'M35,30 C35,25 45,25 45,30 C45,80 35,80 35,80 C35,80 45,80 45,75 C45,55 55,35 65,35 C75,35 80,40 80,45 C80,50 75,55 65,55 C55,55 45,75 45,75',
    'と': 'M30,40 C30,30 40,25 50,25 C60,25 70,30 70,40 C70,50 60,60 50,60 C40,60 30,50 30,40 Z M40,60 C40,70 60,70 60,60',
    'な': 'M30,30 C30,25 40,25 40,30 C40,80 30,80 30,80 C30,80 40,80 40,75 C40,55 50,35 60,35 C70,35 80,45 80,55 C80,65 70,75 60,75',
    'に': 'M35,30 C35,25 45,25 45,30 C45,80 35,80 35,80 C35,80 45,80 45,75 C45,55 55,35 65,35 C75,35 80,40 80,45 C80,50 75,55 65,55 C55,55 45,75 45,75',
    'ぬ': 'M30,40 C30,30 40,25 50,25 C60,25 70,30 70,40 C70,50 60,60 50,60 C40,60 30,50 30,40 Z M40,60 C40,70 60,70 60,60',
    'ね': 'M35,30 C35,25 45,25 45,30 C45,80 35,80 35,80 C35,80 45,80 45,75 C45,55 55,35 65,35 C75,35 80,40 80,45 C80,50 75,55 65,55 C55,55 45,75 45,75',
    'の': 'M30,40 C30,30 40,25 50,25 C60,25 70,30 70,40 C70,50 60,60 50,60 C40,60 30,50 30,40 Z M40,60 C40,70 60,70 60,60',
    'は': 'M30,30 C30,25 40,25 40,30 C40,80 30,80 30,80 C30,80 40,80 40,75 C40,55 50,35 60,35 C70,35 80,45 80,55 C80,65 70,75 60,75',
    'ひ': 'M35,30 C35,25 45,25 45,30 C45,80 35,80 35,80 C35,80 45,80 45,75 C45,55 55,35 65,35 C75,35 80,40 80,45 C80,50 75,55 65,55 C55,55 45,75 45,75',
    'ふ': 'M30,40 C30,30 40,25 50,25 C60,25 70,30 70,40 C70,50 60,60 50,60 C40,60 30,50 30,40 Z M40,60 C40,70 60,70 60,60',
    'へ': 'M35,30 C35,25 45,25 45,30 C45,80 35,80 35,80 C35,80 45,80 45,75 C45,55 55,35 65,35 C75,35 80,40 80,45 C80,50 75,55 65,55 C55,55 45,75 45,75',
    'ほ': 'M30,40 C30,30 40,25 50,25 C60,25 70,30 70,40 C70,50 60,60 50,60 C40,60 30,50 30,40 Z M40,60 C40,70 60,70 60,60',
    'ま': 'M30,30 C30,25 40,25 40,30 C40,80 30,80 30,80 C30,80 40,80 40,75 C40,55 50,35 60,35 C70,35 80,45 80,55 C80,65 70,75 60,75',
    'み': 'M35,30 C35,25 45,25 45,30 C45,80 35,80 35,80 C35,80 45,80 45,75 C45,55 55,35 65,35 C75,35 80,40 80,45 C80,50 75,55 65,55 C55,55 45,75 45,75',
    'む': 'M30,40 C30,30 40,25 50,25 C60,25 70,30 70,40 C70,50 60,60 50,60 C40,60 30,50 30,40 Z M40,60 C40,70 60,70 60,60',
    'め': 'M35,30 C35,25 45,25 45,30 C45,80 35,80 35,80 C35,80 45,80 45,75 C45,55 55,35 65,35 C75,35 80,40 80,45 C80,50 75,55 65,55 C55,55 45,75 45,75',
    'も': 'M30,40 C30,30 40,25 50,25 C60,25 70,30 70,40 C70,50 60,60 50,60 C40,60 30,50 30,40 Z M40,60 C40,70 60,70 60,60',
    'や': 'M30,30 C30,25 40,25 40,30 C40,80 30,80 30,80 C30,80 40,80 40,75 C40,55 50,35 60,35 C70,35 80,45 80,55 C80,65 70,75 60,75',
    'ゆ': 'M30,40 C30,30 40,25 50,25 C60,25 70,30 70,40 C70,50 60,60 50,60 C40,60 30,50 30,40 Z M40,60 C40,70 60,70 60,60',
    'よ': 'M30,40 C30,30 40,25 50,25 C60,25 70,30 70,40 C70,50 60,60 50,60 C40,60 30,50 30,40 Z M40,60 C40,70 60,70 60,60',
    'ら': 'M30,30 C30,25 40,25 40,30 C40,80 30,80 30,80 C30,80 40,80 40,75 C40,55 50,35 60,35 C70,35 80,45 80,55 C80,65 70,75 60,75',
    'り': 'M35,30 C35,25 45,25 45,30 C45,80 35,80 35,80 C35,80 45,80 45,75 C45,55 55,35 65,35 C75,35 80,40 80,45 C80,50 75,55 65,55 C55,55 45,75 45,75',
    'る': 'M30,40 C30,30 40,25 50,25 C60,25 70,30 70,40 C70,50 60,60 50,60 C40,60 30,50 30,40 Z M40,60 C40,70 60,70 60,60',
    'れ': 'M35,30 C35,25 45,25 45,30 C45,80 35,80 35,80 C35,80 45,80 45,75 C45,55 55,35 65,35 C75,35 80,40 80,45 C80,50 75,55 65,55 C55,55 45,75 45,75',
    'ろ': 'M30,40 C30,30 40,25 50,25 C60,25 70,30 70,40 C70,50 60,60 50,60 C40,60 30,50 30,40 Z M40,60 C40,70 60,70 60,60',
    'わ': 'M30,30 C30,25 40,25 40,30 C40,80 30,80 30,80 C30,80 40,80 40,75 C40,55 50,35 60,35 C70,35 80,45 80,55 C80,65 70,75 60,75',
    'を': 'M30,40 C30,30 40,25 50,25 C60,25 70,30 70,40 C70,50 60,60 50,60 C40,60 30,50 30,40 Z M40,60 C40,70 60,70 60,60',
    'ん': 'M40,40 C40,30 60,30 60,40 C60,50 50,60 40,50 C30,40 30,30 40,40 Z'
  };
  return paths[character] || 'M50,20 C30,20 10,40 10,60 C10,80 30,90 50,90 C70,90 90,80 90,60 C90,40 70,20 50,20 Z';
};

const kanaGroups = [
  { key: 'a', name: 'あ行', romanjis: ['a', 'i', 'u', 'e', 'o'] },
  { key: 'ka', name: 'か行', romanjis: ['ka', 'ki', 'ku', 'ke', 'ko'] },
  { key: 'sa', name: 'さ行', romanjis: ['sa', 'shi', 'su', 'se', 'so'] },
  { key: 'ta', name: 'た行', romanjis: ['ta', 'chi', 'tsu', 'te', 'to'] },
  { key: 'na', name: 'な行', romanjis: ['na', 'ni', 'nu', 'ne', 'no'] },
  { key: 'ha', name: 'は行', romanjis: ['ha', 'hi', 'fu', 'he', 'ho'] },
  { key: 'ma', name: 'ま行', romanjis: ['ma', 'mi', 'mu', 'me', 'mo'] },
  { key: 'ya', name: 'や行', romanjis: ['ya', null, 'yu', null, 'yo'] },
  { key: 'ra', name: 'ら行', romanjis: ['ra', 'ri', 'ru', 're', 'ro'] },
  { key: 'wa', name: 'わ行', romanjis: ['wa', null, null, null, 'wo'] },
];

const generateKanaGrid = (data: any[]) => {
  const grid: (any | null)[] = [];
  kanaGroups.forEach(group => {
    group.romanjis.forEach(romanji => {
      if (romanji) {
        const item = data.find(d => d.romanji === romanji);
        grid.push(item || null);
      } else {
        grid.push(null);
      }
    });
  });
  grid.push(data.find(d => d.romanji === 'n') || null);
  return grid;
};

export default function Home() {
  const [isHiragana, setIsHiragana] = useState(true);
  const [selectedKana, setSelectedKana] = useState<any>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [learnedKana, setLearnedKana] = useState<Set<string>>(new Set());
  const [isTestMode, setIsTestMode] = useState(false);
  const [isConfiguring, setIsConfiguring] = useState(false);
  const [isTestFinished, setIsTestFinished] = useState(false);
  const [selectedGroups, setSelectedGroups] = useState<Set<string>>(new Set());
  const [score, setScore] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [totalQuestionsInTest, setTotalQuestionsInTest] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState<any>(null);
  const [options, setOptions] = useState<any[]>([]);
  const [feedback, setFeedback] = useState<any>(null);
  const [isAudioTest, setIsAudioTest] = useState(false);
  const [wrongAnswers, setWrongAnswers] = useState<any[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('learnedKana');
    if (saved) {
      setLearnedKana(new Set(JSON.parse(saved)));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('learnedKana', JSON.stringify(Array.from(learnedKana)));
  }, [learnedKana]);

  const progress = Math.round((learnedKana.size / hiraganaData.length) * 100);

  // 处理卡片点击事件
  const handleCardClick = (kana: any) => {
    playPronunciation(kana.romanji);
    if (isHiragana && kana.mnemonic) {
      setSelectedKana(kana);
      setIsDrawerOpen(true);
      setLearnedKana(prev => new Set(prev).add(kana.character));
    }
  };

  // 关闭抽屉
  const closeDrawer = () => {
    setIsDrawerOpen(false);
    setSelectedKana(null);
  };

  // 生成随机题目
  const generateQuestion = () => {
    const audioTest = Math.random() > 0.5;
    setIsAudioTest(audioTest);
    
    const availableGroups = kanaGroups.filter(g => selectedGroups.has(g.key));
    const availableRomajis = availableGroups.flatMap(g => g.romanjis).filter(Boolean);
    
    const filteredHiragana = hiraganaData.filter(h => availableRomajis.includes(h.romanji));
    const filteredKatakana = katakanaData.filter(k => availableRomajis.includes(k.romanji));
    
    if (filteredHiragana.length === 0) return;
    
    const randomIndex = Math.floor(Math.random() * filteredHiragana.length);
    const hiragana = filteredHiragana[randomIndex];
    
    const katakana = filteredKatakana.find(k => k.romanji === hiragana.romanji);
    
    if (!katakana) return;
    
    const allKatakana = [...filteredKatakana];
    for (let i = allKatakana.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [allKatakana[i], allKatakana[j]] = [allKatakana[j], allKatakana[i]];
    }
    
    const shuffledOptions = allKatakana.slice(0, 3);
    if (!shuffledOptions.some(opt => opt.character === katakana.character)) {
      shuffledOptions[Math.floor(Math.random() * 3)] = katakana;
    }
    for (let i = shuffledOptions.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledOptions[i], shuffledOptions[j]] = [shuffledOptions[j], shuffledOptions[i]];
    }
    
    setCurrentQuestion({ hiragana, katakana, audioTest });
    setOptions(shuffledOptions);
    setFeedback(null);
  };

  // 处理答案选择
  const handleAnswer = (selectedOption: any) => {
    const isCorrect = selectedOption.character === currentQuestion.katakana.character;
    
    playFeedbackSound(isCorrect);
    
    if (isCorrect) {
      setScore(prev => prev + 1);
      setFeedback({ type: 'correct', message: '正确！' });
    } else {
      setFeedback({ 
        type: 'incorrect', 
        message: `错误！正确答案是 ${currentQuestion.katakana.character}`,
        selectedCharacter: selectedOption.character
      });
      setWrongAnswers(prev => [...prev, {
        hiragana: currentQuestion.hiragana.character,
        correctAnswer: currentQuestion.katakana.character,
        correctRomanji: currentQuestion.hiragana.romanji,
        selectedAnswer: selectedOption.character,
        selectedRomanji: selectedOption.romanji
      }]);
    }
    
    setTotalQuestions(prev => prev + 1);
    setCurrentQuestionIndex(prev => prev + 1);
    
    const nextIndex = currentQuestionIndex + 1;
    if (nextIndex >= totalQuestionsInTest) {
      setTimeout(() => {
        if (typeof window !== 'undefined' && window.Audio) {
          const completeSfx = new window.Audio('/sfx/complete.mp3');
          completeSfx.play().catch((e) => console.warn(e));
        }
        setIsTestFinished(true);
      }, 1500);
    } else {
      setTimeout(() => {
        generateQuestion();
      }, 2000);
    }
  };

  // 切换测试模式
  const toggleTestMode = () => {
    if (!isTestMode) {
      setIsTestMode(true);
      setIsConfiguring(true);
      setIsTestFinished(false);
      setSelectedGroups(new Set());
      setScore(0);
      setTotalQuestions(0);
      setCurrentQuestionIndex(0);
      setTotalQuestionsInTest(0);
      setCurrentQuestion(null);
      setOptions([]);
      setFeedback(null);
      setWrongAnswers([]);
    } else {
      setIsTestMode(false);
      setIsConfiguring(false);
      setIsTestFinished(false);
      setSelectedGroups(new Set());
      setScore(0);
      setTotalQuestions(0);
      setCurrentQuestionIndex(0);
      setTotalQuestionsInTest(0);
      setCurrentQuestion(null);
      setOptions([]);
      setFeedback(null);
      setWrongAnswers([]);
    }
  };

  // 开始测试
  const startTest = () => {
    setIsConfiguring(false);
    setIsTestFinished(false);
    setScore(0);
    setTotalQuestions(0);
    setCurrentQuestionIndex(0);
    setWrongAnswers([]);
    
    const availableGroups = kanaGroups.filter(g => selectedGroups.has(g.key));
    const totalCharacters = availableGroups.flatMap(g => g.romanjis).filter(Boolean).length;
    setTotalQuestionsInTest(Math.min(totalCharacters * 2, 30));
    
    generateQuestion();
  };

  // 重新配置测试
  const reconfigureTest = () => {
    setIsConfiguring(true);
    setIsTestFinished(false);
    setScore(0);
    setTotalQuestions(0);
    setCurrentQuestionIndex(0);
    setTotalQuestionsInTest(0);
    setCurrentQuestion(null);
    setOptions([]);
    setFeedback(null);
    setWrongAnswers([]);
  };

  // 切换分组选择
  const toggleGroup = (groupKey: string) => {
    setSelectedGroups(prev => {
      if (groupKey === 'all') {
        if (prev.size === kanaGroups.length) {
          return new Set();
        } else {
          return new Set(kanaGroups.map(g => g.key));
        }
      }
      const newGroups = new Set(prev);
      if (newGroups.has(groupKey)) {
        newGroups.delete(groupKey);
      } else {
        newGroups.add(groupKey);
      }
      return newGroups;
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-green-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-2 bg-gradient-to-r from-pink-400 to-green-400 bg-clip-text text-transparent">
          MojiVibe - 五十音图学习
        </h1>
        <p className="text-center text-gray-500 mb-6">点击假名卡片听发音</p>
        
        {/* 模式切换开关 */}
        <div className="flex justify-center mb-8">
          <motion.button
            className={`px-6 py-3 rounded-full font-medium shadow-lg ${isTestMode ? 'bg-gradient-to-r from-purple-400 to-indigo-400 text-white' : 'bg-gradient-to-r from-pink-400 to-green-400 text-white'}`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleTestMode}
          >
            {isTestMode ? '切换到学习模式' : '切换到测试模式'}
          </motion.button>
        </div>
        
        {/* 学习模式内容 */}
        {!isTestMode && (
          <>
            {/* 学习进度条 */}
            <div className="max-w-md mx-auto mb-8 bg-white rounded-2xl p-4 shadow-sm border border-pink-100">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-600">今日学习进度</span>
                <span className="text-sm font-bold text-pink-500">{progress}%</span>
              </div>
              <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-pink-400 to-green-400 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                />
              </div>
              <div className="text-xs text-gray-400 mt-1 text-center">
                已学习 {learnedKana.size} / {hiraganaData.length} 个假名
              </div>
            </div>
            
            <div className="flex justify-center mb-8">
              <motion.button
                className="px-6 py-3 bg-gradient-to-r from-pink-400 to-green-400 text-white rounded-full font-medium shadow-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsHiragana(!isHiragana)}
              >
                {isHiragana ? '切换到片假名' : '切换到平假名'}
              </motion.button>
            </div>
          </>
        )}
        
        {/* 测试模式内容 */}
        {isTestMode && (
          <div className="max-w-3xl mx-auto mb-8">
            {/* 配置面板 */}
            {isConfiguring && (
              <motion.div
                className="bg-white rounded-2xl p-8 shadow-sm border border-purple-100"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">配置测试范围</h2>
                <p className="text-center text-gray-500 mb-8">请选择要测试的假名行（至少选择一项）</p>
                
                <div className="mb-4">
                  <motion.button
                    key="all"
                    className={`w-full p-4 rounded-xl font-medium text-lg transition-all ${
                      selectedGroups.size === kanaGroups.length
                        ? 'bg-gradient-to-r from-purple-400 to-indigo-400 text-white shadow-md'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    onClick={() => toggleGroup('all')}
                  >
                    全部行
                  </motion.button>
                </div>
                
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 mb-8">
                  {kanaGroups.map((group) => (
                    <motion.button
                      key={group.key}
                      className={`p-4 rounded-xl font-medium text-lg transition-all ${
                        selectedGroups.has(group.key)
                          ? 'bg-gradient-to-r from-purple-400 to-indigo-400 text-white shadow-md'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => toggleGroup(group.key)}
                    >
                      {group.name}
                    </motion.button>
                  ))}
                </div>
                
                <div className="flex justify-center">
                  <motion.button
                    className={`px-8 py-3 rounded-full font-medium shadow-lg transition-all ${
                      selectedGroups.size > 0
                        ? 'bg-gradient-to-r from-purple-400 to-indigo-400 text-white'
                        : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    }`}
                    whileHover={selectedGroups.size > 0 ? { scale: 1.05 } : {}}
                    whileTap={selectedGroups.size > 0 ? { scale: 0.95 } : {}}
                    onClick={startTest}
                    disabled={selectedGroups.size === 0}
                  >
                    开始测试
                  </motion.button>
                </div>
              </motion.div>
            )}
            
            {/* 测试进行中 */}
            {!isConfiguring && !isTestFinished && currentQuestion && (
              <>
                {/* 状态栏 */}
                <div className="bg-white rounded-2xl p-4 shadow-sm border border-purple-100 mb-6">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <span className="text-gray-500">进度</span>
                      <span className="text-xl font-bold text-purple-500">
                        {currentQuestionIndex + 1} / {totalQuestionsInTest}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-gray-500">得分</span>
                      <span className="text-xl font-bold text-green-500">{score}</span>
                    </div>
                  </div>
                  <div className="mt-3 h-2 bg-gray-100 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-purple-400 to-indigo-400 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${((currentQuestionIndex + 1) / totalQuestionsInTest) * 100}%` }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                </div>
                
                {/* 测试题目 */}
                <div className="bg-white rounded-2xl p-8 shadow-sm border border-purple-100">
                  <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
                    {isAudioTest ? '听音频，选择正确的假名' : '选择对应的片假名'}
                  </h2>
                  
                  <div className="flex flex-col items-center mb-8">
                    {!isAudioTest && (
                      <div className="text-6xl font-bold mb-4 text-gray-800">
                        {currentQuestion.hiragana.character}
                      </div>
                    )}
                    
                    {isAudioTest && (
                      <motion.button
                        className="px-6 py-3 bg-gradient-to-r from-purple-400 to-indigo-400 text-white rounded-full font-medium shadow-md mb-4"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => playPronunciation(currentQuestion.hiragana.romanji)}
                      >
                        🔊 播放音频
                      </motion.button>
                    )}
                    
                    {!isAudioTest && (
                      <div className="text-xl text-gray-600">
                        {currentQuestion.hiragana.romanji}
                      </div>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    {options.map((option, index) => (
                      <motion.button
                        key={index}
                        className={`py-4 rounded-xl font-medium text-lg ${feedback ? (option.character === currentQuestion.katakana.character ? 'bg-green-100 text-green-700' : (feedback.type === 'incorrect' && option.character === feedback.selectedCharacter ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-600')) : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => !feedback && handleAnswer(option)}
                        disabled={!!feedback}
                      >
                        {option.character}
                      </motion.button>
                    ))}
                  </div>
                  
                  {feedback && (
                    <motion.div
                      className={`p-4 rounded-xl text-center font-medium ${feedback.type === 'correct' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      {feedback.message}
                    </motion.div>
                  )}
                </div>
              </>
            )}
            
            {/* 测试结束结算卡片 */}
            {isTestFinished && (
              <motion.div
                className="bg-white rounded-3xl p-8 shadow-lg border border-purple-100 text-center"
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              >
                <div className="text-6xl mb-4">{wrongAnswers.length === 0 ? '🎉' : '📊'}</div>
                <h2 className="text-3xl font-bold text-gray-800 mb-2">
                  {wrongAnswers.length === 0 ? '完美通关！全对！' : '测试完成！'}
                </h2>
                <p className="text-gray-500 mb-8">
                  {wrongAnswers.length === 0 
                    ? '太厉害了！所有题目都答对了！' 
                    : '恭喜你完成了本次测试'}
                </p>
                
                <div className="grid grid-cols-2 gap-6 mb-8">
                  <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-6">
                    <div className="text-4xl font-bold text-green-500">{score}</div>
                    <div className="text-gray-600 mt-2">最终得分</div>
                  </div>
                  <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-6">
                    <div className="text-4xl font-bold text-purple-500">
                      {totalQuestions > 0 ? Math.round((score / totalQuestions) * 100) : 0}%
                    </div>
                    <div className="text-gray-600 mt-2">正确率</div>
                  </div>
                </div>
                
                {wrongAnswers.length > 0 && (
                  <motion.div
                    className="bg-gray-50 rounded-2xl p-6 mb-8"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    transition={{ duration: 0.3 }}
                  >
                    <h3 className="text-xl font-bold text-gray-800 mb-4">📝 错题回顾</h3>
                    <div className="space-y-4">
                      {wrongAnswers.map((item, index) => (
                        <motion.div
                          key={index}
                          className="bg-white rounded-xl p-4 shadow-sm border border-gray-100"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.2, delay: index * 0.1 }}
                        >
                          <div className="flex items-center justify-center gap-8">
                            <div className="text-center">
                              <div className="text-3xl font-bold text-gray-800">{item.hiragana}</div>
                              <div className="text-sm text-gray-500">{item.correctRomanji}</div>
                            </div>
                            <div className="flex flex-col gap-2">
                              <div className="text-green-600 font-medium">
                                ✓ 正确答案: <span className="text-2xl font-bold">{item.correctAnswer}</span>
                              </div>
                              <div className="text-red-500 font-medium line-through">
                                ✗ 你选择: <span className="text-2xl font-bold">{item.selectedAnswer}</span>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <motion.button
                    className="px-8 py-3 bg-gradient-to-r from-purple-400 to-indigo-400 text-white rounded-full font-medium shadow-lg"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={reconfigureTest}
                  >
                    重新配置测试
                  </motion.button>
                  <motion.button
                    className="px-8 py-3 bg-gradient-to-r from-pink-400 to-green-400 text-white rounded-full font-medium shadow-lg"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={toggleTestMode}
                  >
                    返回学习模式
                  </motion.button>
                </div>
              </motion.div>
            )}
          </div>
        )}

        {/* 学习模式：显示五十音图网格 */}
        {!isTestMode && (
          <div className="overflow-x-auto pb-4">
            <div className="grid grid-cols-5 gap-3 max-w-lg sm:max-w-xl md:max-w-2xl mx-auto min-w-[250px]">
              <AnimatePresence mode="popLayout">
                {generateKanaGrid(isHiragana ? hiraganaData : katakanaData).map((kana, index) => (
                  kana ? (
                    <motion.div
                      key={kana.character}
                      className="relative bg-white rounded-2xl shadow-sm border border-pink-50 cursor-pointer overflow-hidden h-20 flex flex-col"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ 
                        type: "spring",
                        stiffness: 400,
                        damping: 17,
                        delay: index * 0.01
                      }}
                      whileHover={{ 
                        scale: 1.08,
                        boxShadow: "0 10px 30px rgba(236, 72, 153, 0.15)",
                        borderColor: "rgba(236, 72, 153, 0.3)"
                      }}
                      whileTap={{ 
                        scale: 0.92,
                        transition: { type: "spring", stiffness: 400, damping: 17 }
                      }}
                      onClick={() => handleCardClick(kana)}
                    >
                      {learnedKana.has(kana.character) && (
                        <div className="absolute top-2 left-2 w-2 h-2 bg-green-400 rounded-full" />
                      )}
                      <div className="text-3xl font-bold text-gray-800 flex items-center justify-center h-14">{kana.character}</div>
                      <div className="text-xs text-pink-400 flex items-center justify-center pb-1">{kana.romanji}</div>
                    </motion.div>
                  ) : (
                    <div key={index} className="h-20" />
                  )
                ))}
              </AnimatePresence>
            </div>
          </div>
        )}

        {/* 抽屉组件 */}
        <AnimatePresence>
          {isDrawerOpen && selectedKana && (
            <motion.div
              className="fixed inset-0 bg-black/30 z-50 flex items-end justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeDrawer}
            >
              <motion.div
                className="bg-white rounded-t-3xl w-full max-w-2xl p-6"
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "100%" }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                onClick={e => e.stopPropagation()}
              >
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl font-bold text-gray-800">助记词</h2>
                  <motion.button
                    className="text-gray-400 hover:text-gray-600 text-2xl w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={closeDrawer}
                  >
                    ×
                  </motion.button>
                </div>
                <div className="flex flex-col items-center mb-6">
                  <motion.div
                    className="text-7xl font-bold mb-2 text-gray-800"
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    {selectedKana.character}
                  </motion.div>
                  <div className="text-2xl text-pink-400 mb-2">{selectedKana.romanji}</div>
                  <div className="text-lg text-green-500">{selectedKana.gyo} · {selectedKana.dan}</div>
                </div>
                <div className="bg-gradient-to-r from-pink-50 to-green-50 rounded-2xl p-6 mb-4">
                  <h3 className="text-xl font-semibold mb-3 text-pink-600">{selectedKana.mnemonic.title}</h3>
                  <p className="text-lg text-gray-600 leading-relaxed">{selectedKana.mnemonic.description}</p>
                </div>
                
                {/* 图片展示区域 */}
                <div className="w-full h-48 bg-gradient-to-br from-pink-100 to-green-100 rounded-2xl overflow-hidden">
                  {/* 图片显示 */}
                  <img 
                    src={`/images/${selectedKana.romanji}.png`}
                    alt={`${selectedKana.character}的助记图`}
                    className="w-full h-full object-contain"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      // 显示占位符
                      const placeholder = target.nextElementSibling as HTMLElement;
                      if (placeholder) {
                        placeholder.style.display = 'flex';
                      }
                    }}
                  />
                  {/* 图片加载失败时的占位符 */}
                  <div className="flex flex-col items-center justify-center text-gray-400 w-full h-full" style={{ display: 'none' }}>
                    <svg className="w-16 h-16 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span className="text-sm font-medium">助记图即将上线</span>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}