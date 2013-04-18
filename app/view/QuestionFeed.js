Ext.define("ResTube.view.QuestionFeed", {
	extend: "Ext.dataview.List",
	alias: "widget.restubequestionfeed",

	config: {

		loadingText: "Loading Questions...",
		emptyText: '<pre><div>No question :(</div></pre>',
		itemTpl: '<pre><div id="questionItem-{id}">{question}</div><pre>',
		masked: {
        	xtype: "loadmask",
        	message: "Loading Questions...",
        },

        plugins: [
	        {
	            xclass: 'Ext.plugin.PullRefresh',
	            pullRefreshText: 'Pull down to refresh!',
	            refreshFn: function(plugin) {
	            	plugin.parent.parent.fireEvent("loadQuestionsDataCommand");
	            },
	        }
	    ],

		items: [{
			xtype: "toolbar",
            docked: "top",
            title: "TechConnect",
            items: [{
	            xtype: "button",
	            ui: "refresh",
	            text: "Refresh",
	            id: "refreshQuestionFeedButton"
	        }, {
	        	xtype: "spacer",
	        }, {
	        	xtype: "button",
	        	ui: "action",
	        	text: "New",
	        	id: "addQuestionButton",
	        }],
		}],

		listeners: [{
			delegate: "#refreshQuestionFeedButton",
			event: "tap",
			fn: "onRefreshButtonTap",
		},{
			delegate: "#addQuestionButton",
			event: "tap",
			fn: "onAddButtonTap",
		},{
			event: "show",
			fn: "onShow",
		}],
	},

	onItemTap: function(nestedList, index, target, record, e, eOpts){
		console.log("An item was tapped!");
		var questionID = Ext.get(Ext.get(index).parent().query('div[id^=questionItem]')[0]).id.slice(13);
		this.fireEvent("questionInfoCommand", this, questionID);
	},

	onShow: function(){
		console.log("Initialize questions data!");
		this.fireEvent('loadQuestionsDataCommand');
	},

	onRefreshButtonTap: function(){
		console.log("Refresh questions data!");
		this.fireEvent('loadQuestionsDataCommand');
	},

	onAddButtonTap: function(){
		console.log("Adding questions data!");
		this.fireEvent('addQuestionCommand');
	},
});