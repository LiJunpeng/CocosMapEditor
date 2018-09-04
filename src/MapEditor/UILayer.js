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
        // let menuItemRunCode = new cc.MenuItemImage(
        // 	res.run_code_normal,
        // 	res.run_code_pressed,
        // 	this.runMap,
        // 	this
        // );
        // menuItemRunCode.attr({
        // 	anchorX: 0,
        // 	anchorY: 0,
        // 	x: 150,
        // 	y: 0
        // });
        // this.menuItemRunCode = menuItemRunCode;

        // let editorMenu = new cc.Menu(this.menuItemRunCode);
        // editorMenu.attr({
        // 	anchorX: 0,
        // 	anchorY: 0,
        // 	x: 0,
        // 	y: 0
        // });
        // this.addChild(editorMenu, 2);


	},

	onEnter: function() {
		this._super();
		cc.log("Enter UILayer");
	},



	onExit: function () {
		this._super;
		// cc.eventManager.removeListeners(cc.EventListener.KEYBOARD);
		cc.log("Leave UILayer");
	}
});