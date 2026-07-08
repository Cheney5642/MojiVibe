import os
import asyncio
import edge_tts

VOICE = 'ja-JP-NanamiNeural'
OUTPUT_DIR = os.path.join('public', 'audio')

missing_files = [
    ('ke', 'け'),
    ('su', 'す'),
]

async def generate_audio(romanji: str, kana: str) -> bool:
    file_path = os.path.join(OUTPUT_DIR, f'{romanji}.mp3')
    
    if os.path.exists(file_path):
        print(f'删除旧文件: {romanji}.mp3')
        os.remove(file_path)
    
    try:
        communicate = edge_tts.Communicate(kana, VOICE)
        await communicate.save(file_path)
        print(f'生成成功: {romanji}.mp3 -> {kana}')
        
        if os.path.exists(file_path):
            size = os.path.getsize(file_path)
            print(f'文件大小: {size} bytes')
            return True
        else:
            print(f'生成后文件不存在')
            return False
    except Exception as e:
        print(f'生成失败: {romanji}.mp3, 错误: {str(e)[:100]}')
        return False

async def main() -> None:
    os.makedirs(OUTPUT_DIR, exist_ok=True)
    
    print('重新生成缺失的音频文件...')
    print(f'声优: {VOICE}')
    print('-' * 50)
    
    for romanji, kana in missing_files:
        await generate_audio(romanji, kana)
        await asyncio.sleep(1)
    
    print('-' * 50)
    print('完成！')

if __name__ == '__main__':
    asyncio.run(main())