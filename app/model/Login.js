Ext.define('ResTube.model.Login', {
    extend: 'Ext.data.Model',
    config: {
    	idProperty: "id",
    	fields: [
    		{ name: 'username', type: 'string'},
    		{ name: 'password', type: 'string'},
    		{ name: 'authentication', type: 'string'},
    		{ name: 'resource_uri', type: 'string'},
            { name: 'user_image', type: 'string'},
    		{ name: 'id', type: 'string'},
    	],
        proxy: {
            type: 'localstorage',
            id  : 'login-store',
        }
    }
});