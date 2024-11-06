import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log("🐵Query🐵", req.query);
  if (req.method === "GET") {
    const id = req.query.id;
    const question = req.query.question ?? "彼は今日中に宿題を終わらせなくてはならない";
    const answer = req.query.answer ?? "He need to complete his homework until today";

    console.log("question", question);
    console.log("answer", answer);

    const apiKey = process.env.OPENAI_API_KEY;
    const apiUrl = "https://api.openai.com/v1/chat/completions";

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    };

    const data = {
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `
あなたの役割は質問に対してユーザが答えた英文を評価し、回答することです。評価スコアは、1-100の点数で答えます。評価のポイントはそれぞれ以下に示したJSONのコメントに従います。
評価結果はJSONフォーマットで回答し、以下の項目を含めてください。レスポンスはJSONのみで、それ以外の余分な文字列の追加はしないでください。
評価したスコアは英会話ゲームで利用し、スコアの合計を入力者同士で競い合いますので、特に100点は本当に正しい場合以外は出さない様にしてください。
できるだけ素早く回答をしてください。

\`\`\`
{
  "key" : string, // this is question id. set same id as you received 
  "is_correct" : boolean // the user's answer is corrct or not 
  "grammer_score" : number // if user's answer is correct grammaticaly, this score would be 100
  "natural_score" : number  //if user's expression is natural perfectly, this score would be 100
  "comment_eng" : string, // give advice to user to improve the answer in English
  "comment_jpn" : string, // 日本語で正解の為のコメントを書いてください。問題文を引用する時は問題と同じ英語を用いてください。
  "question": string, // question to user. always same sentence as below.
  "user_answer" : string, // this is user's answer
  "proposal_answer" :  string, // give a proposal answer which translate question to English. translation is NOT needed. only one proposal is enough. no advice, just give a answer only.
}

\`\`\`

This is the question id: ${id}

Here is question :

\`\`\`
${question}
\`\`\`

Here is user's answer :

\`\`\`
${answer}

\`\`\`
`
        }
      ],
      temperature: 0
    };

    try {
      // start time so that we can measure how long it takes to get a response
      const start = new Date().getTime();

      const response = await axios.post(apiUrl, data, { headers });

      // end time here and get the difference
      const end = new Date().getTime();
      const time = end - start;

      console.log("🐸🐸🐸🐸", { message: response.data, take: time });
      res.status(200).json({ message: response.data, take: time });
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
