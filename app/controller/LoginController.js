Ext.define("ResTube.controller.LoginController",{
	extend: "Ext.app.Controller",
	config: {
		refs: {
			//lookup our views by xtype
			mainContainer: "maincontainer",
			loginContainer: "logincontainer",
			restubeQuestionFeed: "restubequestionfeed",
			restubeSearch: "restubesearch",
			restubeContacts: "restubecontacts",
			restubeFeedback: "restubefeedback",
			whiteboardlist: "whiteboardlist",
		},
		control: {
			loginContainer: {
				//commands fired by logincontainer
				loginButtonCommand: "onLoginCommand",
				onLoginShow: "onLoginShowCommand",
			},
			restubeQuestionFeed: {
				logoutCommand: "onLogoutButtonCommand",
			},
			restubeSearch: {
				logoutCommand: "onLogoutButtonCommand",
			},
			restubeContacts: {
				logoutCommand: "onLogoutButtonCommand",
			},
			restubeFeedback: {
				logoutCommand: "onLogoutButtonCommand",
			},
			whiteboardlist: {
				logoutCommand: "onLogoutButtonCommand",
			}
		}
	},

	//Transitions
	slideLeftTransition: { type: "slide", direction: "left" },
	slideRightTransition: { type: "slide", direction: "right" },
	slideUpTransition: { type: "slide", direction: "up" },
	slideDownTransition: { type: "slide", direction: "down" },

	//Commands fired by the view
	onLoginCommand: function(view, username, password) {
		console.log(username);
		console.log(password);
		console.log("onLoginCommand");

		var encoded_authorization = this.base64_encode(username+":"+password);
		console.log(encoded_authorization);
		var main_container = this.getMainContainer();
		var loginContainerView = this.getLoginContainer();

		var myRequest = Ext.Ajax.request({
		    url: 'http://restube.herokuapp.com/api/v1/user/?format=json',
		    method: 'GET',
		    disableCaching: false,
		    // withCredentials: true,
		    useDefaultXhrHeader: false,
		    headers: {
		    	"Authorization": "Basic "+encoded_authorization,
		    },

		    params: {
		    	username__exact: username,
		    },

		    success: function(response) {
		        console.log("Spiffing, everything worked");
		        console.log(response);
		        var jsondecoded = Ext.JSON.decode(response.responseText);
		        console.log(jsondecoded);
		        if(jsondecoded['meta']['total_count'] == 1){
		        	var newLogin = Ext.create("ResTube.model.Login", {
		        		id: jsondecoded['objects'][0]['id'],
		        		username: username,
		        		password: password,
		        		authentication: encoded_authorization,
		        		resource_uri: jsondecoded['objects'][0]['resource_uri'],
		        		user_image: "https://resolutiontube.s3.amazonaws.com/"+jsondecoded['objects'][0]['user_image'],
		        	});
		        	console.log("newLogin:");
		        	console.log(newLogin);
		        	var loginStore = Ext.getStore("Logins");
		        	console.log(loginStore);
		        	if(loginStore.findRecord('id', newLogin.data.id) == null){
		        		Ext.getStore("Logins").add(newLogin);
		        		newLogin.save();
		        		console.log("adding newLogin");
		        	}
		        	Ext.getStore('Logins').sync();
		        	console.log(Ext.getStore('Logins'));

		        	loginContainerView.setMasked(false);
			        Ext.Viewport.removeAll();
			        Ext.Viewport.add([{xtype:'maincontainer'}]);
					Ext.Viewport.animateActiveItem(main_container, { type: "slide", direction: "left" });
		        }
		    },

		    failure: function(response) {
		    	console.log(response);
		        console.log("Curses, something terrible happened");

		        loginContainerView.setMasked({
				    xtype: 'loadmask',
				    message: 'Login failed. Please check your username or password.',
				    indicator: false,
				});

		        //create the delayed task instance with our callback
				var task = Ext.create('Ext.util.DelayedTask', function() {
					loginContainerView.setMasked(false);
				});
				task.delay(2000); //the callback function will now be called after 1000ms

		    },

		    callback: function(response) {
		    	console.log("callback from ajax request!");
		    }
		});

	},

	onLoginShowCommand: function(view){
		if(Ext.getStore("Logins").data.all.length == 1) {
			this.getLoginContainer().setMasked(false);
	        Ext.Viewport.removeAll();
	        Ext.Viewport.add([{xtype:'maincontainer'}]);
			Ext.Viewport.animateActiveItem(this.getMainContainer(), { type: "slide", direction: "left" });
		}
	},

	onLogoutButtonCommand: function(view){
		console.log("onLogoutButtonCommand");
		Ext.getStore("Logins").removeAll();
		Ext.getStore("Logins").sync();
		Ext.Viewport.removeAll();
        Ext.Viewport.add([{xtype:'logincontainer'}]);
		// Ext.Viewport.animateActiveItem(, { type: "slide", direction: "left" });
	},

	//helper functions
	base64_encode: function(data) {
  		// http://kevin.vanzonneveld.net
	  	// +   original by: Tyler Akins (http://rumkin.com)
	  	// +   improved by: Bayron Guevara
	  	// +   improved by: Thunder.m
	  	// +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
	  	// +   bugfixed by: Pellentesque Malesuada
	  	// +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
	  	// +   improved by: Rafał Kukawski (http://kukawski.pl)
	  	// *     example 1: base64_encode('Kevin van Zonneveld');
	  	// *     returns 1: 'S2V2aW4gdmFuIFpvbm5ldmVsZA=='
	  	// mozilla has this native
	  	// - but breaks in 2.0.0.12!
	  	//if (typeof this.window['btoa'] == 'function') {
	  	//    return btoa(data);
	  	//}
  		var b64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
  		var o1, o2, o3, h1, h2, h3, h4, bits, i = 0,
    	ac = 0,
    	enc = "",
    	tmp_arr = [];

  		if (!data) {
    		return data;
  		}

	  	do { // pack three octets into four hexets
    		o1 = data.charCodeAt(i++);
    		o2 = data.charCodeAt(i++);
    		o3 = data.charCodeAt(i++);

    		bits = o1 << 16 | o2 << 8 | o3;

    		h1 = bits >> 18 & 0x3f;
    		h2 = bits >> 12 & 0x3f;
    		h3 = bits >> 6 & 0x3f;
    		h4 = bits & 0x3f;

    		// use hexets to index into b64, and append result to encoded string
    		tmp_arr[ac++] = b64.charAt(h1) + b64.charAt(h2) + b64.charAt(h3) + b64.charAt(h4);
  		} while (i < data.length);

  		enc = tmp_arr.join('');
  		var r = data.length % 3;
  		return (r ? enc.slice(0, r - 3) : enc) + '==='.slice(r || 3);
	},
});