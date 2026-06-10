//モジュールをインポート
import {codeToText} from "./weatherText.js"
import {codeToColor} from "./weatherColor.js"

// グローバルに使う変数を用意
let city = "";

// ボタンを押したら天気を取りに行く
document.getElementById("getBtn").addEventListener("click", () => {
    getWeather();
});

// 都市変更ボタンを押したら都市の名前を変更する
document.getElementById("getBtn-city").addEventListener("click", () => {
    city = document.querySelector("#city option:checked").textContent;
    document.getElementById("city-weather").textContent = 
        `${city}の天気`
})

// 天気を取得して表示する非同期関数
async function getWeather() {
  try{
    // 取得して表示するまでの待機中メッセージを表示する
    document.getElementById("temp").textContent = 
        "取得中...";

    // 四つの都市の現在の天気を取得するURL
    const url1 = "https://api.open-meteo.com/v1/forecast?latitude=35.69&longitude=139.69&current_weather=true";
    const url2 = "https://api.open-meteo.com/v1/forecast?latitude=34.68&longitude=135.52&current_weather=true";
    const url3 = "https://api.open-meteo.com/v1/forecast?latitude=35.18&longitude=136.91&current_weather=true";
    const url4 = "https://api.open-meteo.com/v1/forecast?latitude=33.60&longitude=130.41&current_weather=true";

    // データを代入する変数responseを用意
    let response;

    // ① URLにデータをお願いする（返事を待つ）
    if(city == "東京"){
        response = await fetch(url1);
    }
    else if(city == "大阪"){
        response = await fetch(url2);
    }
    else if(city == "名古屋"){
        response = await fetch(url3);
    }
    else{
        response = await fetch(url4);
    }

    // ② 返ってきたデータをJSONとして取り出す（これも待つ）
    const data = await response.json();

    // ③ 必要な値を取り出す（オブジェクトのプロパティアクセス！）
    const temp = data.current_weather.temperature;
    const wind = data.current_weather.windspeed;
    const code = data.current_weather.weathercode;

    // ④ 自作ライブラリで変換
    const weather = codeToText(code);
    const color = codeToColor(code);

    // ⑤ DOMに表示する
    document.getElementById("temp").textContent =
        `天気:${weather} / 気温:${temp}℃ / 風速:${wind} km/h`;
    
    document.getElementById("body").style.backgroundColor =
        color;

    // ⑥ デバッグ用：返ってきた全データをコンソールで確認
    console.log(data);
    console.log(color);
  }
  catch(error){
    // 通信に失敗したらここに来る
    console.error("取得に失敗しました:", error);
    document.getElementById("temp").textContent = "取得に失敗しました";
  }
  
}