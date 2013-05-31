Ext.define('ResTube.view.QuestionDetail',{
	extend: "Ext.Panel",
	alias: "widget.questiondetail",

	config: {
		styleHtmlContent: true,
        scrollable: true,
        styleHtmlCls: 'nomargin',
       	tpl:"<div class='row' id='question_detail_question'>"+
        		"<div class='small-12 columns'>"+
	        		"<p>{question}</p>"+
	        		"<p>{details}</p>"+
	        		'<tpl if="values.status==\'U\'">'+
	       				"<p class='label radius'>Unresolved</p>"+
	       			"</tpl>"+
	       			'<tpl if="values.status==\'R\'">'+
	       				"<p class='label radius success'>Resolved</p>"+
	       			"</tpl>"+
	       			"<p><br /><img src='{media_url}' style='width:100%;'></p>"+
	        	"</div>"+
        	"</div>"+
        	"<div class='row'id='question_detail_comment_header'>"+
				"<ul>"+
					"<tpl for='comments'>"+
						"<li id='question_detail_comment'>{comment}<i> by {posted_by.username}</i></li>"+
					"</tpl>"+
					"<li id='question_detail_add_comment'>"+
        				'<input type="text" name="comment" id="commentText">'+
        				'<button type="submit" value="Comment" id="submitComment">Comment</button>'+
        			"</li>"+
        		"</ul>"+
			"</div>",

		items: [{
			xtype: "toolbar",
			title: "Question",
			docked: "top",
			items: {
	            xtype: "button",
	            ui: "back",
	            text: "Back",
	            id: "backButton4"
	        },
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
		var commentInput = root.querySelectorAll('input[name=comment]')[0].value;
		var currentRecord = this.getData();

		console.log(currentRecord.status);
		this.fireEvent("addCommentToQuestionCommand", this, commentInput, currentRecord.id, currentRecord.resource_uri, currentRecord.status);
	},

});