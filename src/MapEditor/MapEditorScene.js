DIRECTION = {
	UP: 0,
	RIGHT: 1,
	DOWN: 2,
	LEFT: 3
};


var MAP_EDITOR_SCENE_EVENT = {
    RUN_MAP: "MAP_EDITOR_SCENE_EVENT_RUN_MAP",
    RESET_MAP: "MAP_EDITOR_SCENE_EVENT_RESET_MAP",
    PORTAL_PLACED: "MAP_EDITOR_SCENE_EVENT_PORTAL_PLACED",
    PORTAL_REMOVED: "MAP_EDITOR_SCENE_EVENT_PORTAL_REMOVED",

    UNIT_ARRIVING_POS: "MAP_EDITOR_SCENE_EVENT_UNIT_ARRIVING_POS"
};

var MapEditorScene = cc.Scene.extend({

	mapLayer: null,
	editorLayer: null,
	uiLayer: null,

	ctor: function () {
		this._super();

		this.setName("MapEditorScene");
		this.init();

		cc.log("ctor MapEditorScene");
	},

	init: function () {
		const winWidth = cc.winSize.width;
		const winHeight = cc.winSize.height;

		// init UILayer
		let uiLayer = new UILayer();
		uiLayer.setup({
			anchorX: 0,
			anchorY: 1,
			x: 0,
			y: 1080,
			width: 1920,
			height: 100,
			backgroundRes: res.editor_layer_bg
		});
		this.addChild(uiLayer, 2, 2);
		this.uiLayer = uiLayer;

		// init MapLayer
		let mapLayer = new MapLayer();
		mapLayer.setup({
			anchorX: 0,
			anchorY: 0,
			x: 10,
			y: 10,
			width: 1920 - 400 - 10 * 2,
			height: 1080 - 10 * 2 - 100,
			backgroundRes: res.map_layer_bg
		});
		this.addChild(mapLayer, 1, 0);
		this.mapLayer = mapLayer;

		// init EditorLayer
		let editorLayer = new EditorLayer();
		editorLayer.setup({
			anchorX: 1,
			anchorY: 0,
			x: winWidth,
			y: 0,
			width: 400,
			height: winHeight - 100,
			backgroundRes: res.editor_layer_bg
		});
		this.addChild(editorLayer, 1, 1);
		this.editorLayer = editorLayer;

	},

	onEnter: function () {
		this._super();

		cc.log("enter MapEditorScene");

		// bind event listener
        cc.eventManager.addCustomListener(MAP_EDITOR_SCENE_EVENT.RUN_MAP, function (event) {
            cc.log("Event: run map");

			// inject code to unit, test only
			for (let unit of this.mapLayer.mapContainer.units) {
				unit.setCode(this.editorLayer.getCode());
				cc.log(unit.getCode());
			}

            this.mapLayer.runMap();
        }.bind(this));

		// bind event listener
        cc.eventManager.addCustomListener(MAP_EDITOR_SCENE_EVENT.RESET_MAP, function (event) {
            cc.log("Event: reset map");

            this.mapLayer.resetMap();

        }.bind(this));

// cc.log("tset");

		this.mapLayer.createEmptyMap(14, 14);
		// this.mapLayer.mapContainer.placeItem(3, 3, new MovableItem());
		// for (let i = 2; i < 8; i++) {
		// 	for (let j = 2; j < 8; j++) {
		// 		this.mapLayer.mapContainer.placeItem(j, i, new MovableItem());
		// 	}
		// }

		// let unit = new Unit();
		// this.mapLayer.mapContainer.placeUnit(3, 5, unit);
		// unit.setCode("move(1)\nturn('left')\nmove(1)");
		// unit.turnToDirection(DIRECTION.UP);

	},



	onExit: function () {
		this._super();

		cc.log("leave MapEditorScene");

		// unbind event
		cc.eventManager.removeCustomListeners(MAP_EDITOR_SCENE_EVENT.RUN_MAP);
		cc.eventManager.removeCustomListeners(MAP_EDITOR_SCENE_EVENT.RESET_MAP);
	}
});


