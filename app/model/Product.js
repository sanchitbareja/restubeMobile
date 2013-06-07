Ext.define('ResTube.model.Product', {
    extend: 'Ext.data.Model',
    config: {
    	idProperty: "id",
    	fields: [
    		{ name: 'id', type: 'int' },
    		{ name: 'electrical_link', type: 'string' },
    		{ name: 'iom_link', type: 'string' },
    		{ name: 'model_no', type: 'string' },
            { name: 'name', type: 'string' },
    		{ name: 'parts_link', type: 'string' },
            { name: 'performance_data_link', type: 'string' },
            { name: 'serial_no', type: 'string' },
            { name: 'service_bulletin_link', type: 'string' },
            { name: 'service_history_link', type: 'string' },
            { name: 'resource_uri', type: 'string' },
    	],
        hasMany: {
            model: 'ResTube.model.Media',
            name: 'media',
        },
    }
});