var PortalItem = cc.Scale9Sprite.extend({

    itemConfig: null,
    itemSprite: null,
    pairedPortal: null,
    map: null,

    ctor: function (itemConfig) {
        this._super(res.portal_item);

        this.setName("PortalItem");
        this.itemConfig = itemConfig;

    },

    onEnter:function () {
        this._super();

        const eventPortalPlaced = new cc.EventCustom(MAP_EDITOR_SCENE_EVENT.PORTAL_PLACED);
        eventPortalPlaced.setUserData({
            portal: this
        });
        cc.eventManager.dispatchEvent(eventPortalPlaced);

    },

    canReach: function () {
        return true;
    },

    canPlaceOn: function () {
        return false;
    },

    bindPortal: function (target) {
        this.pairedPortal = target;
    },

    unbindPortal: function () {
        this.pairedPortal = null;
    },

    onMoveIn: function (unit) {

    },

    onMoveOut: function (unit) {

    },

    onArrival: function (unit) {
        if (this.pairedPortal) {
            this.map.portUnitTo(this.pairedPortal, unit);
        }
    },

    onLeaving: function (unit) {

    },

    onPortIn: function (unit) {
        cc.log("unit porting in");
    },  

    onPortOut: function (unit) {

    },

    onExit:function () {
        this._super();

        const eventPortalRemoved = new cc.EventCustom(MAP_EDITOR_SCENE_EVENT.PORTAL_REMOVED);
        eventPortalRemoved.setUserData({
            portal: this
        });
        cc.eventManager.dispatchEvent(eventPortalRemoved);


    }

});