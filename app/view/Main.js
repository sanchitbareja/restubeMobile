Ext.define('ResTube.view.Main', {
    extend: 'Ext.tab.Panel',
    alias: "widget.maincontainer",
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
                iconCls: 'bookmarks',

                xtype: 'restubequestionfeed'
            }, {
                title: 'Contacts',
                iconCls: 'team',

                xtype: 'restubecontacts',
            }, {  
                title: 'Feedback',
                iconCls: 'action',

                xtype: 'restubefeedback',                
            }
        ],
    },
});
