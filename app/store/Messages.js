Ext.define('ResTube.store.Messages', {
    extend: 'Ext.data.Store',
    requires: "Ext.data.proxy.JsonP",
    config: {
        model: 'ResTube.model.Message',
    }
});