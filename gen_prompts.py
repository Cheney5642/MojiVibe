import json
import time
import os

# 读取 mnemonics.json 文件
def read_mnemonics():
    with open('src/app/mnemonics.json', 'r', encoding='utf-8') as f:
        return json.load(f)

# 生成绘图 prompts
def generate_prompts(mnemonics):
    prompts = []
    
    for item in mnemonics:
        kana = item['character']
        mnemonic = item['mnemonic']['title'] + ' - ' + item['mnemonic']['description']
        
        # 生成 prompt
        prompt = f"生成一张极简日系矢量风格的插画，主题是假名 {kana}，表现意象为 {mnemonic}，低饱和度樱花粉配色，纯白背景"
        
        prompts.append({
            'kana': kana,
            'prompt': prompt
        })
        
        # 防封限速，每次请求之间添加 5 秒延迟
        time.sleep(5)
    
    return prompts

# 保存结果到 refined_prompts.json
def save_prompts(prompts):
    with open('refined_prompts.json', 'w', encoding='utf-8') as f:
        json.dump(prompts, f, ensure_ascii=False, indent=2)

if __name__ == "__main__":
    print("开始处理五十音图助记词数据...")
    
    # 读取数据
    mnemonics = read_mnemonics()
    print(f"成功读取 {len(mnemonics)} 个假名数据")
    
    # 生成 prompts
    print("正在生成绘图 prompts...")
    prompts = generate_prompts(mnemonics)
    
    # 保存结果
    save_prompts(prompts)
    print("处理完成！结果已保存到 refined_prompts.json")
