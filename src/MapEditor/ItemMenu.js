var ItemMenu = ccui.Layout.extend({

	scrollView: null,

	itemSelected: null,

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
				width: this.scrollView.width,
				height: this.scrollView.width,
				anchorX: 0,
				anchorY: 0,
				x: 0,
				y: i * this.scrollView.width + 20
			});
			this.scrollView.addChild(item);
		}

 
        this.scrollView.jumpToTop();

        // cc.log(this.scrollView);

	},

	onMouseDown: function (e) {
		// cc.log("mouse down");
		// cc.log(e.getLocation());
		// cc.log(this.convertToNodeSpace(e.getLocation()));

		for (var item of this.scrollView.getChildren()) {
			if (cc.rectContainsPoint(
					item.getBoundingBox(), 
					this.convertToNodeSpace(e.getLocation())
				)) {
				// cc.log(item.getName());

				if (this.itemSelected) {
					this.itemSelected.select(false);
				}

				item.onMouseDown();
				this.itemSelected = item;
				cc.log("selected item: " + this.itemSelected.getName());

				return;
			}
		}


	},

	onMouseUp: function (e) {
		// cc.log("mouse up");
	},

	onMouseMove: function (e) {
		// cc.log("mouse move");
	},

	onMouseScroll: function(e) {
		// cc.log("mouse scroll");
	},

	getSelectedItemInstance: function () {
		if (this.itemSelected == null) {
			return;
		}

		let itemConfig = this.itemSelected.item;
		// cc.log(itemConfig);

		switch (itemConfig.type) {
			case ITEM_TYPE.NONE:
				return null;
				break;

			case ITEM_TYPE.UNIT:
				return this.buildUnit(itemConfig);
				break;

			case ITEM_TYPE.MOVABLE_TILE:
				return this.buildMovableTile(itemConfig);
				break;

			case ITEM_TYPE.ITEM_SPRITE:
				return this.buildItemSprite(itemConfig);
				break;

			default:
				return null;
				break;
		}

	},

	buildUnit: function (itemConfig) {
		return new Unit(itemConfig);
	},

	buildMovableTile: function (itemConfig) {
		return new MovableItem(itemConfig);
	},

	buildItemSprite: function (itemConfig) {
		return new ItemSprite(itemConfig);
	},

	onExit: function () {
		this._super;

	}
});


var menuItem = cc.Layer.extend({

	item: null,
	bgSprite: null,
	iconSprite: null,

	isSelected: false,

    ctor:function (item) {
        this._super();

        this.item = item;
        this.setName(item.name);

        return true;
    },

    onEnter: function () {
    	this._super();

        let bgSprite = new cc.Scale9Sprite(res.menu_item_bg_normal);
        bgSprite.attr({
    		anchorX: 0.5,
    		anchorY: 0.5,
    		x: this.width / 2,
    		y: this.height / 2,
    		width: this.width - 20,
    		height: this.height - 20 	
        });
        this.bgSprite = bgSprite;
        this.addChild(bgSprite, 0);

    	let iconSprite = new cc.Scale9Sprite(res[this.item.res]);
    	iconSprite.attr({
    		anchorX: 0.5,
    		anchorY: 0.5,
    		x: this.width / 2,
    		y: this.height / 2,
    		width: 150,
    		height: 150
    	});
    	this.iconSprite = iconSprite;
    	this.addChild(iconSprite, 1);
    },

    onMouseDown: function (e) {
    	if (this.isSelected) {
    		this.select(false);
    	} else {
    		this.select(true);
    	}
    },

    select: function (b) {
    	this.removeChild(this.bgSprite);

		let bgSprite;
    	if (b) {
    		this.isSelected = true;
    		bgSprite = new cc.Scale9Sprite(res.menu_item_bg_selected);
    	} else {
    		this.isSelected = false;
    		bgSprite = new cc.Scale9Sprite(res.menu_item_bg_normal);
    	}

        bgSprite.attr({
    		anchorX: 0.5,
    		anchorY: 0.5,
    		x: this.width / 2,
    		y: this.height / 2,
    		width: this.width - 20,
    		height: this.height - 20 	
        });
        this.bgSprite = bgSprite;
        this.addChild(bgSprite, 0);
    },

    unselect: function () {

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