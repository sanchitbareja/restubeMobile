Ext.define('ResTube.model.User', {
    extend: 'Ext.data.Model',
    config: {
    	idProperty: "id",
    	fields: [
    		{ name: 'id', type: 'int' },
            { name: 'username', type: 'string' },
    		{ name: 'date_joined', type: 'string' },
    		{ name: 'email', type: 'string' },
    		{ name: 'first_name', type: 'string' },
            { name: 'is_active', type: 'string' },
            { name: 'is_staff', type: 'string' },
            { name: 'last_login', type: 'string' },
            { name: 'last_name', type: 'string' },
            { name: 'user_image', type: 'string' },
            { name: 'resource_uri', type: 'string' },
    	],
    }
});