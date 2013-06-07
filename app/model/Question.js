Ext.define('ResTube.model.Question', {
    extend: 'Ext.data.Model',
    config: {
    	idProperty: "id",
    	fields: [
    		{ name: 'id', type: 'int' },
    		{ name: 'details', type: 'string' },
    		{ name: 'media_url', type: 'string' },
    		{ name: 'posted_at', type: 'string' },
            { name: 'question', type: 'string' },
    		{ name: 'questioner_image', type: 'string' },
            { name: 'resource_uri', type: 'string' },
            { name: 'status', type: 'string' },
    	],
        hasMany: {
            associatedModel: 'ResTube.model.Comment',
            associatedName: 'comments',
            associationKey: 'comments',
        },
        hasOne: {
            associatedModel: 'ResTube.model.User',
            associatedName: 'posted_by',
            associationKey: 'posted_by',
        },
    }
});