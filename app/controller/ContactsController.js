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
		contactsList.setMasked({
        	xtype: "loadmask",
        	message: "Loading Contacts...",
        });

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
		    	contactsList.setData(jsondecoded.objects);
		    	contactsList.setMasked(false);
		    },

		    failure: function(response) {
		    	console.log(response);
		        console.log("Curses, something terrible happened");
		    },
		});

	},

	onLoadNextPageCommand: function(){
		console.log("onLoadNextPageCommand");

		var contactsList = this.getRestubeContacts();
		var contactsList_offset = contactsList.getStore().getCount();

		console.log(contactsList_offset);

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
		    	contactsList.getStore().add(jsondecoded.objects);
		    	contactsList.setMasked(false);
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
		        console.log("Curses, something terrible happened when trying to load Product Info");
		    },
		});
	},

	onContactSearchCommand: function(searchText) {
		console.log("onContactSearchCommand");
		console.log(searchText);

		var contactsList = this.getRestubeContacts();
		contactsList.setMasked(true);
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
		        if(contactsList.getStore()){
			        contactsList.getStore().removeAll();
			    }
		    	contactsList.setData(jsondecoded.objects);
		    	contactsList.setMasked(false);
		    },

		    failure: function(response) {
		    	console.log(response);
		        console.log("Curses, something terrible happened");
		        contactsList.setMasked(true);
		    },
		});
	},

	onBackToContactsCommand: function() {
		console.log("onBackToContactsCommand");
		this.activateContactsView();
	},

	//helper functions
	activateContactsView: function () {
		Ext.Viewport.animateActiveItem(this.getMainContainer(), { type: "slide", direction: "right" });
	},
});