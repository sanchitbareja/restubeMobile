Ext.define("ResTube.controller.ContactsController",{
	extend: "Ext.app.Controller",
	config: {
		refs: {
			//lookup our views by xtype
			mainContainer: "maincontainer",
			restubeContacts: {
				selector: "restubecontacts",
				xtype: "restubecontacts",
				autoCreate: true,
			},
			contactDetail: {
				selector: "contactdetail",
				xtype: "contactdetail",
				autoCreate: true
			},
		},
		control: {
			restubeContacts: {
				//commands by restubeFeed
				contactInfoCommand: "onContactInfoCommand",
				loadContactsDataCommand: "loadContactsData",
				contactSearchCommand: "onContactSearchCommand",
				loadNextPageCommand: "onLoadNextPageCommand",
			},
			contactDetail: {
				//commands by feedDetail
				backToContactsCommand: "onBackToContactsCommand",
				osCheck: "onOsCheckCommand",
				negVideoButtonCommand: "onNegVideoButtonCommand",
				addStatistic: "onAddStatistic",
			}
		},
	},

	//Transitions
	slideLeftTransition: { type: "slide", direction: "left" },
	slideRightTransition: { type: "slide", direction: "right" },
	slideUpTransition: { type: "slide", direction: "up" },
	slideDownTransition: { type: "slide", direction: "down" },

	//On launch and refresh
	loadContactsData: function() {

		console.log("loading contacts...");

		var contactsList = this.getRestubeContacts();
		var contactStore = contactsList.getStore();
		contactsList.setMasked({
        	xtype: "loadmask",
        	message: "Loading Contacts...",
        });

        try{
        	var myRequest = Ext.Ajax.request({
			    url: 'http://restube.herokuapp.com/api/v1/userprofile/?format=json',
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
			        console.log(contactsList);
			        contactStore.removeAll();

			        for (var i = 0; i < jsondecoded.objects.length; i++) {
			        	var contact_object = Ext.create('ResTube.model.UserProfile', jsondecoded.objects[i]);
			        	contact_object.set('user', jsondecoded.objects[i].user);
			        	contact_object.set('skills', jsondecoded.objects[i].skills);
			        	contactStore.add(contact_object);
			        };

			    	contactsList.setMasked(false);
			    },

			    failure: function(response) {
			    	console.log(response);
			        console.log("Curses, something terrible happened");
			    },
			});
        } catch (err) {

        }

	},

	onLoadNextPageCommand: function(){
		console.log("onLoadNextPageCommand");

		var contactsList = this.getRestubeContacts();
		var contactStore = contactsList.getStore();
		var contactsList_offset = contactStore.getCount();

		console.log(contactsList_offset);

		try{
        	var myRequest = Ext.Ajax.request({
			    url: 'http://restube.herokuapp.com/api/v1/userprofile/?format=json&offset='.concat(contactsList_offset),
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
			        console.log(contactsList);
			        for (var i = 0; i < jsondecoded.objects.length; i++) {
			        	var contact_object = Ext.create('ResTube.model.UserProfile', jsondecoded.objects[i]);
			        	contact_object.set('user', jsondecoded.objects[i].user);
			        	contact_object.set('skills', jsondecoded.objects[i].skills);
			        	contactStore.add(contact_object);
			        };

			    	contactsList.setMasked(false);
			    	// remove the spinner to not confuse user from thinking that more data is being loaded
			    	if(!jsondecoded.meta.next){
			    		var moreContactCmp = Ext.getCmp('getMoreContactsCmp');
			    		moreContactCmp.hide();
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
	onContactInfoCommand: function(view, contactId){
		console.log("onContactInfoCommand!");
		console.log(contactId);

		var contactDetailView = this.getContactDetail();
		var requestURL = 'http://restube.herokuapp.com/api/v1/userprofile/'+contactId+'/?format=json';

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
		        contactDetailView.setData(jsondecoded);
				Ext.Viewport.animateActiveItem(contactDetailView, { type: "slide", direction: "left" });
		    },

		    failure: function(response) {
		        console.log("Curses, something terrible happened when trying to load Contact Info");
		    },
		});
	},

	onContactSearchCommand: function(searchText) {
		console.log("onContactSearchCommand");
		console.log(searchText);

		var contactsList = this.getRestubeContacts();
		var contactStore = contactsList.getStore();
		contactsList.setMasked(true);


		if(!searchText){
			console.log("Empty search");
			this.loadContactsData();
		} else {
			var myRequest = Ext.Ajax.request({
			    url: 'http://restube.herokuapp.com/api/v1/userprofile/search/?format=json&models=userprofiles.userprofile&q='.concat(searchText),
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
			        console.log(contactsList);
			        contactStore.removeAll();
			        // question_store.add(jsondecoded.objects);
			        for (var i = 0; i < jsondecoded.objects.length; i++) {
			        	var contact_object = Ext.create('ResTube.model.UserProfile', jsondecoded.objects[i]);
			        	contact_object.set('posted_by', jsondecoded.objects[i].posted_by);
			        	contact_object.set('comments', jsondecoded.objects[i].comments);
			        	contactStore.add(contact_object);
			        };
			    	contactsList.setMasked(false);
			    },

			    failure: function(response) {
			    	console.log(response);
			        console.log("Curses, something terrible happened");
			        contactsList.setMasked(true);
			    },
			});
		}
	},

	onAddStatistic: function(to_user_data, deal_type) {
		//get user credentials
		var loginStore = Ext.getStore("Logins");
		var user = loginStore.data.all[0].data;
		console.log(user);

		var myRequest = Ext.Ajax.request({
			url: 'http://restube.herokuapp.com/api/v1/dealing/',
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
				"deal_type": deal_type,
			},

			success: function(response) {
				console.log(response);
				console.log("Spiffing, everything worked! Added a new message!");

			},

			failure: function(response) {

			},
		});
	},

	onBackToContactsCommand: function() {
		console.log("onBackToContactsCommand");
		this.activateContactsView();
	},

	onOsCheckCommand: function(view) {
		console.log("initiating OS check");

		var contactDetailView = this.getContactDetail();
		contactData = contactDetailView.getData();
		contactData.ios = true;

		if (!Ext.os.is("iOS")) {
			contactData.ios = false;
		}

		console.log(contactData);
		contactDetailView.setData(contactData);
	},

	onNegVideoButtonCommand: function(view) {
		var contactDetailView = this.getContactDetail();
		
		contactDetailView.setMasked({
			xtype: "loadmask",
    		message: "Sorry, video chat is not supported on your device quite yet.",
    		indicator: true,
		});

		var task = Ext.create('Ext.util.DelayedTask', function() {
			contactDetailView.setMasked(false);
		});

		task.delay(2000);
	},

	//helper functions
	activateContactsView: function () {
		Ext.Viewport.animateActiveItem(this.getMainContainer(), { type: "slide", direction: "right" });
	},
});