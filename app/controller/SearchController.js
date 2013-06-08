Ext.define("ResTube.controller.SearchController",{
	extend: "Ext.app.Controller",
	config: {
		refs: {
			//lookup our views by xtype
			mainContainer: "maincontainer",
			restubeSearch: "restubesearch",
			searchResults: {
				selector: "searchresults",
				xtype: "searchresults",
				autoCreate: true,
			},
			restubeProduct: {
				selector: "restubeproduct",
				xtype: "restubeproduct",
				autoCreate: true,
			},
		},
		control: {
			restubeSearch: {
				//commands fired by restubeSearch
				searchButtonCommand: "onSearchProductCommand",
			},
			searchResults: {
				//commands fired by searchResults
				backButtonCommand: "onBackButtonCommand",
				productInfoCommand: "onProductInfoCommand",
				loadNextPageCommand: "onLoadNextPageCommand",
			},
			restubeProduct: {
				//commands fired by restubeProduct
				backToResultsCommand: "onBackToResultsCommand",
			},
		}
	},

	//Transitions
	slideLeftTransition: { type: "slide", direction: "left" },
	slideRightTransition: { type: "slide", direction: "right" },

	//Commands fired by the view
	onSearchProductCommand: function(view, searchValue) {
		// get references to list that needs to be populated and previous view
		var searchList = this.getSearchResults();
		var restubeSearchView = this.getRestubeSearch();

		try {
			var myRequest = Ext.Ajax.request({
			    url: 'http://restube.herokuapp.com/api/v1/product/search/?format=json&models=products.product&q='.concat(searchValue),
			    method: 'GET',
			    disableCaching: false,
			    // withCredentials: true,
			    useDefaultXhrHeader: false,
			    params: {},

			    success: function(response) {
			        var jsondecoded = Ext.JSON.decode(response.responseText);
			        // reset the search view to remove all old data.
			        restubeSearchView.reset();
			        // populate the list data
			        var productsStore = searchList.getStore();
			        try{
			        	searchList.getStore().removeAll();
			      		for (var i = 0; i < jsondecoded.objects.length; i++) {
			      			var product_object = Ext.create('ResTube.model.Product', jsondecoded.objects[i]);
			      			product_object.set('media', jsondecoded.objects[i].media);
			      			var product_media = product_object.media();
			      			for (var j =  0; j < jsondecoded.objects[i].media.length; j++) {
			      				var media_object = Ext.create('ResTube.model.Media', {
			      					id: jsondecoded.objects[i].media[j].id,
			      					resource_uri: jsondecoded.objects[i].media[j].resource_uri,
			      					url: jsondecoded.objects[i].media[j].url,
			      				});
			      				product_media.add(media_object);
			      			};
			      			product_media.sync();
			      			productsStore.add(product_object);
			      		};
			        	// searchList.getStore().add(jsondecoded.objects);
			        	console.log(searchList.getStore().getData());
				        // bring the list into main view
						Ext.Viewport.animateActiveItem(searchList, { type: "slide", direction: "left" });
						// turn spinner off
						restubeSearchView.setMasked(false);
				    } catch (err) {
				    	// reset the search view to remove all old data.
				        restubeSearchView.reset();
				        // turn spinner off
				        restubeSearchView.setMasked(false)
				    }
			        
			    },

			    failure: function(response) {
			        console.log("Curses, something terrible happened");
			    },
			});
		} catch (err) {
			// reset the search view to remove all old data.
	        restubeSearchView.reset();
	        // turn spinner off
	        restubeSearchView.setMasked(false)
	        // bring the search view into main view
	        Ext.Viewport.animateActiveItem(restubeSearchView, { type: "slide", direction: "right" });
		}

	},

	onBackButtonCommand: function() {
		this.activateProductSearch();
	},

	onBackToProductCommand: function() {
		this.activateProductInfo();
	},

	onProductInfoCommand: function(view, productId) {

		var productInfo = this.getRestubeProduct();

		try{
			var myRequest = Ext.Ajax.request({
			    url: 'http://restube.herokuapp.com/api/v1/product/'.concat(productId).concat('/?format=json'),
			    method: 'GET',
			    disableCaching: false,
			    // withCredentials: true,
			    useDefaultXhrHeader: false,
			    params: {},

			    success: function(response) {
			        var jsondecoded = Ext.JSON.decode(response.responseText);
			        // productInfo.setRecord(jsondecoded);
			        productInfo.setData(jsondecoded);
			        console.log(productInfo.getData());
					Ext.Viewport.animateActiveItem(productInfo, { type: "slide", direction: "left" });

					productInfo.getDockedItems()[0].setTitle(jsondecoded.name.slice(0,12)+"...");
					$(".rslides").responsiveSlides({
					  auto: false,             // Boolean: Animate automatically, true or false
					  speed: 500,            // Integer: Speed of the transition, in milliseconds
					  timeout: 4000,          // Integer: Time between slide transitions, in milliseconds
					  pager: true,           // Boolean: Show pager, true or false
					  nav: true,             // Boolean: Show navigation, true or false
					  random: false,          // Boolean: Randomize the order of the slides, true or false
					  pause: false,           // Boolean: Pause on hover, true or false
					  pauseControls: true,    // Boolean: Pause when hovering controls, true or false
					  prevText: "Previous",   // String: Text for the "previous" button
					  nextText: "Next",       // String: Text for the "next" button
					  maxwidth: "",           // Integer: Max-width of the slideshow, in pixels
					  navContainer: "",       // Selector: Where controls should be appended to, default is after the 'ul'
					  manualControls: "",     // Selector: Declare custom pager navigation
					  namespace: "rslides",   // String: Change the default namespace used
					  before: function(){},   // Function: Before callback
					  after: function(){}     // Function: After callback
					});
			    },

			    failure: function(response) {
			        console.log("Curses, something terrible happened when trying to load Product Info");
			    },
			});
		} catch(err){
			var restubeSearchView = this.getRestubeSearch();

			productInfo.reset();
			restubeSearchView.reset();

			Ext.Viewport.animateActiveItem(restubeSearchView, { type: "slide", direction: "right" });
		}
		
	},

	onBackToResultsCommand: function() {
		console.log("onBackToResultsCommand");
		this.activateProductResults();
	},

	//helper functions
	activateProductSearch: function () {
	    Ext.Viewport.animateActiveItem(this.getMainContainer(), { type: "slide", direction: "right" });
	},

	activateProductResults: function () {
		Ext.Viewport.animateActiveItem(this.getSearchResults(), { type: "slide", direction: "right" });
	},

	activateProductInfo: function () {
		console.log("activateProductInfo");
		console.log(this.getRestubeProduct());
		Ext.Viewport.animateActiveItem(this.getRestubeProduct(), { type: "slide", direction: "right" });
	},
});