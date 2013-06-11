Ext.define('ResTube.view.QuestionDetail',{
	extend: "Ext.Panel",
	alias: "widget.questiondetail",

	config: {
		styleHtmlContent: true,
        scrollable: true,
        styleHtmlCls: 'nomargin',
       	tpl:"<div class='row' id='question_detail_question'>"+
        		"<div class='small-12 columns page'>"+
        			'<tpl if="values.status==\'U\'">'+
	       				"<p class='label radius alert upperright'>Unresolved</p>"+
	       			"</tpl>"+
	       			'<tpl if="values.status==\'R\'">'+
	       				"<p class='label radius success upperright'>Resolved</p>"+
	       			"</tpl>"+
	       			'<br/>'+
	        		"<p><strong>{question}</strong></p>"+
	        		"<p>{details}</p>"+
	       			'<tpl if="values.media_url">'+
	       				"<p><br /><embed src='{media_url}' style='width:100%;'></p>"+
	       			"</tpl>"+
	        	"</div>"+
        	"</div>"+
        	"<div class='row'id='question_detail_comment_header'>"+
				"<ul>"+
					"<tpl for='comments'>"+
						"<li id='question_detail_comment'>{comment}<i> by {posted_by.username}</i></li>"+
					"</tpl>"+
					"<li id='question_detail_add_comment'>"+
						'<textarea rows="8" cols="30" name="comment" id="commentText"></textarea>'+
        				'<button type="submit" value="Comment" id="submitComment">Comment</button>'+
        			"</li>"+
        		"</ul>"+
			"</div>",

		items: [{
			xtype: "toolbar",
			title: "Question",
			docked: "top",
			items: [{
	            xtype: "button",
	            ui: "back",
	            text: "Back",
	            id: "backButton4"
	        }]
	    },{
	        xtype: "button",
	        margin: '10px',
	        text: "Mark as Resolved",
	        ui: "action",
	        hidden: true,
	        itemId: "resolveButton"
		}],

        listeners: [{
			delegate: "#backButton4",
			event: "tap",
			fn: "onBackButtonTap4",
		},{
			element: "element",
			delegate: "button#submitComment",
			event: "tap",
			fn: "onSubmitCommentTap",
		},{
			delegate: "#resolveButton",
			event: "tap",
			fn: "onResolveButtonTap"
		},{
            event: "show",
            fn: "onShow",
        }],
	},

	onShow: function(){
		this.getDockedItems()[0].setTitle((this.getData()).question.slice(0,12)+"...");
	},

	onBackButtonTap4: function() {
		console.log("onBackButtonTapped4!");
		this.fireEvent("backToQuestionFeedCommand", this);
	},

	onSubmitCommentTap: function() {
		console.log("submit a comment!");
		var root = this.element.dom;
		var commentInput = root.querySelectorAll('textarea[name=comment]')[0].value;
		var currentRecord = this.getData();

		this.setMasked({
		    xtype: 'loadmask',
		    message: 'Commenting',
		    indicator: true,
		});

		console.log(currentRecord.status);
		this.fireEvent("addCommentToQuestionCommand", this, commentInput, currentRecord.id, currentRecord.resource_uri, currentRecord.status);
	},

	onResolveButtonTap: function() {
		console.log("Issue resolved!");
		var currentRecord = this.getData();
		
		this.fireEvent("markResolvedCommand", this, currentRecord);
	},
});