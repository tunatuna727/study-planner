import { NextRequest } from 'next/server';
import { GenerativeModel, GoogleGenerativeAI } from '@google/generative-ai';

export async function POST(req: NextRequest) {
  try {
    const { subject, startDate, endDate, level } = await req.json();
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    const systemPrompt1 =
      'あなたは計画を立てるアドバイザーです。受け取った教科を学習項目に分け、次に指定するフォーマットでそれのみを出力してください。\n' +
      '## 例\n' +
      '入力：線形代数\n' +
      '["ベクトル、行列","線形方程式、ランク、ガウスの消去法","可逆行列、逆行列、行列式","線形空間、線形独立、次元、線形写像","内積、ノルム、直交化","固有値・固有ベクトル、対角化"]';

    const chat = model.startChat({
      history: [
        {
          role: 'system',
          parts: [{ text: systemPrompt1 }],
        },
      ],
    });

    let result1 = await chat.sendMessage(subject);
    const topicArray = JSON.parse(result1.response.text());
    const promises = topicArray.map((topic: string) => createTodoFromTopic(subject, topic, model));
    const results = await Promise.all(promises);
  } catch (error: any) {}
}

async function createTodoFromTopic(subject: string, topic: string, model: GenerativeModel) {
  const systemPrompt =
    'あなたは計画を立てるアドバイザーです。受け取った科目、学習項目に対する具体的なTODOを作成してください。目標とする習熟度は星3つのうち3つまでです。次に指定するフォーマットのみを出力してください。\n' +
    '## 例\n' +
    '入力：{"subject": "線形代数","topic":"ベクトル、行列"}\n' +
    '["ベクトルの基本概念を理解する","ベクトル演算（加法、減法、スカラー倍）を練習する","ベクトル空間の基底と次元を学ぶ","幾何学的な問題でベクトルを使った解法を練習する","行列の基本概念を理解する","行列の加法・減法・積を練習する","行列式の計算方法（2x2, 3x3）をマスターする","逆行列を初等行列を使って計算する練習をする","線形方程式系を行列で解く方法を学ぶ","画像処理や3D変換における行列の応用を探る"]';
  const chat = model.startChat({
    history: [
      {
        role: 'system',
        parts: [{ text: systemPrompt }],
      },
    ],
  });
  let result = await chat.sendMessage('{' + subject + ',' + topic + '}');
  return result.response.text();
}

function countTodo(todo: string) {
  const topicNumber = todo.length.toExponential();
  return topicNumber;
}

async function decideTodo(req: NextRequest, topicNumber: string) {
  const { startDate, endDate } = await req.json();
  const termDay = (startDate - endDate) / 86400000;
  return termDay;
}
