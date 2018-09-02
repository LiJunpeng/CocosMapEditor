ITEM_TYPE = {
	NONE: -1,
	UNIT: 0,
	MOVABLE_TILE: 1,
	WAY_POINT_TILE: 2
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
	}

];