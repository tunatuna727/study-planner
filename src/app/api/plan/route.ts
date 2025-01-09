import { NextRequest, NextResponse } from 'next/server';
import { GenerativeModel, GoogleGenerativeAI } from '@google/generative-ai';
import { Task } from '@/types/task';
import { v4 as uuidv4 } from 'uuid';

export async function POST(req: NextRequest) {
  try {
    //トピックの配列を作成する
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
          role: 'user',
          parts: [{ text: systemPrompt1 }],
        },
        {
          role: 'model',
          parts: [{ text: '理解しました' }],
        },
      ],
    });

    const result1 = await chat.sendMessage(subject);

    const topicArray = JSON.parse(
      '{"list" : ' + result1.response.text().replace(/```/g, '') + '}'
    ).list;

    const promises = topicArray.map((topic: string) =>
      createTodoFromTopic(subject, topic, model, level)
    );
    const results = await Promise.all(promises);

    const parsedTodosList = results.map(
      (result: string) => JSON.parse('{"list" : ' + result.replace(/```/g, '') + '}').list
    );
    const todoList: Task[] = [];
    const termDay =
      Math.floor((new Date(endDate).getTime() - new Date(startDate).getTime()) / 86400000) + 1;
    console.log('termDay', termDay);

    for (let i = 0; i < parsedTodosList.length; i++) {
      const topic = topicArray[i];
      const todos = parsedTodosList[i];

      for (let j = 0; j < todos.length; j++) {
        const todo: Task = {
          id: uuidv4(),
          subject: subject,
          topic: topic,
          date: new Date(startDate),
          done: false,
          name: todos[j],
        };
        todoList.push(todo);
      }
    }

    const mod = todoList.length % termDay;
    const quotient = Math.floor(todoList.length / termDay);
    console.log(mod);
    console.log(quotient);

    for (let i = 0; i < todoList.length; i++) {
      const date = new Date(startDate);

      if (i < (quotient + 1) * mod) {
        date.setDate(date.getDate() + Math.floor(i / (quotient + 1)));
      } else {
        date.setDate(date.getDate() + mod + Math.floor((i - (quotient + 1) * mod) / quotient));
      }
      todoList[i].date = date;
    }
    console.log(todoList);
    return NextResponse.json(todoList, { status: 200 });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.log(error);
    return NextResponse.json(error, { status: 500 });
  }
}

async function createTodoFromTopic(
  subject: string,
  topic: string,
  model: GenerativeModel,
  level: number
) {
  const systemPrompt =
    'あなたは計画を立てるアドバイザーです。受け取った科目、学習項目に対する具体的なTODOを作成してください。目標とする習熟度は星3つのうち' +
    level +
    'つまでです。次に指定するフォーマットのみを出力してください。\n' +
    '## 例\n' +
    '入力：{"subject": "線形代数","topic":"ベクトル、行列"}\n' +
    '["ベクトルの基本概念を理解する","ベクトル演算（加法、減法、スカラー倍）を練習する","ベクトル空間の基底と次元を学ぶ","幾何学的な問題でベクトルを使った解法を練習する","行列の基本概念を理解する","行列の加法・減法・積を練習する","行列式の計算方法（2x2, 3x3）をマスターする","逆行列を初等行列を使って計算する練習をする","線形方程式系を行列で解く方法を学ぶ","画像処理や3D変換における行列の応用を探る"]';
  const chat = model.startChat({
    history: [
      {
        role: 'user',
        parts: [{ text: systemPrompt }],
      },
      {
        role: 'model',
        parts: [{ text: '理解しました' }],
      },
    ],
  });
  const result = await chat.sendMessage('{' + subject + ',' + topic + '}');
  return result.response.text().replace(/```/g, '');
}
