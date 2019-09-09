# node-demo
<p>
here are [img to base64] and [all diffent imgSrc to their imgName]
</p>

<pre>
  1.在此开发了文件夹下所有图片转base64,并且变量名是以图片名定义命名的：例如
    images/imgs/this-a.png;
    images/b2.png

    执行node脚本后
    // "-"会自动转换成"_"
    var this_a = "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx";
    var b2 = "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx";
    
  2.开发了文件中动态把图片路径转换成变量名：例如
    data:{
    "aaaaaaa",
    ["images/this-a.png"],
    ["images/this-bb.png"],
    ["images/this-ccc.png"],
    ["images/this-abcdefg.png"],
    }
    执行node脚本后
    // "-"会自动转换成"_"
    data:{
    "aaaaaaa",
    this_a,
    this_bb,
    this_ccc,
    this_abcdefg
  }
</pre>
