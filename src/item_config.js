ITEM_TYPE = {
	NONE: -1,
	UNIT: 0,
	MOVABLE_TILE: 1,
	ITEM_SPRITE: 2,
	PORTAL_TILE: 3,
	WAY_POINT_TILE: 4
};

ITEM_CONFIG = [

	{
		id: 0,
		name: "mouse",
		type: ITEM_TYPE.NONE,
		res: "menu_item_mouse"
	},

	{
		id: 1,
		name: "unit",
		type: ITEM_TYPE.UNIT,
		res: "menu_item_unit_1"
	},

	{
		id: 2,
		name: "floor",
		type: ITEM_TYPE.MOVABLE_TILE,
		res: "menu_item_floor_1"
	},

	{
		id: 3,
		name: "box",
		type: ITEM_TYPE.ITEM_SPRITE,
		res: "menu_item_box_1"
	},

	{
		id: 4,
		name: "portal",
		type: ITEM_TYPE.PORTAL_TILE,
		res: "menu_item_portal"
	}

];




