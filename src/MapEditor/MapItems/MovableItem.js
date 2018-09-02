var MovableItem = cc.Scale9Sprite.extend({

    ctor: function () {
        this._super(res.movable_item);

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