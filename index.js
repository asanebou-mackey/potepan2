const timer = document.querySelector(".timer");
//console.log(timer);
const startBtn = document.querySelector(".start");
//console.log(startBtn);
const stopBtn = document.querySelector(".stop");
//console.log(stopBtn);
const resetBtn = document.querySelector(".reset");
//console.log(resetBtn);

//経過時刻（ミリ秒）この値が秒、分として表示される。ミリ秒換算(例)1分=60秒=60000ミリ秒=60000000マイクロ秒
let elapsedTime = 0;

//クリックされた時の時間(ミリ秒)
let startTime;

//setintervalを止めるための変数。clearTimeoutの引数へ
let timerId;

//過去の経過時間を記録するための変数
let timeToAdd = 0;

function updateTimeText() {

    //分の計算 Math.floor(miliseconds / 60000)
    let m = Math.floor(elapsedTime / 60000);

    //秒の計算 Math.floor((miliseconds % 60000) / 1000)
    let s = Math.floor((elapsedTime % 60000) / 1000);

    //ミリ秒の計算 Math.floor(miliseconds % 60000)
    let ms = Math.floor(elapsedTime % 1000);

    //文字列の末尾2桁を表示
    m = ("0" + m).slice(-2);

    //文字列の末尾2桁を表示
    s = ("0" + s).slice(-2);

    //文字列の末尾3桁を表示
    ms = ("00" + m).slice(-3);

    //HTMLのclass = "timer"部分に表示される
    timer.textContent = m + ":" + s + ":" + ms;
}

//何度も使うための関数
function countUp() {
    timerId = setTimeout(function () {
        elapsedTime = Date.now() - startTime + timeToAdd;
        updateTimeText();
        countUp();
    }, 10);
}

function startTimer() {
    startTime = Date.now();
    countUp();

    //スタートボタンを押せなくする
    startBtn.setAttribute("disabled", true);

    //ストップボタンを押せるようにする
    stopBtn.removeAttribute("disabled");

    //リセットボタンを押せるようにする
    resetBtn.removeAttribute("disabled");
}

function stopTimer() {

    //タイマーをストップさせる
    clearInterval(timerId);

    //過去の経過時間。2回目以降この値が追加される。
    timeToAdd = Date.now() - startTime;

    //ストップボタンを押せないようにする
    stopBtn.setAttribute("disabled", true);

    //スタートボタンを押せるようにする
    startBtn.removeAttribute("disabled");
}

function resetTimer() {
    //タイマーをストップさせる
    clearInterval(timerId);

    //経過時間を0に
    elapsedTime = 0;

    //過去の経過時間を0に
    timeToAdd = 0;

    //表示を0にする
    updateTimeText();

    //スタートボタンを押せるようにする
    startBtn.removeAttribute("disabled");

    //ストップボタンとリセットボタンを押せないようにする
    stopBtn.setAttribute("disabled", true);
    resetBtn.setAttribute("disabled", true);
}