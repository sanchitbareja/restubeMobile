Ext.define('ResTube.view.Main', {
    extend: 'Ext.tab.Panel',
    alias: "widget.maincontainer",
    requires: ["Ext.plugin.PullRefresh", "Ext.plugin.ListPaging", "Ext.field.Search"],
    config: {
        fullscreen: true,
        tabBarPosition: 'bottom',
        showAnimation: "fadeIn",
        ui: 'dark',
        layout: {
            type: 'card',
        },
        items: [
            // {
            //     title: 'Home',
            //     iconCls: 'home',

            //     xtype: 'restubefeed',
            // },
            {  
                title: 'Search',
                iconCls: 'search',

                xtype: 'restubesearch',                
            }, {
                title: 'Questions',
                iconMask: true,
                iconCls: 'chat',

                xtype: 'restubequestionfeed'
            }, {
                title: 'Contacts',
                iconMask: true,
                iconCls: 'address_book',

                xtype: 'restubecontacts',
            }, {  
                title: 'Messages',
                iconMask: true,
                iconCls: 'mail',

                xtype: 'whiteboardlist',
            }, {  
                title: 'Feedback',
                iconMask: true,
                iconCls: 'quote1',

                xtype: 'restubefeedback',                                
            }
        ],
    },
});
