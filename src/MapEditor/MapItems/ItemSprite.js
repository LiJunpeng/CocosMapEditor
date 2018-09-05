var ItemSprite = cc.Scale9Sprite.extend({

    mapX: 0,
    mapY: 0,
    itemConfig: null,

    ctor: function (itemConfig) {
        this._super(res.box_1);

        this.setName("ItemSprite");
        this.itemConfig = itemConfig;

    },


    onEnter:function () {
        this._super();


    },

    getMapPos: function () {
        return {
            mapX: this.mapX,
            mapY: this.mapY
        };
    },


    setMapPos: function (mapX, mapY) {
        this.mapX = mapX;
        this.mapY = mapY;
    },

    canBlock: function () {
        return true;
    },

    onExit:function () {
        this._super();

        cc.log("onExit");
        this.unscheduleUpdate();
    }


});