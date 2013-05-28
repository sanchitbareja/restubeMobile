Ext.define("ResTube.controller.FeedbackController",{
	extend: "Ext.app.Controller",
	config: {
		refs: {
			//lookup our views by xtype
			mainContainer: "maincontainer",
			restubeFeedback: "restubefeedback",
		},
		control: {
			restubeFeedback: {
				//commands fired by restubeSearch
				feedbackButtonCommand: "onFeedbackCommand",
			},
		}
	},

	//Transitions
	slideLeftTransition: { type: "slide", direction: "left" },
	slideRightTransition: { type: "slide", direction: "right" },

	//Commands fired by the view
	onFeedbackCommand: function(view, feedbackValue) {
		console.log(feedbackValue);
		console.log("feedbackCommand2");

		//get user credentials
		var loginStore = Ext.getStore("Logins");
		var user = loginStore.data.all[0].data;
		console.log(user);

		var restubeFeedbackView = this.getRestubeFeedback();
		console.log(feedbackValue);

		var myRequest = Ext.Ajax.request({
			url: 'http://restube.herokuapp.com/api/v1/feedback/',
			method: 'POST',
			disableCaching: false,
			// withCredentials: true,
			useDefaultXhrHeader: false,

			headers: {
		    	"Content-Type": "application/json",
		    },

			jsonData: {
				"text": feedbackValue,
				"user": user.resource_uri,
			},

			success: function(response) {
				console.log(response);
				console.log("Spiffing, everything worked! Added a new question!");
				restubeFeedbackView.setMasked({
				    xtype: 'loadmask',
				    message: 'Thanks for the feedback! We are always doing our best to help you as much as possible.',
				    indicator: false,
				});

				//create the delayed task instance with our callback
				var task = Ext.create('Ext.util.DelayedTask', function() {
				    console.log('callback!');
					restubeFeedbackView.setMasked(false);
				});
				task.delay(2000); //the callback function will now be called after 1000ms
			},

			failure: function(response) {
				console.log(response);
				console.log("Curses, something terrible happened when trying to add Question");

				restubeFeedbackView.setMasked({
				    xtype: 'loadmask',
				    message: 'An error occurred. Please try sending us the feedback again :(',
				    indicator: false,
				});

				//create the delayed task instance with our callback
				var task = Ext.create('Ext.util.DelayedTask', function() {
				    console.log('callback!');
					restubeFeedbackView.setMasked(false);
				});
				task.delay(2000); //the callback function will now be called after 1000ms
			},
		});

	},
});