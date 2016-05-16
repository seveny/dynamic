import React from "react";
import ReactDOM from "react-dom";
import ListItem from "./ListItem";


export default class ListLayout extends React.Component {
    constructor() {
        super();
        this.TabStatusChangeEvent = 'status change event';
        this.state = {loading:true,error: null,data:null,result:null,isDone:false,isFinsh:true};
    }

    componentDidMount(){
        console.log('componentDidMount');
        document.addEventListener('scroll', this.handleScroll.bind(this));
        PubSub.subscribe(this.TabStatusChangeEvent,this.onTabChange.bind(this));
        console.log(this.state.url || this.props.source);
        fetch(this.state.url || this.props.source)
            .then(response => response.json())
            .then(data => this.setState({loading: false, data:data.content.result,result:data}))
            .catch(e => this.setState({loading: false, error: e}))
    }

    componentWillUnmount() {
        document.removeEventListener('scroll', this.handleScroll.bind(this));
    }

    handleScroll() {
        if(!this.state.isDone)
        {
            if(this.state.isFinsh)
            {
                this.setState({isFinsh:false})
                let start = parseInt(this.getQueryString(this.state.url||this.props.source,'start'));
                let rows = parseInt(this.getQueryString(this.state.url||this.props.source,'rows'));
                fetch(this.changeUrl(this.state.url||this.props.source,'start='+parseInt(start+rows)))
                    .then(response => response.json())
                    .then(data => this.setState({loading: false, data: this.state.data.concat(data.content.result),result:data,isDone:(data.content.result.length<10),isFinsh:true}))
                    .catch(e => this.setState({loading: false, error: e,isFinsh:true}))
            }

        }
    }

    onTabChange(event,param){
        fetch(this.changeUrl(this.state.url||this.props.source,param))
            .then(response => response.json())
            .then(data => this.setState({loading: false, data: data.content.result,result:data,isDone:(data.content.result.length<10),isFinsh:true}))
            .catch(e => this.setState({loading: false, error: e,isFinsh:true}))
        this.setState({url:this.changeUrl(this.state.url||this.props.source,param)});
    }

    changeUrl(url,param){
        let arr = param.split('=');
        let oldParam = arr[0] + '='+this.getQueryString(url,arr[0]);
        return url.replace(oldParam,param);
    }

    //获取URL中参数
    getQueryString(url,name) {
        var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
        var result = url.substr(url.indexOf('?')+1).match(reg);
        if (result != null) {
            return decodeURIComponent(result[2]);
        } else {
            return null;
        }
    }

    handleOnClick(url,id,uid){
        console.log(url);
        fetch('//msgbox.haiziwang.com/msgbox-web/msgService/reportReadAct.do?customerId='+uid+'&msgIds='+id)
        window.location = url;
    }

    render(){
        console.log('render........')
        if (this.state.loading) {
          return <div class="ui-loading-wrap">
                    <p>加载中...</p>
                    <i class="ui-loading"></i>
                </div>;
        }
        else if (this.state.error !== null) {
          return <div>Error: {this.state.error.message}</div>;
        }
        else {
            let list = this.state.data;
            if(list.length > 0)
            {
              let datas = list.map(function(item,x){
                  return <ListItem key={x} data={item} id={x}/>
              },this);
              return (
                  <div>
                      {datas}
                  </div>
              );
            }
            else {
              return (
                <div style={{textAlign:'center'}}>暂无内容</div>
              )
            }

        }
    }
}
