Ext.define("ResTube.controller.FeedController",{
	extend: "Ext.app.Controller",
	config: {
		refs: {
			//lookup our views by xtype
			mainContainer: "maincontainer",
			restubeFeed: {
				selector: "restubefeed",
				xtype: "restubefeed",
				autoCreate: true,
			},
			feedDetail: {
				selector: "feeddetail",
				xtype: "feeddetail",
				autoCreate: true
			},
		},
		control: {
			restubeFeed: {
				//commands by restubeFeed
				repairInfoCommand: "onRepairInfoCommand",
				loadDataCommand: "loadData",
			},
			feedDetail: {
				//commands by feedDetail
				backToFeedCommand: "onBackToFeedCommand",
			}
		},
	},

	//Transitions
	slideLeftTransition: { type: "slide", direction: "left" },
	slideRightTransition: { type: "slide", direction: "right" },
	slideUpTransition: { type: "slide", direction: "up" },
	slideDownTransition: { type: "slide", direction: "down" },

	//On launch and refresh
	loadData: function() {

		console.log("loading feed...");

		var restube_feed = this.getRestubeFeed();
		var myRequest = Ext.Ajax.request({
		    url: 'http://restube.herokuapp.com/api/v1/repair/?format=json',
		    method: 'GET',
		    disableCaching: false,
		    // withCredentials: true,
		    useDefaultXhrHeader: false,
		    params: {
		    },

		    success: function(response) {
		        console.log("Spiffing, everything worked");
		        var jsondecoded = Ext.JSON.decode(response.responseText);
		        console.log(jsondecoded);
		        console.log(restube_feed);
		    	restube_feed.setData(jsondecoded.objects);
		    	console.log("Getting data from localstorage");
		    	var myStore = Ext.getStore("Logins");
		    	console.log(myStore.getData());
		    	restube_feed.setMasked(false);
		    },

		    failure: function(response) {
		    	console.log(response);
		        console.log("Curses, something terrible happened");
		    },
		});

	},

	//Commands fired by the view
	onRepairInfoCommand: function(view, repairId){
		console.log("onRepairInfoCommand!");
		console.log(repairId);

		var feedDetailView = this.getFeedDetail();
		var requestURL = 'http://restube.herokuapp.com/api/v1/repair/'+repairId+'/?format=json';

		var myRequest = Ext.Ajax.request({
		    url: requestURL,
		    method: 'GET',
		    disableCaching: false,
		    // withCredentials: true,
		    useDefaultXhrHeader: false,
		    params: {},

		    success: function(response) {
		        console.log("Spiffing, everything worked");
		        var jsondecoded = Ext.JSON.decode(response.responseText);
		        console.log(jsondecoded);
		        feedDetailView.setData(jsondecoded);
				Ext.Viewport.animateActiveItem(feedDetailView, { type: "slide", direction: "left" });
		    },

		    failure: function(response) {
		        console.log("Curses, something terrible happened when trying to load Product Info");
		    },
		});
	},

	onBackToFeedCommand: function() {
		console.log("onBackToFeedCommand");
		this.activateFeedView();
	},

	//helper functions
	activateFeedView: function () {
		Ext.Viewport.animateActiveItem(this.getMainContainer(), { type: "slide", direction: "right" });
	},
});