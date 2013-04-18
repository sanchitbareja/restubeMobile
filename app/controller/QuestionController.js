Ext.define("ResTube.controller.QuestionController",{
	extend: "Ext.app.Controller",
	config: {
		refs: {
			//lookup our views by xtype
			mainContainer: "maincontainer",
			restubeQuestionFeed: {
				selector: "restubequestionfeed",
				xtype: "restubequestionfeed",
				autoCreate: true,
			},
			questionDetail: {
				selector: "questiondetail",
				xtype: "questiondetail",
				autoCreate: true
			},
		},
		control: {
			restubeQuestionFeed: {
				//commands by restubeFeed
				questionInfoCommand: "onQuestionInfoCommand",
				loadQuestionsDataCommand: "loadQuestionsData",
				addQuestionCommand: "onAddQuestionCommand",
			},
			questionDetail: {
				//commands by feedDetail
				backToQuestionFeedCommand: "onBackToQuestionFeedCommand",
			}
		},
	},

	//Transitions
	slideLeftTransition: { type: "slide", direction: "left" },
	slideRightTransition: { type: "slide", direction: "right" },
	slideUpTransition: { type: "slide", direction: "up" },
	slideDownTransition: { type: "slide", direction: "down" },

	//On launch and refresh
	loadQuestionsData: function() {

		console.log("loading questions...");

		var restube_questions = this.getRestubeQuestionFeed();
		var myRequest = Ext.Ajax.request({
		    url: 'http://restube.herokuapp.com/api/v1/question/?format=json',
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
		        console.log(restube_questions);
		    	restube_questions.setData(jsondecoded.objects);
		    	restube_questions.setMasked(false);
		    },

		    failure: function(response) {
		    	console.log(response);
		        console.log("Curses, something terrible happened");
		    },
		});

	},

	//Commands fired by the view
	onQuestionInfoCommand: function(view, questionId){
		console.log("onQuestionInfoCommand!");
		console.log(questionId);

		var questionDetailView = this.getQuestionDetail();
		var requestURL = 'http://restube.herokuapp.com/api/v1/question/'+questionId+'/?format=json';

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
		        questionDetailView.setData(jsondecoded);
				Ext.Viewport.animateActiveItem(questionDetailView, { type: "slide", direction: "left" });
		    },

		    failure: function(response) {
		        console.log("Curses, something terrible happened when trying to load Question Info");
		    },
		});
	},

	onAddQuestionCommand: function(view) {
		console.log("onAddQuestionCommand!");

		var myRequest = Ext.Ajax.request({
			url: 'http://restube.herokuapp.com/api/v1/question/',
			method: 'POST',
			disableCaching: false,
			// withCredentials: true,
			useDefaultXhrHeader: false,

			headers: {
		    	"Content-Type": "application/json",
		    },

			jsonData: {
				// "comments": [],
				"posted_by": "/api/v1/user/1/",
				"question": "How do you add a question via POST?",
			},

			success: function(response) {
				console.log(response);
				console.log("Spiffing, everything worked! Added a new question!");
			},

			failure: function(response) {
				console.log(response);
				console.log("Curses, something terrible happened when trying to add Question");
			},
		});
	},

	onBackToQuestionFeedCommand: function() {
		console.log("onBackToFeedCommand");
		this.activateQuestionFeedView();
	},

	//helper functions
	activateQuestionFeedView: function () {
		Ext.Viewport.animateActiveItem(this.getMainContainer(), { type: "slide", direction: "right" });
	},
});