const browser_simulator = require('./index');
const url = "https://m.tg3.net/kongbupian/56231/play-1-1.html";
(async function () {
    //实例化一个模拟器
    const executablePath = "/usr/bin/chromium-browser";
    const browser = new browser_simulator(true);
    //启动浏览器
    await browser.launch({
        args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu'],
        // executablePath,
        dumpio: true
    });
    //打开指定网页
    let page;
    try {
        page = await browser.open(url, [{
            url: "/static/pingbi.js",
            abort: true
        }], null, 10, true);
    } catch (e) {
        console.warn("打开网页异常：", e);
    } finally {
        //关闭导航页
        page.completed && await page.close();
    }
    if (page && page.networks && page.networks.length) {
        console.log("该网页的第一个请求", page.networks[0]);
    } else {
        console.warn("no request");
    }
    //关闭浏览器
    await browser.close();
})();