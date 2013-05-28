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
		console.log(searchValue);
		console.log("searchProductCommand2");

		var searchList = this.getSearchResults();
		var restubeSearchView = this.getRestubeSearch();
		console.log(searchList);

		var myRequest = Ext.Ajax.request({
		    url: 'http://restube.herokuapp.com/api/v1/product/?format=json',
		    method: 'GET',
		    disableCaching: false,
		    // withCredentials: true,
		    useDefaultXhrHeader: false,
		    params: {
		    	name__contains: searchValue
		    },

		    success: function(response) {
		        console.log("Spiffing, everything worked");
		        var jsondecoded = Ext.JSON.decode(response.responseText);
		        console.log(jsondecoded.objects);
		        searchList.setData(jsondecoded.objects);
				Ext.Viewport.animateActiveItem(searchList, { type: "slide", direction: "left" });
				restubeSearchView.setMasked(false);
		    },

		    failure: function(response) {
		        console.log("Curses, something terrible happened");
		    },
		});

	},

	onBackButtonCommand: function() {
		console.log("onBackButtonCommand");
		this.activateProductSearch();
	},

	onBackToProductCommand: function() {
		console.log("onBackToProductCommand");
		this.activateProductInfo();
	},

	onProductInfoCommand: function(view, productId) {
		console.log("onProductInfoCommand");
		console.log(productId);

		var requestURL = 'http://restube.herokuapp.com/api/v1/product/'+productId+'/?format=json';
		var productInfo = this.getRestubeProduct();

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
		        console.log(productInfo);
		        console.log(productInfo.getItems());
		        // productInfo.setRecord(jsondecoded);
		        productInfo.setData(jsondecoded);
				Ext.Viewport.animateActiveItem(productInfo, { type: "slide", direction: "left" });
		    },

		    failure: function(response) {
		        console.log("Curses, something terrible happened when trying to load Product Info");
		    },
		});
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