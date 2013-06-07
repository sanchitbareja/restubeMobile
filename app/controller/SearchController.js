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
			googlePdfViewer: {
				selector: "googlepdfviewer",
				xtype: 'googlepdfviewer',
				autoCreate: true,
			}
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
				loadPdfViewerCommand: "onLoadPdfViewerCommand",
			},
			googlePdfViewer: {
				//comands fired by googlePdfViewer
				backToProductCommand: "onBackToProductCommand",	
			}
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
					Ext.Viewport.animateActiveItem(productInfo, { type: "slide", direction: "left" });
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

	onLoadPdfViewerCommand: function(view, link) {
		console.log("onLoadPdfViewerCommand");
		var encoded_url = encodeURIComponent(link);
		console.log(encoded_url);

		var pdfViewerView = this.getGooglePdfViewer();
		pdfViewerView.setData({'encoded_pdf_url':encoded_url});
		Ext.Viewport.animateActiveItem(pdfViewerView, { type: "slide", direction: "left" });
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