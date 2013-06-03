Ext.define("ResTube.view.QuestionFeed", {
	extend: "Ext.dataview.List",
	alias: "widget.restubequestionfeed",

	config: {

		loadingText: "Loading Questions...",
		emptyText: '<pre><div>No questions :(</div></pre>',
		itemTpl:[
   				'<div id="questionItem-{id}" class="questionrow">'+
       				'<div class="row">'+
						'<div class="small-11 columns" id="questionItem-{id}">'+
							'<div class="description"><text id="questionItem-{id}">{question}</text></div>'+						
							'<br />'+
							'<p id="questionItem-{id}" class="dateText">'+
								'<span class="dateLeft">{[this.convertDate(values.posted_at)]} by {posted_by.username}</span>'+
								'{comments.length} comments'+
							'</p>'+
						'</div>'+
						'<div class="small-1 columns" id="questionItem-{id}">'+
							'<tpl if="values.status==\'U\'">'+
								'<div class="item_thumbnail_box"><img src="resources/icons/exclamation.png" class="item_thumbnail"></div>'+
							'</tpl>'+
							'<tpl if="values.status==\'R\'">'+
								'<div class="item_thumbnail_box"><img src="resources/icons/exclamationOff.png" class="item_thumbnail"></div>'+
							'</tpl>'+
						'</div>'+
					'</div>'+
				'</div>',{
					convertDate: function(json_date){
						js_now = new Date();
						js_date = new Date(json_date);
						js_diff = js_now.getTime() - js_date.getTime();
						js_now_time = js_now.getTime();
						js_date_time = js_date.getTime();
						if(js_now_time - js_date_time < 60000){ // 0 - 60 secs
							return new String(Math.floor((js_now_time - js_date_time)/1000)) + " secs ago";
						} else if(js_now_time - js_date_time < 3600000) { // 1- 59 minutes
							minutes_ago = Math.floor((js_now_time - js_date_time)/60000);
							if(minutes_ago == 1){
								return new String(minutes_ago) + " min ago";
							} else {
								return new String(minutes_ago) + " mins ago";
							}
						} else if(js_now_time - js_date_time < 86400000) { // 1-23 hours
							hours_ago = Math.floor((js_now_time - js_date_time)/3600000);
							if(hours_ago == 1){
								return new String(hours_ago) + " hour ago";
							} else {
								return new String(hours_ago) + " hours ago";
							}
						} else if(js_now_time - js_date_time < 518400000) { // 1-6 days
							days_ago = Math.floor((js_now_time - js_date_time)/86400000);
							if(days_ago == 1){
								return new String(days_ago) + " day ago";
							} else {
								return new String(days_ago) + " days ago";
							}
						} else if(js_now_time - js_date_time < 2073600000) { // 1-4 weeks
							weeks_ago = Math.floor((js_now_time - js_date_time)/518400000);
							if(weeks_ago == 1){
								return new String(weeks_ago) + " week ago";
							} else {
								return new String(weeks_ago) + " weeks ago";
							}
						} else {
							return js_date.toDateString();
						}
					},
				}],

		masked: {
        	xtype: "loadmask",
        	message: "Loading...",
        },

        plugins: [
	        {
	            xclass: 'Ext.plugin.PullRefresh',
	            pullRefreshText: 'Pull down to refresh!',
	            refreshFn: function(plugin) {
	            	plugin.parent.parent.fireEvent("loadQuestionsDataCommand");
	            },
	        },{
	            xclass: 'Ext.plugin.ListPaging',
	            loadMoreText: "Fetching more questions...",
	            autoPaging: true,
	            // loadMoreCmp is a private config method. not recommended to use and new solution needs to be found
	            loadMoreCmp: {
	            	xtype: 'component', 
	            	baseCls: Ext.baseCSSPrefix + 'list-paging', 
	            	scrollDock: 'bottom',
	            	id: 'getMoreQuestionsCmp',
	            	hidden: true,
	            	listeners: {
			        	painted: function(){
					    	this.parent.parent.parent.fireEvent("loadNextPageCommand");
					    	console.log("LOAD MORE DATA NOW!");
					    },
			        },	
	            },
	        }
	    ],

		items: [{
			xtype: "toolbar",
            docked: "top",
            title: "TechConnect",
            items: [{
            	xtype: "button",
            	ui: "action",
            	text: "Logout",
            	id: "logoutButton",
            },{
	        	xtype: "spacer",
	        }, {
	        	xtype: "button",
	        	ui: "action",
	        	text: "Post",
	        	id: "launchQuestionFormButton",
	        }],
		},{
            xtype: 'toolbar',
            docked: 'top',
            cls: 'searchtoolbar',
            ui: 'searchtoolbar',
            items: [
                { xtype: 'spacer' },
                {
                    xtype: 'searchfield',
                    placeHolder: ' search posts',
                    id: 'questionsearchfield',
                },{
	                xtype: "button",
	                text: "Go",
	                id: "questionSearchButton",
	            },
                { xtype: 'spacer' }
            ]
        },],

		listeners: [{
			delegate: "#logoutButton",
			event: "tap",
			fn: "onLogoutButtonTap",
		},{
			delegate: "#launchQuestionFormButton",
			event: "tap",
			fn: "onLaunchQuestionFormButtonTap",
		},{
			event: "show",
			fn: "onShow",
		},{
			delegate: "#questionSearchButton",
			event: "tap",
			fn: "onQuestionSearchButtonTap",
		}, {
			event: "Initialize",
			fn: function() {
				console.log("LOAD MORE DATA");
			},
		}],
	},

	onItemTap: function(nestedList, index, target, record, e, eOpts){
		console.log("An item was tapped!");
		var questionID = Ext.get(index).id.slice(13);
		this.setMasked(true);
		this.fireEvent("questionInfoCommand", this, questionID);
	},

	onShow: function(){
		console.log("Initialize questions data!");
		this.fireEvent('loadQuestionsDataCommand');
	},

	onLaunchQuestionFormButtonTap: function(){
		console.log("Adding questions data!");
		this.fireEvent('launchQuestionFormCommand');
	},

	onLogoutButtonTap: function(){
		console.log("Logout button pressed!");
		this.fireEvent('logoutCommand');
	},

	onQuestionSearchButtonTap: function(){
		console.log("questionSearchButton pressed!");
		this.fireEvent("questionSearchCommand",Ext.getCmp('questionsearchfield')._value);
	},
});