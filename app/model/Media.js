Ext.define('ResTube.model.Media', {
    extend: 'Ext.data.Model',
    config: {
    	idProperty: "id",
    	fields: [
    		{ name: 'id', type: 'int' },
    		{ name: 'url', type: 'string' },
            { name: 'resource_uri', type: 'string' },
    	],
    },
});