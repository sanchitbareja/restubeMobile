Ext.define('ResTube.model.Message', {
    extend: 'Ext.data.Model',
    config: {
    	idProperty: "id",
    	fields: [
    		{ name: 'id', type: 'int' },
    		{ name: 'text', type: 'string' },
    		{ name: 'media_url', type: 'string' },
            { name: 'resource_uri', type: 'string' },
    	],
        hasOne: [{
            associatedModel: 'ResTube.model.User',
            associatedName: 'from_user',
            associationKey: 'from_user',
        },{
            associatedModel: 'ResTube.model.User',
            associatedName: 'to_user',
            associationKey: 'to_user',
        },]
    }
});