
const fs = require('fs')
// console.time("timer")
// 去重
function newArr(arr){
  return Array.from(new Set(arr))
}

let p1 = new Promise((resolve, reject) => {
  fs.readFile('./data.js', 'utf8', (err, data) => {
    if (err) {
      reject(err)
    } else {
      resolve(data)
    }
  })
})

p1.then(
  data => {
    // 先把data中的所有带"images/xxxxx.png"的符合项找出来
    let imgsArr = data.match(/"images\/([\S+])+?\.png"/g);
    // 返回去重数组
    let newimgsArr = newArr(imgsArr);
    let replacedData = data
    
    // 循环去重后的数组，思路就是为了减少遍历次数，利用去重后的数组项进行全局替换
    newimgsArr.map(item => {
      // 把item的"images/bg-sheet0.png"变成bg_sheet0
      let imgName = (item.match(/images\/(\S*)\.png/)[1]).replace(/-/g, '_');
      // 把全局中的"images/bg-sheet0.png"替换成bg_sheet0后的新数据重新赋值给自己然后再进行遍历
      replacedData = replacedData.replace(new RegExp(item,'g'), imgName);
    })
    // console.log(replacedData)
    return replacedData
  },
  err => {
    throw err;
  }
).then(
  data => {
    fs.writeFile('./exportData.js', data, (err) => {
      if (err) throw err;
      console.log("修改成功");
      // console.timeEnd("timer")
    });
  }
)
