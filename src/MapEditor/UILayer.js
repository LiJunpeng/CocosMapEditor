var UILayer = ccui.Layout.extend({

	menu: null,

	ctor: function () {
		this._super();

		this.setName("UILayer");
		this.init();

		return true;
	},

	init: function () {

	},

	setup: function (config) {
		this.x = config.x;
		this.y = config.y;
		this.anchorX = config.anchorX;
		this.anchorY = config.anchorY;
		this.width = config.width;
		this.height = config.height;

		this.setBackGroundImage(config.backgroundRes);
		this.setBackGroundImageScale9Enabled(true);



        // // init start button
        let menuItemRunCode = new cc.MenuItemImage(
        	res.run_code_normal,
        	res.run_code_pressed,
        	this.runMap,
        	this
        );
        menuItemRunCode.attr({
        	anchorX: 0,
        	anchorY: 0,
        	x: 1920 - 200,
        	y: 0
        });
        this.menuItemRunCode = menuItemRunCode;

        // init reset button
        let menuItemResetMap = new cc.MenuItemImage(
        	res.reset_map_normal,
        	res.reset_map_pressed,
        	this.resetMap,
        	this
        );
        menuItemResetMap.attr({
        	anchorX: 0,
        	anchorY: 0,
        	x: 1920 - 400,
        	y: 0
        });
        this.menuItemResetMap = menuItemResetMap;

        let menu = new cc.Menu(
        	this.menuItemRunCode, 
        	this.menuItemResetMap
        );
        menu.attr({
        	anchorX: 0,
        	anchorY: 0,
        	x: 0,
        	y: 0,
        	width: 1920,
        	height: 100
        });
        this.addChild(menu, 2);
        this.menu = menu;

	},

	onEnter: function() {
		this._super();
		cc.log("Enter UILayer");
	},

	runMap: function () {
		const eventRunMap = new cc.EventCustom(MAP_EDITOR_SCENE_EVENT.RUN_MAP);
		cc.eventManager.dispatchEvent(eventRunMap);
	},

	resetMap: function () {
		const eventResetMap = new cc.EventCustom(MAP_EDITOR_SCENE_EVENT.RESET_MAP);
		cc.eventManager.dispatchEvent(eventResetMap);
	},


	onExit: function () {
		this._super;
		// cc.eventManager.removeListeners(cc.EventListener.KEYBOARD);
		cc.log("Leave UILayer");
	}
});