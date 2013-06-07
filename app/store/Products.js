Ext.define('ResTube.store.Products', {
    extend: 'Ext.data.Store',
    requires: "Ext.data.proxy.JsonP",
    config: {
        model: 'ResTube.model.Product',
    }
});