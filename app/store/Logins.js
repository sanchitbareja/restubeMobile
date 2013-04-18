Ext.define('ResTube.store.Logins', {
    extend: 'Ext.data.Store',
    requires: "Ext.data.proxy.LocalStorage",
    config: {
        model: 'ResTube.model.Login',
        autoLoad: true,
        autoSync: true,
        proxy: {
            //use sessionstorage if need to save data for that
            //specific session only
            type: 'localstorage',
            id  : 'login-store',
        }
    }
});