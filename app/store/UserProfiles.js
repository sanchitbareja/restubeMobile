Ext.define('ResTube.store.UserProfiles', {
    extend: 'Ext.data.Store',
    requires: "Ext.data.proxy.JsonP",
    config: {
        model: 'ResTube.model.UserProfile',
    }
});