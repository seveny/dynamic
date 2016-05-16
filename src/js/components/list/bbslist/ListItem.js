import React from "react";
import ReactDOM from "react-dom";

export default class ListLayout extends React.Component {
    constructor() {
        super();          
    }    

    handleOnClick(url,id,uid){
        console.log(url);
        fetch('//msgbox.haiziwang.com/msgbox-web/msgService/reportReadAct.do?customerId='+uid+'&msgIds='+id)
        window.location = url;        
    }

    getLocalTime(ns){
        let d = new Date(parseInt(ns)*1000);          
        return d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate()+" "+d.getHours()+":"+d.getMinutes()+":"+d.getSeconds();
    }

    render(){        
        let item = this.props.data;            
        let x = this.props.id;
        let id = item.id; 
        let uid = item.customerId;          
        let jsonData = JSON.parse(item.content); 
        let pics = jsonData.msgPicUrl;
        let picsHtml = pics.map(function(pic,y){
            return (
                    <li key={y}>
                        <div class="ui-grid-trisect-img">
                            <img src={pic.pic} dataimg={pic.pic} />
                        </div>
                    </li>
                )
        }); 
        let d = new Date(parseInt(jsonData.time)*1000);
        let formatTime = d.getYear()+"-"+(d.getMonth()+1)+"-"+d.getDate()+" "+d.getHours()+":"+d.getMinutes()+":"+d.getSeconds();
        
        return <article key={x} class="ui-border-radius" data-time={jsonData.time} data-id={id} data-uid={uid} onClick={this.handleOnClick.bind(this,jsonData.jumpUrl,id,uid)}>
            <a href='javascript:;'>
                <p class="desc ui-nowrap-thrid ui-whitespace">{jsonData.msgContent}</p>
                <div class="pic-list">
                    <ul class="ui-grid-trisect">
                       {picsHtml}
                    </ul>
                </div>
                <div class="info"><span class="publish-time">{this.getLocalTime(jsonData.time)}</span></div>
            </a>                   
            </article> 
    }
}