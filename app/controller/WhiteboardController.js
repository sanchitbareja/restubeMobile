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
    		dataToLoad['user'] = to_user_data['to_user'];
	    	dataToLoad['media_url'] = media_url;

	    	whiteboardView.setData(dataToLoad);
	    	console.log(dataToLoad);
			Ext.Viewport.animateActiveItem(whiteboardView, { type: "slide", direction: "up" });

			this.onFileLoadSuccess(media_url, '');

    	} else {
    		dataToLoad['user'] = to_user_data['user'];
    		dataToLoad['media_url'] = '';

    		whiteboardView.setData(dataToLoad);
	    	console.log(dataToLoad);
			Ext.Viewport.animateActiveItem(whiteboardView, { type: "slide", direction: "up" });
    	}
    },

    onBackToMessagesCommand: function(view) {
    	console.log("onBackToMessagesCommand")
    	this.activateMessagesView();
    },

    onCancelDrawing: function(){
    	this.activateMessagesView();
    },

	//helper function
	activateMessagesView: function () {
		Ext.Viewport.animateActiveItem(this.getMainContainer(), { type: "slide", direction: "right" });
	},
    
    // set up canvas as soon as image is loaded
    onFileLoadSuccess: function(dataurl, e) {
    	// general stuff
        var whiteboard = this.getWhiteboard();
        console.log(whiteboard);

        //set the background picture as the one just selected from the library
		var bgImage = new Image();
		bgImage.crossOrigin = 'Anonymous';
		bgImage.src = dataurl;
		console.log("checkpoint 1");

		var fittedWidth = 150;
		var fittedHeight = 150;
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
		        x = touch.pageX - canvas.offsetLeft;
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
		console.log("checkpoint 5");
		// add the listeners and respective handlers as soon as image loads
		bgImage.onload = function() {
			canvas.addEventListener("touchstart", touchHandler, false);
			canvas.addEventListener("touchmove", touchHandler, false);
	  		canvas.addEventListener("touchend", touchHandler, false);
	  		ctx.drawImage(bgImage, 0, 0, fittedWidth, fittedHeight);
	  		console.log("checkpoint 6");
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

		uploadResponse = this.doUpload(canvasImageUrl, 'http://restube.herokuapp.com/upload/canvas/', to_user_data, messageText);
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
	    console.log(to_user_data.user.resource_uri);
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
				"to_user": to_user_data.user.resource_uri, // need to fill this up!!
				"text": messageText,
				"media_url": media_url,
			},

			success: function(response) {
				console.log(response);
				console.log("Spiffing, everything worked! Added a new message!");

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

    doUpload: function(file, url, to_user_data, messageText) {
    	console.log(file);
    	console.log(url);
        var http = new XMLHttpRequest();
        var me = this;
        
        if (http.upload && http.upload.addEventListener) {
            
            // Uploading progress handler
            http.upload.onprogress = function(e) {
                if (e.lengthComputable) {
                    var percentComplete = (e.loaded / e.total) * 100; 
                    console.log(percentComplete);
                }
            };
            
            // Response handler
            http.onreadystatechange = function (e) {
                if (this.readyState == 4) {
                    if(this.status == 200) {
                        
                        var response = Ext.decode(this.responseText, true)
                        
                        if (response && response.success) {
                            // Success
                            // me.fireEvent('success', response, this, e);
                            console.log(response);
                            me.submitDrawing(response.url, to_user_data, messageText)
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
		try{
			var myRequest = Ext.Ajax.request({
			    url: 'http://restube.herokuapp.com/api/v1/messagewhiteboard/?format=json',
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
			        console.log(messages_list);
			        messages_store.removeAll();
			        messages_store.add(jsondecoded.objects);

			    	messages_list.setMasked(false);
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

		var messages_list = this.getWhiteboardList();
		var messages_list_offset = messages_list.getStore().getCount();
		var messages_store = messages_list.getStore();

		try{
			var myRequest = Ext.Ajax.request({
			    url: 'http://restube.herokuapp.com/api/v1/messagewhiteboard/?format=json&offset='.concat(messages_list_offset),
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
		var requestURL = 'http://restube.herokuapp.com/api/v1/messagewhiteboard/'+messageId+'/?format=json';

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

		        messageDetailView.setData(jsondecoded);
				Ext.Viewport.animateActiveItem(messageDetailView, { type: "slide", direction: "left" });
				messageDetailView.setMasked(false);

		    },

		    failure: function(response) {
		        console.log("Curses, something terrible happened when trying to load Question Info");
		    },
		});
	},
});