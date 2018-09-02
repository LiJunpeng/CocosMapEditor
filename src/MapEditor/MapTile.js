var MapTile = cc.Scale9Sprite.extend({
    mapX: -1,
    mapY: -1,
    item: null,

    ctor: function (res, item) {
        this._super(res);

        // init with item
        if (item) {
            this.item = item;
        }
    },

    onEnter:function () {
        this._super();


    },

    setMapPos: function (mapX, mapY) {
        this.mapX = mapX;
        this.mapY = mapY;
    },

    placeItem: function (item) {
        if (this.item) {
            this.deleteItem();
        }
        item.attr({
            anchorX: 0,
            anchorY: 0,
            x: 0,
            y: 0,
            width: this.width,
            height: this.height
        });
        this.item = item;
        this.addChild(this.item, 1);
    },

    deleteItem: function () {
        if (this.item) {
            this.removeChild(this.item);
            this.item = null;
        }
    },

    canReach: function () {
        if (this.item && this.item.canReach && this.item.canReach()) {
            return true;
        }
        return false;
    },


    onExit:function () {
        this._super();

        cc.log("onExit");
    }

});