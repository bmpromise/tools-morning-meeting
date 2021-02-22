let input = document.getElementById('inp');
let output = document.getElementById('oup');
let mix = document.getElementById('mix');

console.log('inp=>', input, '\n', 'out=>', output);
input.addEventListener('input', inputFn);
output.addEventListener('input', outputFn);

const deleAry = ['Lob, ']; // 直接剔除input 內容
const txtAry = ['更新内容：', '更新内容:', '服务端：', '服务端:', '客户端：', '客户端:', '无']; // 來源屏蔽

let objAry = []; // 最後成品
let nameMap = []; // 不重複名單

function outputFn(e) {
    mix.value = output.value + "\n\n" + input.value;
}

function inputFn(e) {
    console.clear();
    let textAry = [];
    let arr = String(input.value).split('\n');

    // init
    objAry = [];
    nameMap = [];

    /**
     * 第一階段處理 - 特定詞排除與 更新input訊息
     **/

    // 排除 telegram 複製為Lob的訊息 (deleAry)
    deleAry.forEach(el => {
        arr = filterTxtFn(arr, el);
    });

    // input update
    input.value = arr.join('\n');

    // 屏蔽-更新內容 服務端 客戶端
    txtAry.forEach(el => {
        arr = filterTxtFn(arr, el);
    });

    /**
     * 第二階段處理
     * 組裝 objAry[Obj] => List
     * 辨識 nameMap 參與人員
     * 產生 output 內容
     **/
    textAry = arr.join('\n').split('\n\n');

    textAry = textAry.filter(x => x.length > 0)
    console.log('Start-----------objAry--------------Start')
    textAry.forEach((ele, ind) => {
        let s = ele.split('\n');
        // 去除空行
        s = s.filter(x => x.length > 0);

        let s1 = s[0].indexOf('-');
        let s2 = s[0].lastIndexOf('-') + 1;
        // 尋找產品 與 名稱 與 備註
        let title = s[0].slice(0, s1);
        let name = s[0].slice(s2);
        let content = s.slice(1).join();
        // 預留objAry[obj] => List
        let obj = { title, name, content };
        objAry.push(obj);
        addMap(name);
        console.log('objAry[', ind, ']=>', objAry[ind]);
    });
    console.log('END-----------objAry--------------END')

    // 組裝
    let d = new Date();
    nameMap.push('lob');
    nameMap.unshift('ice');
    console.log('nameMap=>', nameMap);
    let tit = `会议主题: 每日代码交流会议
时间: ${d.getFullYear()}-${d.getMonth()+1}-${d.getDate()} 10:00
参会人员: ${nameMap.join(', ')}
会议主持: `

    output.value = tit;
    console.log('objAry=>', objAry);
}

// filter
function filterTxtFn(arr, str) {
    return arr.filter(x => x.search(str) < 0);
}
// map
function addMap(txt) {
    nameMap = nameMap.filter(x => txt != x);
    nameMap.push(txt);
}

input.focus();