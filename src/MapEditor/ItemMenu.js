var ItemMenu = ccui.Layout.extend({

	scrollView: null,

	ctor: function (config) {
		this._super();

		this.setName("MapContainer");
		
		this.x = config.x;
		this.y = config.y;
		this.anchorX = config.anchorX;
		this.anchorY = config.anchorY;
		this.width = config.width;
		this.height = config.height;

		this.setBackGroundImage(config.backgroundRes);
		this.setBackGroundImageScale9Enabled(true);





        let listView = ccui.ScrollView.create();
        listView.setDirection(ccui.ScrollView.DIR_VERTICAL);
        listView.setTouchEnabled(true);
        listView.setBounceEnabled(true);
        listView.setSize(cc.size(this.width, this.height));
        listView.x = this.width/2;
        listView.y = this.height/2;
        listView.setAnchorPoint(cc.p(0.5,0.5));
       	listView.setInnerContainerSize(cc.size(this.width, this.height));
		this.addChild(listView);
		this.scrollView = listView;



		return true;
	},


	onEnter: function() {
		this._super();

	},

	loadItems: function (items) {

		this.scrollView.setInnerContainerSize(this.width, items.length * (this.width + 20));
		for (let i = 0; i < items.length; i++) {
			let item = new menuItem(items[i]);
			item.attr({
				width: this.width - 20,
				height: this.width - 20,
				anchorX: 0.5,
				anchorY: 0.5,
				x: this.width / 2,
				y: i * this.width + 20
			});
			this.scrollView.addChild(item);
		}

 
        this.scrollView.jumpToTop();



	},


	onExit: function () {
		this._super;

	}
});


var menuItem = cc.Layer.extend({

	item: null,
	bgSprite: null,
	iconSprite: null,

    ctor:function (item) {
        this._super();

        this.item = item;
        let bgSprite = new cc.Scale9Sprite(res.menu_item_normal_bg);
        this.bgSprite = bgSprite;
        this.addChild(bgSprite, 0);

        return true;
    },

    onEnter: function () {
    	this._super();

    	let iconSprite = new cc.Scale9Sprite(res[this.item.res]);
    	iconSprite.attr({
    		anchorX: 0.5,
    		anchorY: 0.5,
    		x: this.width / 2,
    		y: this.height / 2,
    		width: this.width - 20,
    		height: this.height - 20
    	});
    	this.iconSprite = iconSprite;
    	this.addChild(iconSprite, 1);
    },

    onExit: function() {
    	this._super();
    }
});

// var menuItem = cc.Scale9Sprite.extend({

//     ctor: function (res, item) {
//         this._super(res);

//         // init with item
//         if (item) {
//             this.item = item;
//         }
//     },

//     onEnter:function () {
//         this._super();


//     },



//     onExit:function () {
//         this._super();

//         cc.log("onExit");
//     }

// });