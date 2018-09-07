var PortalItem = cc.Scale9Sprite.extend({

    itemConfig: null,
    itemSprite: null,
    itemLabel: null,

    portalId: null,
    pairedPortal: null,
    map: null,

    ctor: function (itemConfig) {
        this._super(res.portal_item);

        this.setName("PortalItem");
        this.itemConfig = itemConfig;

    },

    onEnter:function () {
        this._super();


        var itemLabel = new cc.LabelTTF("", "Arial", 24);
        itemLabel.setColor(cc.color(120, 120, 200, 255))
        itemLabel.attr({
            anchorX: 0.5,
            anchorY: 0.5,
            x: this.width / 2,
            y: this.height / 2
        });
        this.itemLabel = itemLabel;
        this.addChild(itemLabel, 1);



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

    setPortalId: function (id) {
        this.portalId = id;
        this.itemLabel.setString(this.portalId);
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