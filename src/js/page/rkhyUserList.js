import '../../css/base.css';
import '../../css/page/index.scss';
import React from "react";
import ReactDOM from "react-dom";
import ListLayout from '../components/list/bbslist/ListLayout';
import TabLayout from '../components/tab/TabLayout';

var data = [
  {name: '未读', value: 'unread',param:'isread=0'},
  {name: '已读', value: 'read',param:'isread=1'}
];

 function getCookies(name) {
  var arr = document.cookie.split('; ');
  for (var i = 0; i < arr.length; i++) {
    var arr2 = arr[i].split('=');
    if (arr2[0] == name) {
      return arr2[1];
    }
  }
  return '';
}

let start = 1;
let rows = 10;
let uid = getCookies('uid');
let url = 'http://msgbox.haiziwang.com/msgbox-web/msgService/queryMsgsByType.do?customerId='+uid+'&appCode=rkhy&msgType=7&rows='+rows+'&isread=0';

ReactDOM.render(<TabLayout data={data}/>,document.getElementById('header'));
ReactDOM.render(<ListLayout source={url+'&start='+start}/>,document.getElementById('app'));
