Ext.define('ResTube.view.Whiteboard', {
	extend: "Ext.Panel",
	alias: "widget.whiteboard",
	requires: ['Ext.ux.Fileup'],

	config: {
		styleHtmlContent: true,
        scrollable: null,
        tpl:"<div class='message_card up'>"+
        		'<div class="row">'+
					'<div class="small-12 columns">'+
						"<b>From:</b> {from_user.first_name} {from_user.last_name}<br/>"+
	        			"<b>To:</b> {to_user.first_name} {to_user.last_name}"+
	        		'</div>'+
				'</div>'+
				'<div class="row">'+
					'<div class="small-12 columns">'+
						'<textarea rows="3" name="message" id="messageText"></textarea>'+
					'</div>'+
				'</div>'+
				'<div class="row">'+
					'<div class="small-12 columns">'+
						"<div id='canvasDiv'></div>"+
					'</div>'+
				'</div>'+
				'<div class="row">'+
					'<div class="small-6 columns"></div>'+
					'<div class="small-6 columns">'+
						'<button type="button" value="Send" id="saveCanvasButton">Send</button>'+
					'</div>'+
				'</div>'+
			"</div>",

		items: [{
			xtype: "toolbar",
			title: "Whiteboard",
			docked: "top",
			items: [{
                xtype: "button",
                ui: "action",
                text: "Cancel",
                id: "cancelButton",
            }]
		},{
	        itemId: 'browseFileBtn',
	        id: 'browseFileBtn',
	        xtype: 'fileupload',
	        autoUpload: true,
	        loadAsDataUrl: true,
	        style: "color: #000;"+
				  "font-size: 100%;"+
				  "width: 45%;"+
				  "vertical-align: top;"+
				  "background-color: #fff;"+
				  "padding: 0px;"+
				  "margin-left: 5%;"+
				  "border:1px solid #000;"+
				  "border-radius: .3em;"+
				  "-moz-border-radius: .3em;"+
				  "-khtml-border-radius: .3em;"+
				  "-webkit-border-radius: .3em;"+
				  "top: 90.1%;",
	        states: {
	            browse: {
	                text: 'Add Picture'
	            },
	            ready: {
	                text: 'Load'
	            },
	            uploading: {
	                text: 'Loading',
	                loading: true
	            }
	        }
	        
	        // For success and failure callbacks setup look into controller
	    }],

        listeners: [{
        	element: "element",
        	delegate: "button#saveCanvasButton",
        	event: "tap",
        	fn: "onSaveCanvas",
        }, {
        	delegate: "#cancelButton",
        	event: "tap",
        	fn: "onCancelTap",
        }],
	},

	onSaveCanvas: function() {
		console.log("save canvas now!");
		var canvas = '';
		var canvasImage = '';
		var canvasImageUrl = '';
		try {
			canvas = document.getElementById('canvasSignature');
			canvasImage = canvas.getContext('2d').getImageData(0, 0, canvas.width, canvas.height);
			canvasImageUrl = canvas.toDataURL("image/png").replace("data:image/png;base64,", "");
		} catch(err) {
			// do nothing
		}
		var to_user_data = this.getData();
		console.log(to_user_data);

		var root = this.element.dom;
		var messageInput = root.querySelectorAll('textarea[name=message]')[0].value;

		this.fireEvent('saveDrawing', to_user_data, messageInput, canvasImage, canvasImageUrl);
	},

	onCancelTap: function() {
		console.log("cancel canvas button");
		this.fireEvent('cancelDrawing');
	},

});