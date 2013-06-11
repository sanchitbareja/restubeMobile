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
			fileBtn: 'addquestionform #fileBtn',
		},
		control: {
			restubeQuestionFeed: {
				//commands by restubeQuestionFeed
				questionInfoCommand: "onQuestionInfoCommand",
				loadQuestionsDataCommand: "loadQuestionsData",
				launchQuestionFormCommand: "onLaunchQuestionFormCommand",
				questionSearchCommand : "onQuestionSearchCommand",
				loadNextPageCommand: "onLoadNextPageCommand",
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
			},
			fileBtn: {
                success: 'onFileUploadSuccess',
                failure: 'onFileUploadFailure'
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
		var question_store = restube_questions.getStore();
		try{
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
			        question_store.removeAll();
			        // question_store.add(jsondecoded.objects);
			        for (var i = 0; i < jsondecoded.objects.length; i++) {
			        	var question_object = Ext.create('ResTube.model.Question', jsondecoded.objects[i]);
			        	question_object.set('posted_by', jsondecoded.objects[i].posted_by);
			        	question_object.set('comments', jsondecoded.objects[i].comments);
			        	question_store.add(question_object);
			        };
			    	restube_questions.setMasked(false);
			    },

			    failure: function(response) {
			    	console.log(response);
			        console.log("Curses, something terrible happened");
			    },
			});
		} catch(err) {

		}
		

	},

	onLoadNextPageCommand: function(){
		console.log("onLoadNextPageCommand");

		var restube_questions = this.getRestubeQuestionFeed();
		var restube_question_offset = restube_questions.getStore().getCount();
		var question_store = restube_questions.getStore();

		try{
			var myRequest = Ext.Ajax.request({
			    url: 'http://restube.herokuapp.com/api/v1/question/?format=json&offset='.concat(restube_question_offset),
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
			        for (var i = 0; i < jsondecoded.objects.length; i++) {
			        	var question_object = Ext.create('ResTube.model.Question', jsondecoded.objects[i]);
			        	question_object.set('posted_by', jsondecoded.objects[i].posted_by);
			        	question_object.set('comments', jsondecoded.objects[i].comments);
			        	question_store.add(question_object);
			        };
			    	restube_questions.setMasked(false);
			    	// remove the spinner to not confuse user from thinking that more data is being loaded
			    	if(!jsondecoded.meta.next){
			    		var moreQuestionCmp = Ext.getCmp('getMoreQuestionsCmp');
			    		moreQuestionCmp.hide();
			    	}
			    },

			    failure: function(response) {
			    	console.log(response);
			        console.log("Curses, something terrible happened");
			    },
			});
		} catch (err) {

		}
	},

	onFileUploadSuccess: function(response, xhrlink, successevent) {
        console.log('Success upload');
        console.log(response);
        console.log(xhrlink);
        console.log(successevent);

        var addQuestionForm = this.getQuestionForm();
        var mediaURLComponent = addQuestionForm.getComponent('addquestionfieldset').getComponent('mediaURL');
        var uploadButtonComponent = addQuestionForm.getComponent('addquestionfieldset').getComponent('fileBtn');

        mediaURLComponent.setValue(response.url);
        mediaURLComponent.disable();
        mediaURLComponent.setHidden(false);

        uploadButtonComponent.setHidden(true);
    },
    
    onFileUploadFailure: function(message, response, xhrlink, failureevent) {
        console.log('Failure upload');
        console.log(message);
        console.log(response);
        console.log(xhrlink);
        console.log(failureevent);
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

	onPostQuestionCommand: function(view, question, details, mediaURL) {
		
		//form
		var addQuestionForm = this.getQuestionForm();
		var questionFeedView = this.getMainContainer();

		var selfref = this;

		if (question) {

			console.log("onPostQuestionCommand!");

			console.log(question);
			console.log(details);
			console.log(mediaURL);

			//get user credentials
			var loginStore = Ext.getStore("Logins");
			var user = loginStore.data.all[0].data;
			console.log(user);

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
					"media_url": mediaURL,
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
						var mediaURLComponent = addQuestionForm.getComponent('addquestionfieldset').getComponent('mediaURL');
				        var uploadButtonComponent = addQuestionForm.getComponent('addquestionfieldset').getComponent('fileBtn');
				        mediaURLComponent.setValue(response.url);
				        mediaURLComponent.disable();
				        mediaURLComponent.setHidden(true);
				        uploadButtonComponent.setHidden(false);

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
		} else {
			console.log("Invalid Question");

			addQuestionForm.setMasked({
					    xtype: 'loadmask',
					    message: 'You have to fill out the Question section!',
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
					task.delay(2000); //the callback function will now be called after 2000ms
		}
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
				selfref.onQuestionInfoCommand(view, questionId);
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

	onQuestionSearchCommand: function(searchText) {
		console.log("onQuestionSearchCommand");
		console.log(searchText);

		var restube_questions = this.getRestubeQuestionFeed();
		var question_store = restube_questions.getStore();
		restube_questions.setMasked(true);

		if(!searchText){
			console.log("Empty search");
			this.loadQuestionsData();
		} else {
			var myRequest = Ext.Ajax.request({
			    url: 'http://restube.herokuapp.com/api/v1/question/search/?format=json&models=questions.question&q='.concat(searchText),
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
			        question_store.removeAll();
			        // question_store.add(jsondecoded.objects);
			        for (var i = 0; i < jsondecoded.objects.length; i++) {
			        	var question_object = Ext.create('ResTube.model.Question', jsondecoded.objects[i]);
			        	question_object.set('posted_by', jsondecoded.objects[i].posted_by);
			        	question_object.set('comments', jsondecoded.objects[i].comments);
			        	question_store.add(question_object);
			        };
			    	restube_questions.setMasked(false);
			    },

			    failure: function(response) {
			    	console.log(response);
			        console.log("Curses, something terrible happened");
			        restube_questions.setMasked(true);
			    },
			});
		}
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