Ext.define('ResTube.view.QuestionDetail',{
	extend: "Ext.Panel",
	alias: "widget.questiondetail",

	config: {
		styleHtmlContent: true,
        scrollable: true,
        tpl: "<div><ul><li>Question: {question}</li><li>Comments: <tpl for='comments'><p></p>{comment}, posted_by: {posted_by.username}</tpl></li><li>Posted By: {posted_by.username}</li></ul></div>",

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
		}],
	},

	onBackButtonTap4: function() {
		console.log("onBackButtonTapped4!");
		this.fireEvent("backToQuestionFeedCommand", this);
	},

});