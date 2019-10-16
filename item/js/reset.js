//封装一个随机数函数，Math.random()范围 [0,1)
function randomNum(min,max){
    var tmp = max - min + 1;
    return parseInt(Math.random() * tmp) + min;
}

/* 冒泡排序（从小到大排列） */
function bubbleSort(arr){
     //i为比较的轮数  比较轮数 = 数组的元素个数 - 1;  每一轮比较的次数 = 数组的元素个数 - 轮次;
    for(var i = 0; i < arr.length - 1; i++){
        for(var j = 0; j < arr.length - (i + 1); j++){
            if(arr[j] > arr[j + 1]){
                var tmp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = tmp;
            }
        }
    }
}

/* 选择排序 */
function changeSort(arr){
    for(var i = 0;i < arr.length - 1;i++){
        for(var j = i + 1;j< arr.length;j++){
            if(arr[i] > arr[j]){
                var tmp = arr[i];
                arr[i] = arr[j];
                arr[j] = tmp;
            }
        }
    }
}

/* 数组去重 */
function norepeat(arr){
    for(var i = 0;i < arr.length - 1;i++){
        //i为比较的轮数  比较轮数 = 数组的元素个数 - 1;  每一轮比较的次数 = 数组的元素个数 - 轮次;
        for(var j = i + 1;j < arr.length;j++){
            if(arr[i] === arr[j]){
                arr.splice(j ,1);
                j--;
            }
        }
    }
}
function norepeatDown(arr){
    for(var i = arr.length - 1;i > 0;i--){
        //倒着遍历元素
        for(var j = i - 1;j >= 0;j--){
            if(arr[i] === arr[j]){
                arr.splice(j ,1);
            }
        }
    }
}

//封装一个函数判断单个字符是否是字母
function isABC(charStr){
    if(charStr >= 'a' && charStr <= 'z' || charStr >= 'A' && charStr <= 'Z'){
        return true;
    }else{
        return false;
    }
}

 //封装一个判断单个字符是字母、数字、下划线的函数
 function isDEF(charStr){
    if(charStr >= 'a' && charStr <= 'z' || charStr >= 'A' && charStr <= 'Z' || charStr >= '0' && charStr <= '9' || charStr == '_'){
        return true;
    }else{
        return false;
    }
} 

//纯数字组成的验证码
function testCodeNum(n){
    var arr = [];
    for(var i = 0;i < n; i++){
        var tmp = parseInt(Math.random() * 10);
        arr.push(tmp);
    }
    return arr.join('');
}

//数字和字母组成的验证码
function testCode(n){
    var arr = [];
    for(var i = 0; i < n; i++){
        var tmp = parseInt(Math.random() * 123);
        if(tmp >= 0 && tmp <= 9){
            arr.push(tmp);
        }else if(tmp >= 65 && tmp <= 90 || tmp >= 97 && tmp <= 122){
            arr.push(String.fromCharCode(tmp));
        }else{
            //随机到别的不在范围内的数
            i--;
        }
    }
    return arr.join("");
}

 //封装一个通过class获取节点可以兼容
 function elementsByClassName(node, classStr){
    var newArr = [];
    //获取node节点所有的子节点
    var nodes = node.getElementsByTagName("*");
    for(var i = 0; i < nodes.length; i++){
        if(nodes[i].className == classStr){
            newArr.push(nodes[i]);
        }
    }
    return newArr;
}

//获取当前有效样式浏览器兼容的写法
function getStyle(node, cssStr){
    return node.currentStyle ? node.currentStyle[cssStr] : getComputedStyle(node)[cssStr];
}

//随机颜色
function randomColor(){
    var str = "rgba(" + parseInt(Math.random() * 256) + "," + parseInt(Math.random() * 256) + "," + parseInt(Math.random() * 256) + ",1)";
    return str;
}

//删除文本是纯空白的节点
function removeSpaceNode(parentNode){
    var nodes = parentNode.childNodes;
    for(var i = 0; i < nodes.length; i++){
        //当前遍历到的节点是文本节点，且文本是纯空白字符组成的
        if(nodes[i].nodeType == 3 && /^\s+$/.test(nodes[i].nodeValue)){
            parentNode.removeChild(nodes[i]);
        }
    }
}
//当地时间
function showTime(){
    var d = new Date();
    var year = d.getFullYear();
    var month = d.getMonth() + 1;
    var day = d.getDate();

    var week = d.getDay();
    week = chineseFromNum(week);

    var hour = doubleNum(d.getHours());
    var min = doubleNum(d.getMinutes());
    var sec = doubleNum(d.getSeconds());

    return hour + ":" + min + ":" + sec;
}
//生成两位数
function doubleNum(n){
    if(n < 10){
        return "0" + n;
    }else{
        return n;
    }
}

//把星期从数字转成中文
function chineseFromNum(num){
    var arr = ["日", "一", "二", "三", "四", "五", "六"];
    return arr[num];
}