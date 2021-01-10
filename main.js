let input = document.getElementById('inp');
let output = document.getElementById('oup');

console.log('inp=>',input,'\n','out=>',output);
input.addEventListener('input',inputFn);

let objAry = [];
let txtAry = ['更新内容：','更新内容:','服务端：','服务端:','客户端：','客户端:','Lob, ']
let nameMap = [];
function inputFn(e){
  let textAry = [];
  let arr = String(input.value).split('\n');
  let ary =[];

  // init
  objAry = [];
  nameMap = [];

  arr.forEach((el,ind) =>{
    txtAry.forEach(el2 =>{
      el.search(el2)>-1 && ary.push(ind)
    })
  })

  ary.forEach((e,i)=>{
    arr.splice(e-i,1)
  })
  
  // --------------------------------------
  // 建議 再處理XD
  let txt = arr.join('\n');
  textAry = txt.split('\n\n');

  textAry.forEach(((ele,ind)=>{
    let s = ele.split('\n');
    if(s[0].length==0) s.splice(0,1); // 去掉一次多餘行數
    let s1 = s[0].indexOf('-');
    let s2 = s[0].lastIndexOf('-')+1;
    let title = s[0].slice(0,s1);
    let name = s[0].slice(s2);
    let content = s.slice(1).join()
    let obj = {title, name, content};
    objAry.push(obj);
    addMap(name)
    console.log('objAry[',ind,']=>',objAry[ind])
  }))
  // --------------------------------------
  txxx('nameMap=>',nameMap);
  let d = new Date();

  let tit = `会议主题: 每日代码交流会议
时间: ${d.getFullYear()}-${d.getMonth()+1}-${d.getDate()} 10:00
参会人员: ice, ${nameMap.join(', ')}, lob
会议主持: `

  output.value = tit;
  txxx('objAry=>',objAry)
}

function addMap(txt){
  let bo = false
  nameMap.forEach(el=>{
    if(txt == el) bo=true;
  })
  if(bo) return
  nameMap.push(txt);
}
function txxx(txt , obj){
  console.log(txt,obj);
}



input.focus();

/* 
会议主题: 每日代码交流会议
时间: 2021-1-8 10:00
参会人员: ice, wendy, carlson, nick, rosco, ray, burt, lob
会议主持: Su
*/