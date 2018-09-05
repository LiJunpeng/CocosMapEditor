var MovableItem = cc.Scale9Sprite.extend({

    itemConfig: null,

    itemSprite: null,

    ctor: function (itemConfig) {
        this._super(res.movable_item);

        this.setName("MovableItem");
        this.itemConfig = itemConfig;

    },

    onEnter:function () {
        this._super();

    },

    canReach: function () {
        if (this.itemSprite && this.itemSprite.canBlock()) {
            return false;
        }

        return true;
    },

    canPlaceOn: function () {
        if (this.itemSprite) {
            return false;
        }

        return true; // test only
    },

    placeItemSprite: function (itemSprite) {
        if (this.itemSprite) {
            this.removeChild(this.itemSprite);
        }

        this.itemSprite = itemSprite;
        this.itemSprite.attr({
            width: this.width * 0.9,
            height: this.height * 0.9,
            x: this.width / 2,
            y: this.height / 2,
            anchorX: 0.5,
            anchorY: 0.5
        });
        this.addChild(itemSprite, 1);
    },

    moveItemSpriteOut: function () {
        if (this.itemSprite == null) {
            return null;
        }

        const itemMovingOut = this.itemSprite;
        this.removeChild(this.itemSprite);
        this.itemSprite = null;

        return itemMovingOut;
    },

    onExit:function () {
        this._super();

        cc.log("onExit");
    }

});