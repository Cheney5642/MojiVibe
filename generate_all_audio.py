import os
import asyncio
import time
import edge_tts

kana_dict = {
    'a': 'あ', 'i': 'い', 'u': 'う', 'e': 'え', 'o': 'お',
    'ka': 'か', 'ki': 'き', 'ku': 'く', 'ke': 'け', 'ko': 'こ',
    'sa': 'さ', 'shi': 'し', 'su': 'す', 'se': 'せ', 'so': 'そ',
    'ta': 'た', 'chi': 'ち', 'tsu': 'つ', 'te': 'て', 'to': 'と',
    'na': 'な', 'ni': 'に', 'nu': 'ぬ', 'ne': 'ね', 'no': 'の',
    'ha': 'は', 'hi': 'ひ', 'fu': 'ふ', 'he': 'へ', 'ho': 'ほ',
    'ma': 'ま', 'mi': 'み', 'mu': 'む', 'me': 'め', 'mo': 'も',
    'ya': 'や', 'yu': 'ゆ', 'yo': 'よ',
    'ra': 'ら', 'ri': 'り', 'ru': 'る', 're': 'れ', 'ro': 'ろ',
    'wa': 'わ', 'wo': 'を',
    'n': 'ん'
}

VOICE = 'ja-JP-NanamiNeural'
OUTPUT_DIR = os.path.join('public', 'audio')
MAX_RETRIES = 3

async def generate_audio(romanji: str, kana: str) -> bool:
    file_path = os.path.join(OUTPUT_DIR, f'{romanji}.mp3')
    
    if os.path.exists(file_path):
        print(f'已存在: {romanji}.mp3')
        return True
    
    for attempt in range(MAX_RETRIES):
        try:
            communicate = edge_tts.Communicate(kana, VOICE)
            await communicate.save(file_path)
            print(f'生成成功: {romanji}.mp3 -> {kana}')
            return True
        except Exception as e:
            print(f'生成失败(第{attempt+1}次): {romanji}.mp3, 错误: {str(e)[:100]}')
            if attempt < MAX_RETRIES - 1:
                await asyncio.sleep(2)
    
    print(f'生成失败: {romanji}.mp3 (已重试{MAX_RETRIES}次)')
    return False

async def main() -> None:
    os.makedirs(OUTPUT_DIR, exist_ok=True)
    
    print(f'开始生成日语五十音图发音，共 {len(kana_dict)} 个音...')
    print(f'输出目录: {OUTPUT_DIR}')
    print(f'声优: {VOICE}')
    print('-' * 50)
    
    success_count = 0
    fail_count = 0
    
    for romanji, kana in kana_dict.items():
        result = await generate_audio(romanji, kana)
        if result:
            success_count += 1
        else:
            fail_count += 1
        await asyncio.sleep(0.5)
    
    print('-' * 50)
    print(f'生成完成！成功: {success_count}, 失败: {fail_count}')

if __name__ == '__main__':
    asyncio.run(main())