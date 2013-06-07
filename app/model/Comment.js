Ext.define('ResTube.model.Comment', {
    extend: 'Ext.data.Model',
    config: {
    	idProperty: "id",
    	fields: [
    		{ name: 'id', type: 'int' },
    		{ name: 'comment', type: 'string' },
    		{ name: 'commenter_image', type: 'string' },
    		{ name: 'posted_at', type: 'string' },
            { name: 'answer_to', type: 'string' },
            { name: 'resource_uri', type: 'string' },
    	],
        hasOne: {
            associatedModel: 'ResTube.model.User',
            associatedName: 'posted_by',
            associationKey: 'posted_by',
        },
    }
});