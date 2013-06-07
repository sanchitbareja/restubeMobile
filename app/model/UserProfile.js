Ext.define('ResTube.model.UserProfile', {
    extend: 'Ext.data.Model',
    config: {
    	idProperty: "id",
    	fields: [
    		{ name: 'id', type: 'int' },
    		{ name: 'job_title', type: 'string' },
    		{ name: 'phone_no', type: 'string' },
    		{ name: 'skype_id', type: 'string' },
            { name: 'thumbnail_photo', type: 'string' },
            { name: 'resource_uri', type: 'string' },
    	],
        hasMany: {
            associatedModel: 'ResTube.model.Product',
            associatedName: 'skills',
            associationKey: 'skills',
        },
        hasOne: {
            associatedModel: 'ResTube.model.User',
            associatedName: 'user',
            associationKey: 'user',
        },
    }
});