import fs from "fs";
import path from "path";
import fetch from "node-fetch";

const NEWS_API_KEY = process.env.NEWS_API_KEY;
const OUT = path.resolve("src/data/news.json");

async function fetchNews() {
  if (!NEWS_API_KEY) {
    console.error("❌ No NEWS_API_KEY found in environment variables!");
    return;
  }

  const url = `https://newsapi.org/v2/top-headlines?category=entertainment&language=en&pageSize=20&apiKey=${NEWS_API_KEY}`;
  const res = await fetch(url);
  const data = await res.json();

  if (!data.articles) {
    console.error("⚠️ No articles found:", data);
    return;
  }

  const news = data.articles.map((a) => ({
    title: a.title,
    description: a.description,
    url: a.url,
    source: a.source.name,
    publishedAt: a.publishedAt,
  }));

  fs.mkdirSync(path.dirname(OUT), { recursive: true });
  fs.writeFileSync(OUT, JSON.stringify(news, null, 2));
  console.log(`✅ ${news.length} news items saved.`);
}

fetchNews(add fetchnews script);
