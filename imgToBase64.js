
const fs = require('fs');
// const paths = require('path');
const image = require("imageinfo"); //引用imageinfo模块

let fileUrl = "./images/";

// 根据路径读文件
function readFileList (path, filesList) {
  var files = fs.readdirSync(path);
  files.forEach(function (itme, index) {
    var stat = fs.statSync(path + itme);
    if (stat.isDirectory()) {
      //递归读取文件
      readFileList(path + itme + "/", filesList)
    } else {

      var obj = {};//定义一个对象存放文件的路径和名字
      obj.path = path;//路径
      obj.filename = itme//名字
      filesList.push(obj);
    }
  })

}

// 返回出文件夹下的图片或者文件
let getFiles = {
  //获取文件夹下的所有文件
  getFileList: function (path) {
      let filesList = [];
      readFileList(path, filesList);
      return filesList;
  },
  //获取文件夹下的所有图片
  getImageFiles: function (path) {
      let imageList = [];
      let imageListName = [];
      let imageUrl = [];
      this.getFileList(path).forEach((item) => {
          let ms = image(fs.readFileSync(item.path + item.filename));
          var name = item.filename.substr(0,item.filename.indexOf("."));
          ms.mimeType && (imageList.push(item.filename));
          ms.mimeType && (imageListName.push(name.replace("-","_")));
          ms.mimeType && (imageUrl.push(item.path));
      });
      
      // return imageList;
      return {"imageList": imageList, "imageListName": imageListName, "imageUrl": imageUrl};
  }
};


//获取文件夹下的所有文件
// getFiles.getFileList("./public/");

//获取文件夹下的所有图片
getFiles.getImageFiles(fileUrl);
let filesArr = getFiles.getImageFiles(fileUrl);
// {"imageList": imageList, "imageListName": imageListName}

let base64Data = ""
filesArr.imageList.map((item, index) => {
  let bitmap = fs.readFileSync(filesArr.imageUrl[index]+item);
  let base64str = Buffer.from(bitmap, 'binary').toString('base64'); // base64编码
  base64Data += `var ${filesArr.imageListName[index]} = 'data:image/png;base64,${base64str}';\r`
})

fs.writeFile('base64.js', base64Data, (err) => {
  if (err) throw err;
  console.log('base64成功存入');
});

