var MovableItem = cc.Scale9Sprite.extend({

    itemConfig: null,

    ctor: function (itemConfig) {
        this._super(res.movable_item);

        this.setName("MovableItem");
        this.itemConfig = itemConfig;

    },

    onEnter:function () {
        this._super();

    },

    canReach: function () {
        return true;
    },

    onExit:function () {
        this._super();

        cc.log("onExit");
    }

});