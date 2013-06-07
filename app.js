/*------------------------------------------
Code to fix mismatched id's in localstorage
------------------------------------------*/

Ext.define('TP.extend.override.WebStorage', {
override: 'Ext.data.proxy.WebStorage',


read: function(operation, callback, scope) {
var records = [],
ids = this.getIds(),
model = this.getModel(),
idProperty = model.getIdProperty(),
params = operation.getParams() || {},
sorters = operation.getSorters(),
filters = operation.getFilters(),
start = operation.getStart(),
limit = operation.getLimit(),
length = ids.length,
i, record, collection;


//read a single record
if (params[idProperty] !== undefined) {
record = this.getRecord(params[idProperty]);
if (record) {
records.push(record);
operation.setSuccessful();
}
} else {
for (i = 0; i < length; i++) {
//OVERRIDE: Add check here to make sure previous versions of sencha did not leave bogus IDs
record = this.getRecord(ids[i]);
if(record){
records.push(record);
}
}


collection = Ext.create('Ext.util.Collection');


// First we comply to filters
if (filters && filters.length) {
collection.setFilters(filters);
}
// Then we comply to sorters
if (sorters && sorters.length) {
collection.setSorters(sorters);
}


collection.addAll(records);


if (this.getEnablePagingParams() && start !== undefined && limit !== undefined) {
records = collection.items.slice(start, start + limit);
} else {
records = collection.items.slice();
}


operation.setSuccessful();
}


operation.setCompleted();


operation.setResultSet(Ext.create('Ext.data.ResultSet', {
records: records,
total : records.length,
loaded : true
}));
operation.setRecords(records);


if (typeof callback == 'function') {
callback.call(scope || this, operation);
}
}
});

//<debug>

Ext.Loader.setPath({
    'Ext': 'touch/src',
    'ResTube': 'app'
});

Ext.Loader.setPath({
    'Ext.ux': 'touch/src/ux'
});

//</debug>

Ext.application({
    name: 'ResTube',
    requires: ['Ext.ux.Fileup'],

    models: ['Login', 'Media', 'Product'],
    views: ['Login','Main','Search', 'Contacts','SearchResults','Product','FeedDetail','ContactDetail','QuestionFeed','QuestionDetail','AddQuestionForm','PDFViewer','Feedback'],
    controllers: ['LoginController','SearchController','ContactsController','QuestionController','FeedbackController'],
    stores: ['Logins', 'Products'],
    

    icon: {
        '57': 'resources/icons/Icon.png',
        '72': 'resources/icons/Icon~ipad.png',
        '114': 'resources/icons/Icon@2x.png',
        '144': 'resources/icons/Icon~ipad@2x.png'
    },

    isIconPrecomposed: true,

    startupImage: {
        '320x460': 'resources/startup/320x460.jpg',
        '640x920': 'resources/startup/640x920.png',
        '768x1004': 'resources/startup/768x1004.png',
        '748x1024': 'resources/startup/748x1024.png',
        '1536x2008': 'resources/startup/1536x2008.png',
        '1496x2048': 'resources/startup/1496x2048.png'
    },

    launch: function() {
        // Destroy the #appLoadingIndicator element
            Ext.fly('appLoadingIndicator').destroy();

            // Initialize the main view
            // Ext.Viewport.add([{xtype:'maincontainer'}]);
            Ext.Viewport.add([{xtype:'logincontainer'}]);
        },

    // add onUpdated to reload application when new build is pushed. VERY IMPORTANT!
});
