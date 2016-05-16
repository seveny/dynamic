import React from "react";
import ReactDOM from "react-dom";

export default class TabLayout extends React.Component {
	constructor() {
        super();
        this.state = {'selected':'unread'};
        this.TabStatusChangeEvent = 'status change event';
    }

    handleOnClick(e){ 
        PubSub.publish(this.TabStatusChangeEvent,e.target.getAttribute('data-param'));
        this.setState({'selected':e.target.getAttribute('data-value')});
    }

    render(){
    	var tabs = this.props.data.map(function(item,i){
    		var selected = item.value == this.state.selected?'selected':'';
    		return <li key={i} data-value={item.value} className={selected} data-param={item.param} onClick={this.handleOnClick.bind(this)}>{item.name}</li>;
    	},this);

        return (            
        	<ul class="ui-border-radius border-red">
        		{tabs}
        	</ul>            
        );
    }
}