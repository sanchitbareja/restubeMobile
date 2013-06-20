Ext.define("ResTube.controller.WhiteboardController",{
	extend: "Ext.app.Controller",
	requires: [
        'Ext.device.Notification',
        'Ext.Img'
    ],
	config: {
		refs: {
			mainContainer: "maincontainer",
			whiteboard: {
				selector: "whiteboard",
				xtype: "whiteboard",
				autoCreate: true,
			},
			whiteboardList: {
				selector: "whiteboardlist",
				xtype: "whiteboardlist",
				autoCreate: true, 
			},
			messageDetail: {
				selector: "messagedetail",
				xtype: "messagedetail",
				autoCreate: true,
			},
            browseFileBtn: 'whiteboard #browseFileBtn',
            contactDetail: {
				selector: "contactdetail",
				xtype: "contactdetail",
				autoCreate: true
			},
        },
		control: {
			whiteboard: {
				saveDrawing : 'onSaveDrawing',
				cancelDrawing: 'onCancelDrawing',
				fileLoadedSuccess: "onFileLoadSuccess", //note that the second argument is empty as we have no event
			},
			whiteboardList: {
				loadMessagesDataCommand: 'onLoadMessagesDataCommand',
				messageInfoCommand: 'onMessageInfoCommand',
				messageSearchCommand: 'onMessageSearchCommand',
				loadNextPageCommand: 'onLoadNextPageCommand',
				messageButtonCommand: 'onMessageButtonCommand',
			},
            browseFileBtn: {
                loadsuccess: 'onFileLoadSuccess',
                loadfailure: 'onFileLoadFailure',
            },
            contactDetail: {
				//commands by contactDetail
				launchWhiteboard: "onLaunchWhiteboard",
			},
			messageDetail: {
				launchWhiteboard: "onLaunchWhiteboard",
				backToMessagesCommand: "onBackToMessagesCommand",
			},
        }
    },

    onLaunchWhiteboard: function(to_user_data, media_url) {
    	//pull up whiteboard (animate from top to bottom)
    	//fill up the to_user_data in the to_user_field
    	var whiteboardView = this.getWhiteboard();
    	var dataToLoad = {};
    	console.log('onLaunchWhiteboard');
    	console.log(to_user_data);

    	if(media_url != ''){
    		console.log("media_url is NOT empty");
    		dataToLoad['to_user'] = to_user_data['from_user'];
    		dataToLoad['from_user'] = to_user_data['to_user'];
	    	dataToLoad['media_url'] = media_url;

	    	whiteboardView.setData(dataToLoad);
	    	console.log(dataToLoad);
			Ext.Viewport.animateActiveItem(whiteboardView, { type: "slide", direction: "up" });

			this.onFileLoadSuccess(media_url, '');

    	} else {
    		console.log("media_url is empty");
    		if(to_user_data['user']) {

    			//get user credentials
				var loginStore = Ext.getStore("Logins");
				var loggedinUser = loginStore.data.all[0].data;
				loggedinUser['first_name'] = 'Myself';
				console.log(loggedinUser);

	    		dataToLoad['to_user'] = to_user_data['user'];
	    		dataToLoad['from_user'] = loggedinUser;
	    	} else {
	    		dataToLoad['to_user'] = to_user_data['from_user'];
	    		dataToLoad['from_user'] = to_user_data['to_user'];
	    	}
    		dataToLoad['media_url'] = '';

    		whiteboardView.setData(dataToLoad);
	    	console.log(dataToLoad);
			Ext.Viewport.animateActiveItem(whiteboardView, { type: "slide", direction: "up" });
    	}
    },

    onMessageButtonCommand: function(view){
    	console.log("onMessageButtonCommand");
    	view.setMasked({
		    xtype: 'loadmask',
		    message: 'Select someone to message in the contacts list.',
		    indicator: false,
		});

		// create the delayed task instance with our callback
		var task = Ext.create('Ext.util.DelayedTask', function() {
		    console.log('callback!');
		    view.setMasked({
			    xtype: 'loadmask',
			    message: 'Messaging',
			    indicator: true,
			});
			view.setMasked(false);
		});
		task.delay(2000); //the callback function will now be called after 1000ms
    },

    onBackToMessagesCommand: function(view) {
    	console.log("onBackToMessagesCommand");
    	this.activateMessagesView();
    },

    onCancelDrawing: function(){
    	this.activateMessagesView();
    },

	//helper function
	activateMessagesView: function () {
		Ext.Viewport.animateActiveItem(this.getMainContainer(), { type: "slide", direction: "right" });
	},

	createCanvas: function(imgURL, imgMemorySize){
		console.log("Create canvas");
		var bgImage = new Image();
		console.log(imgMemorySize);
		if(imgURL.substr(0,4) == "http"){
			bgImage.crossOrigin = 'Anonymous';
		}
		bgImage.src = imgURL;
		console.log("checkpoint 1");

		// add the listeners and respective handlers as soon as image loads
		bgImage.onload = function() {
			var fittedWidth = 200*bgImage.width/bgImage.height;
			var fittedHeight = 200;
			console.log("checkpoint 2");

			// create canvas and add it to the dom
	        var canvasDict = {};
	        canvasDict.node = document.createElement('canvas');
	        canvasDict.node.id = 'canvasSignature';
	        canvasDict.context = canvasDict.node.getContext('2d');
	        canvasDict.node.width = fittedWidth;
	        canvasDict.node.height = fittedHeight;
	        canvasDict.node.style.border = '2px solid #000'; 
	        canvasDict.node.style.background = '#FFF';
	        //remove any children before adding
	        $("#canvasDiv").empty();
	        document.getElementById('canvasDiv').appendChild(canvasDict.node);
	        console.log("checkpoint 3");

	        // create important variables
			var canvas = document.getElementById('canvasSignature');
			var ctx = canvas.getContext('2d');
			var drag = false;
			console.log("checkpoint 4");

			function touchHandler(event) {
			  if (event.targetTouches.length == 1) { //one finger touche
			    var touch = event.targetTouches[0];

			    if (event.type == "touchstart") {
			      drag = true;
			    } else if (event.type == "touchmove") {
			      if (drag) {
			        x = touch.pageX - canvas.offsetLeft - 5;
			        y = touch.pageY - canvas.offsetTop - 50;
			        draw(x, y);
			      }
			    } else if (event.type == "touchend" || event.type == "touchcancel") {
			      drag = false;
			    }
			  }
			}

			function draw(x, y) {
	            ctx.fillStyle = '#ff0000';
	            ctx.beginPath();
	            ctx.moveTo(x, y);
	            ctx.arc(x, y, 3, 0, Math.PI * 2, false);
	            ctx.fill();
			}

			canvas.addEventListener("touchstart", touchHandler, false);
			canvas.addEventListener("touchmove", touchHandler, false);
	  		canvas.addEventListener("touchend", touchHandler, false);
	  		console.log(bgImage);
			console.log("checkpoint 5");
			if(imgMemorySize > 1000000) {
		  		ctx.drawImage(bgImage, 0, 0, bgImage.width, bgImage.height, 0 , 0, fittedWidth, fittedHeight*4);
		  	} else {
		  		ctx.drawImage(bgImage, 0, 0, fittedWidth, fittedHeight);
		  	}
	  		console.log("checkpoint 6");
	  	};
	},
    
    // set up canvas as soon as image is loaded
    onFileLoadSuccess: function(dataurl, e) {
    	// general stuff
        var whiteboard = this.getWhiteboard();
        console.log(whiteboard);
        console.log(dataurl);
        img = new Image();
        img.src = dataurl;
        var me = this
        //set the background picture as the one just selected from the library
        img.onload = function() {
	        if(dataurl.substr(0,4) == "http"){
	        	me.createCanvas(dataurl, img.height*img.width);
	        } else {
	        	me.createCanvas(dataurl, img.height*img.width);
				// this.doUpload(dataurl.replace("data:image/jpeg;base64,", ""), 'http://restube.herokuapp.com/upload/canvas/', '', '', false);
			}
		}
    },
    
    onFileLoadFailure: function(message) {
        Ext.device.Notification.show({
            title: 'Loading error',
            message: message,
            buttons: Ext.MessageBox.OK,
            callback: Ext.emptyFn
        });
    },

    onSaveDrawing: function(to_user_data, messageText, canvasImage, canvasImageUrl) {
    	console.log(canvasImage);
    	console.log(canvasImageUrl);

    	var whiteboard = this.getWhiteboard();

    	whiteboard.setMasked({
		    xtype: 'loadmask',
		    message: 'Sending',
		    indicator: true,
		});

    	if(canvasImage == '' || canvasImageUrl == ''){
    		this.submitDrawing('', to_user_data, messageText);
    	} else {
			uploadResponse = this.doUpload(canvasImageUrl, 'http://restube.herokuapp.com/upload/canvas/', to_user_data, messageText, true);
		}
    },

    submitDrawing: function(media_url, to_user_data, messageText) {
    	var whiteboard = this.getWhiteboard();
    	var messages_list = this.getWhiteboardList();
    	var mainContainerView = this.getMainContainer();

		//get user credentials
		var loginStore = Ext.getStore("Logins");
		var user = loginStore.data.all[0].data;
		console.log(user);

	    console.log(media_url);
	    console.log(user.resource_uri);
	    console.log(to_user_data.to_user.resource_uri);
	    console.log(messageText);

    	var myRequest = Ext.Ajax.request({
			url: 'http://restube.herokuapp.com/api/v1/messagewhiteboard/',
			method: 'POST',
			disableCaching: false,
			// withCredentials: true,
			useDefaultXhrHeader: false,

			headers: {
		    	"Content-Type": "application/json",
		    },

			jsonData: {
				"from_user": user.resource_uri,
				"to_user": to_user_data.to_user.resource_uri, // need to fill this up!!
				"text": messageText,
				"media_url": media_url,
			},

			success: function(response) {
				console.log(response);
				console.log("Spiffing, everything worked! Added a new message!");

				whiteboard.setMasked(false);

				Ext.Viewport.animateActiveItem(mainContainerView, { type: "slide", direction: "right" });
				messages_list.setMasked({
				    xtype: 'loadmask',
				    message: 'Successfully Messaged!',
				    indicator: false,
				});

				var task = Ext.create('Ext.util.DelayedTask', function() {
				    console.log('callback!');
					messages_list.setMasked(false);

					//empty the canvas
			        $("#canvasDiv").empty();

				});
				task.delay(1000); //the callback function will now be called after 1000ms
			},

			failure: function(response) {
				console.log(response);
				console.log("Curses, something terrible happened when trying to add Question");

				whiteboard.setMasked({
				    xtype: 'loadmask',
				    message: 'An error occurred. Please try posting again :(',
				    indicator: false,
				});

				// create the delayed task instance with our callback
				var task = Ext.create('Ext.util.DelayedTask', function() {
				    console.log('callback!');
				    whiteboard.setMasked({
					    xtype: 'loadmask',
					    message: 'Messaging',
					    indicator: true,
					});
					whiteboard.setMasked(false);
				});
				task.delay(2000); //the callback function will now be called after 1000ms
			},
		});
    },

    doUpload: function(file, url, to_user_data, messageText, submitForm) {
    	console.log(file);
    	console.log(url);
        var http = new XMLHttpRequest();
        var me = this;
        var imgMemorySize = 0;
        
        if (http.upload && http.upload.addEventListener) {
            
            // Uploading progress handler
            http.upload.onprogress = function(e) {
                if (e.lengthComputable) {
                    var percentComplete = (e.loaded / e.total) * 100; 
                    imgMemorySize = e.total;
                    console.log(percentComplete);
                }
            };
            
            // Response handler
            http.onreadystatechange = function (e) {
                if (this.readyState == 4) {
                    if(this.status == 200) {
                        
                        var response = Ext.decode(this.responseText, true);
                        
                        if (response && response.success) {
                            // Success
                            // me.fireEvent('success', response, this, e);
                            console.log(e);
                            console.log(response);
                            if(submitForm){
                            	console.log(response);
	                            me.submitDrawing(response.url, to_user_data, messageText);
                            } else {
                            	console.log(response);
                            	me.createCanvas(response.url, imgMemorySize);
                            }
                            return response;
                        } else if (response && response.message) {
                            // Failure
                            // me.fireEvent('failure', response.message, response, this, e);
                            console.log(response);
                            return response;
                        } else {
                            // Failure
                            // me.fireEvent('failure', 'Unknown error', response, this, e);
                            console.log(response);
                            return response;
                        }
                        
                    } else {
                        
                        // Failure
                        // me.fireEvent('failure', this.status + ' ' + this.statusText, response, this, e);
                        console.log(this.status + ' ' + this.statusText);
                        return response;
                    }
                    
                    // me.changeState('browse');
                }
            };
            
            // Error handler
            http.upload.onerror = function(e) {
            	console.log("onerror");
            	console.log(e);
                // me.fireEvent('failure', this.status + ' ' + this.statusText, {}, this, e);
            };
        }
        
        // Send form with file using XMLHttpRequest POST request
        http.open('POST', url);
        // Create FormData object
	    var form = new FormData();
	    // Add selected file to form
	    form.append('canvasImage', file);
	    console.log(form);
        http.send(form);
    },

    // for whiteboard list
    //On launch and refresh
	onLoadMessagesDataCommand: function() {

		console.log("loading messages...");

		var messages_list = this.getWhiteboardList();
		var messages_store = messages_list.getStore();

		//get user data
		var loginStore = Ext.getStore("Logins");
		var user = loginStore.data.all[0].data;

		messages_list.setMasked({
		    xtype: 'loadmask',
		    message: 'Loading',
		    indicator: true,
		});

		try{
			var myRequest = Ext.Ajax.request({
			    url: 'http://restube.herokuapp.com/api/v1/messagewhiteboard/?format=json',
			    method: 'GET',
			    disableCaching: false,
			    // withCredentials: true,
			    useDefaultXhrHeader: false,
			    params: {
			    	'including_user': user.username,
			    },

			    success: function(response) {
			        console.log("Spiffing, everything worked");
			        var jsondecoded = Ext.JSON.decode(response.responseText);
			        console.log(jsondecoded);
			        console.log(messages_list);
			        messages_store.removeAll();
			        messages_store.add(jsondecoded.objects);

			    	messages_list.setMasked(false);
			    },

			    failure: function(response) {
			    	console.log(response);
			        console.log("Curses, something terrible happened");
			        messages_list.setMasked({
					    xtype: 'loadmask',
					    message: 'Oops, something went wrong! Please try again..',
					    indicator: false,
					});

					// create the delayed task instance with our callback
					var task = Ext.create('Ext.util.DelayedTask', function() {
					    console.log('callback!');
						messages_list.setMasked(false);
					});
					task.delay(2000); //the callback function will now be called after 1000ms
			    },
			});
		} catch(err) {
			messages_list.setMasked(false);
		}
	},

	onLoadNextPageCommand: function(){
		console.log("onLoadNextPageCommand");

		var messages_list = this.getWhiteboardList();
		var messages_list_offset = messages_list.getStore().getCount();
		var messages_store = messages_list.getStore();

		//get user data
		var loginStore = Ext.getStore("Logins");
		var user = loginStore.data.all[0].data;

		try{
			var myRequest = Ext.Ajax.request({
			    url: 'http://restube.herokuapp.com/api/v1/messagewhiteboard/?format=json&offset='.concat(messages_list_offset),
			    method: 'GET',
			    disableCaching: false,
			    // withCredentials: true,
			    useDefaultXhrHeader: false,
			    params: {
			    	'including_user': user.username,
			    },

			    success: function(response) {
			    	console.log("Spiffing, everything worked");
			        var jsondecoded = Ext.JSON.decode(response.responseText);
			        console.log(jsondecoded);
			        console.log(messages_list);
			        messages_store.add(jsondecoded.objects);

			    	messages_list.setMasked(false);
			    	// remove the spinner to not confuse user from thinking that more data is being loaded
			    	if(!jsondecoded.meta.next){
			    		var moreMessagesCmp = Ext.getCmp('getMoreMessagesCmp');
			    		moreMessagesCmp.hide();
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

	//Commands fired by the view
	onMessageInfoCommand: function(view, messageId){
		//get user credentials
		var loginStore = Ext.getStore("Logins");
		var user = loginStore.data.all[0].data;

		console.log("onMessageInfoCommand!");
		console.log(messageId);

		var messageDetailView = this.getMessageDetail();
		var messages_list = this.getWhiteboardList();
		var requestURL = 'http://restube.herokuapp.com/api/v1/messagewhiteboard/'+messageId+'/?format=json';

        messages_list.setMasked({
		    xtype: 'loadmask',
		    message: 'Loading',
		    indicator: true,
		});

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
		        console.log(user);

		        // check if viewer is sender
		        var replyButtonComponent = Ext.getCmp('replyMessage');
		        if (jsondecoded.from_user.id == user.id) {
		        	console.log('not so fast, sender!');
		        	replyButtonComponent.setHidden(true);
		        } else {
		        	replyButtonComponent.setHidden(false);
		        }

		        messageDetailView.setData(jsondecoded);
				Ext.Viewport.animateActiveItem(messageDetailView, { type: "slide", direction: "left" });
				messageDetailView.setMasked(false);
				messages_list.setMasked(false);
		    },

		    failure: function(response) {
		        console.log("Curses, something terrible happened when trying to load Question Info");

		        messages_list.setMasked({
				    xtype: 'loadmask',
				    message: 'Oops, something went wrong! Please try again..',
				    indicator: false,
				});

				// create the delayed task instance with our callback
				var task = Ext.create('Ext.util.DelayedTask', function() {
				    console.log('callback!');
					messages_list.setMasked(false);
				});
				task.delay(2000); //the callback function will now be called after 1000ms
		    },
		});
	},
});