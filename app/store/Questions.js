Ext.define('ResTube.store.Questions', {
    extend: 'Ext.data.Store',
    requires: "Ext.data.proxy.JsonP",
    config: {
        model: 'ResTube.model.Question',
    }
});