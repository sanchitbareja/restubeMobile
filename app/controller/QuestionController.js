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
				autoCreate: true,
			},
			questionForm: {
				selector: "addquestionform",
				xtype: "addquestionform",
				autoCreate: true,
			},
		},
		control: {
			restubeQuestionFeed: {
				//commands by restubeQuestionFeed
				questionInfoCommand: "onQuestionInfoCommand",
				loadQuestionsDataCommand: "loadQuestionsData",
				launchQuestionFormCommand: "onLaunchQuestionFormCommand",
			},
			questionDetail: {
				//commands by questionDetail
				backToQuestionFeedCommand: "onBackToQuestionFeedCommand",
				addCommentToQuestionCommand: "onAddCommentToQuestionCommand",
			},
			questionForm: {
				//commands by questionForm
				postButtonCommand: "onPostQuestionCommand",
				backToFeedCommand: "onBackToQuestionFeedCommand",
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
		        if(restube_questions.getStore()){
			        restube_questions.getStore().removeAll();
			    }
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
				view.setMasked(false);
		    },

		    failure: function(response) {
		        console.log("Curses, something terrible happened when trying to load Question Info");
		    },
		});
	},

	onPostQuestionCommand: function(view, question, details) {
		console.log("onPostQuestionCommand!");

		console.log(question);
		console.log(details);

		//get user credentials
		var loginStore = Ext.getStore("Logins");
		var user = loginStore.data.all[0].data;
		console.log(user);

		//form
		var addQuestionForm = this.getQuestionForm();
		var questionFeedView = this.getMainContainer();

		var selfref = this;

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
				"posted_by": user.resource_uri,
				"question": question,
				"details": details,
			},

			success: function(response) {
				console.log(response);
				console.log("Spiffing, everything worked! Added a new question!");
				addQuestionForm.setMasked({
				    xtype: 'loadmask',
				    message: 'Successfully Posted!',
				    indicator: false,
				});

				//create the delayed task instance with our callback
				var task = Ext.create('Ext.util.DelayedTask', function() {
				    console.log('callback!');
				    addQuestionForm.setMasked({
					    xtype: 'loadmask',
					    message: 'Posting',
					    indicator: true,
					});
					addQuestionForm.setMasked(false);

					addQuestionForm.reset();
					Ext.Viewport.animateActiveItem(questionFeedView, { type: "slide", direction: "right" });

					selfref.loadQuestionsData();
				});
				task.delay(1000); //the callback function will now be called after 1000ms
			},

			failure: function(response) {
				console.log(response);
				console.log("Curses, something terrible happened when trying to add Question");

				addQuestionForm.setMasked({
				    xtype: 'loadmask',
				    message: 'An error occurred. Please try posting again :(',
				    indicator: false,
				});

				//create the delayed task instance with our callback
				var task = Ext.create('Ext.util.DelayedTask', function() {
				    console.log('callback!');
				    addQuestionForm.setMasked({
					    xtype: 'loadmask',
					    message: 'Posting',
					    indicator: true,
					});
					addQuestionForm.setMasked(false);
				});
				task.delay(2000); //the callback function will now be called after 1000ms
			},
		});
	},

	onAddCommentToQuestionCommand: function(view ,commentText, questionId, questionResourceUri, questionStatus){

		//get user credentials
		var loginStore = Ext.getStore("Logins");
		var user = loginStore.data.all[0].data;
		console.log(user);

		//form
		var questionDetailView = this.getQuestionDetail();

		var selfref = this;

		var myRequest = Ext.Ajax.request({
			url: 'http://restube.herokuapp.com/api/v1/comment/',
			method: 'POST',
			disableCaching: false,
			// withCredentials: true,
			useDefaultXhrHeader: false,

			headers: {
		    	"Content-Type": "application/json",
		    },

			jsonData: {
				"comment": commentText,
				"answer_to": questionResourceUri,
				"posted_by": user.resource_uri,
			},

			success: function(response) {
				console.log(response);
				console.log("Spiffing, everything worked! Added a new question!");
				questionDetailView.setMasked({
				    xtype: 'loadmask',
				    message: 'Successfully Commented!',
				    indicator: false,
				});

				//create the delayed task instance with our callback
				var task = Ext.create('Ext.util.DelayedTask', function() {
				    console.log('callback!');
				    questionDetailView.setMasked({
					    xtype: 'loadmask',
					    message: 'Commenting',
					    indicator: true,
					});
					questionDetailView.setMasked(false);

					selfref.onQuestionInfoCommand(view, questionId);
				});
				task.delay(1000); //the callback function will now be called after 1000ms
			},

			failure: function(response) {
				console.log(response);
				console.log("Curses, something terrible happened when trying to add Question");

				questionDetailView.setMasked({
				    xtype: 'loadmask',
				    message: 'An error occurred. Please try commenting again :(',
				    indicator: false,
				});

				//create the delayed task instance with our callback
				var task = Ext.create('Ext.util.DelayedTask', function() {
				    console.log('callback!');
				    questionDetailView.setMasked({
					    xtype: 'loadmask',
					    message: 'Posting',
					    indicator: true,
					});
					questionDetailView.setMasked(false);
				});
				task.delay(2000); //the callback function will now be called after 1000ms
			},
		});
	},

	onLaunchQuestionFormCommand: function(view) {
		console.log("onLaunchQuestionFormCommand");
		this.activateQuestionFormView();
	},

	onBackToQuestionFeedCommand: function() {
		console.log("onBackToFeedCommand");
		this.activateQuestionFeedView();
	},

	//helper functions
	activateQuestionFeedView: function () {
		Ext.Viewport.animateActiveItem(this.getMainContainer(), { type: "slide", direction: "right" });
	},

	activateQuestionFormView: function() {
		Ext.Viewport.animateActiveItem(this.getQuestionForm(), { type: "slide", direction: "left" });
	},
});