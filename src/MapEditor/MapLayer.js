var MapLayer = ccui.Layout.extend({

	mapContainer: null,
	itemMenu: null,

	mouseListener: null,


	unboundPortal: null,

	ctor: function () {
		this._super();

		this.setName("MapLayer");

		return true;
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

		// init item menu
		let itemMenu = new ItemMenu({
			anchorX: 0,
			anchorY: 0,
			x: 0,
			y: 0,
			width:200,
			height: this.height,
			backgroundRes: res.map_layer_item_menu_bg
		});
		itemMenu.loadItems(ITEM_CONFIG);
		this.itemMenu = itemMenu;
		this.addChild(itemMenu, 3);


	},

	onEnter: function() {
		this._super();

		// bind mouse
	    let mouseListener = cc.EventListener.create({
        	event   : cc.EventListener.MOUSE,
        	target  : this,
        	onMouseDown : this.onMouseDown,
        	onMouseUp : this.onMouseUp,
        	onMouseMove : this.onMouseMove,
        	onMouseScroll : this.onMouseScroll
    	});
    	this.mouseListener = mouseListener;
    	cc.eventManager.addListener(mouseListener, this);

    	// listening to portal placement
    	cc.eventManager.addCustomListener(MAP_EDITOR_SCENE_EVENT.PORTAL_PLACED, function (event) {
    		cc.log("portal placed");
    		const portalPlaced = event.getUserData().portal;

    		if (this.unboundPortal) {
    			this.unboundPortal.bindPortal(portalPlaced);
    			portalPlaced.bindPortal(this.unboundPortal);
    			this.unboundPortal = null;
    		} else {
    			this.unboundPortal = portalPlaced;
    		}

    	}.bind(this));

    	cc.eventManager.addCustomListener(MAP_EDITOR_SCENE_EVENT.PORTAL_REMOVED, function (event) {
    		cc.log("portal removed");
    		const portalRemoved = event.getUserData().portal;

    		if (portalRemoved.pairedPortal) {
    			const pairedPortal = portalRemoved.pairedPortal;
    			pairedPortal.unbindPortal();
    			pairedPortal.parent.deleteItem();
    		} else {
    			this.unboundPortal = null;
    		}

    	}.bind(this));


    	// in-game event
    	cc.eventManager.addCustomListener(MAP_EDITOR_SCENE_EVENT.UNIT_ARRIVING_POS, function (event) {
    		cc.log("unit arrival");
    		const unit = event.getUserData().unit;

    		const tile = this.mapContainer.getTileByXY(unit.mapX, unit.mapY);
    		if (tile.item && tile.item.onArrival) {
    			tile.item.onArrival(unit);
    		}

    	}.bind(this));
	},

	createEmptyMap: function (rowNum, colNum) {
		if (this.mapContainer) {
			this.removeChild(this.mapContainer);
			this.mapContainer = null;
		}

		let mapContainer = new MapContainer({
			rowNum: rowNum,
			colNum: colNum,
			anchorX: 0,
			anchorY: 0,
			x: 400,
			y: 200,
			width: 600,
			height: 600
		});
		this.mapContainer = mapContainer;
		this.addChild(mapContainer, 0);

	},

	runMap: function () {
		if (this.mapContainer) {
			this.mapContainer.run();
		}
	},

	resetMap: function () {
		if (this.mapContainer) {
			const rowNum = this.mapContainer.rowNum;
			const colNum = this.mapContainer.colNum;
			this.removeChild(this.mapContainer);
			this.createEmptyMap(rowNum, colNum);
		}
	},

	onMouseDown: function (e) {
		// cc.log("mouse down");
		let target = e.getCurrentTarget();
		if (!cc.rectContainsPoint(target.getBoundingBox(), e.getLocation())) {
			return;
		}

		if (cc.rectContainsPoint(target.itemMenu.getBoundingBox(), e.getLocation())) {
			// cc.log("menu");
			target.itemMenu.onMouseDown(e);
		} else if (cc.rectContainsPoint(target.mapContainer.getBoundingBox(), e.getLocation())) {
			// get mapX and mapY
			const clickPos = target.mapContainer.getMapPosByCoord(e.getLocation());


            // var button = event.getButton();
            // if(button == cc.EventMouse.BUTTON_LEFT){            //左键
            //     cc.log("左键按下", + pos.x + " " + pos.y);
            // }else if(button == cc.EventMouse.BUTTON_RIGHT){     //右键
            //     cc.log("右键按下", + pos.x + " " + pos.y);
            // }else if(button == cc.EventMouse.BUTTON_MIDDLE){    //滚轮
            //     cc.log("中间滚轮键按下");
            // }

            const button = e.getButton();

            if (button == cc.EventMouse.BUTTON_LEFT) {
            	//let mouse place
				if (target.itemMenu.itemSelected) {
					// cc.log(target.itemMenu.itemSelected.item.id);
					// let itemConfig = target.itemMenu.itemSelected.item;
					let item = target.itemMenu.getSelectedItemInstance();
					if (item) {
						if (item.itemConfig.type == ITEM_TYPE.UNIT) {
							target.mapContainer.placeUnit(clickPos.mapX, clickPos.mapY, item);
						} else if (item.itemConfig.type == ITEM_TYPE.MOVABLE_TILE) {
							target.mapContainer.placeItem(clickPos.mapX, clickPos.mapY, item);
						} else if (item.itemConfig.type == ITEM_TYPE.ITEM_SPRITE) {
							target.mapContainer.placeItemSprite(clickPos.mapX, clickPos.mapY, item);
						} else if (item.itemConfig.type == ITEM_TYPE.PORTAL_TILE) {
							target.mapContainer.placeItem(clickPos.mapX, clickPos.mapY, item);

							// // bind portal
							// if (target.unboundPortal) {
							// 	target.unboundPortal.bindPortal(item);
							// 	item.bindPortal(target.unboundPortal);
							// 	target.unboundPortal = null;
							// } else {
							// 	target.unboundPortal = item;
							// }
						}
					}
				}
			} else if (button == cc.EventMouse.BUTTON_RIGHT) {
				// right mouse remove
				target.mapContainer.removeOnMapPosXY(clickPos.mapX, clickPos.mapY);
			}

		} else {
			// cc.log("other");
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

	onExit: function () {
		this._super;
	
		cc.log("Leave UILayer");

	 	cc.eventManager.removeListener(this.mouseListener);
	 	cc.eventManager.removeCustomListners(MAP_EDITOR_SCENE_EVENT.PORTAL_PLACED);
	 	cc.eventManager.removeCustomListners(MAP_EDITOR_SCENE_EVENT.PORTAL_REMOVED);

		cc.eventManager.removeCustomListners(MAP_EDITOR_SCENE_EVENT.UNIT_ARRIVING_POS);

	}
});


// map container class
var MapContainer = cc.Layer.extend({

	rowNum: 0,
	colNum: 0,

	tileWidth: 0,
	tileHeight: 0,

	tiles: [],

	units: [],
	unitCount: 0,

	ctor: function (config) {
		this._super();

		this.setName("MapContainer");
		
		this.x = config.x || 0;
		this.y = config.y || 0;
		this.width = config.width || 0;
		this.height = config.height || 0;
		this.anchorX = config.anchorX || 0;
		this.anchorY = config.anchorY || 0;
		this.rowNum = config.rowNum || 0;
		this.colNum = config.colNum || 0;

		if (this.rowNum == 0 || this.colNum == 0) {
			return true;
		}

		this.tileWidth = this.width / this.colNum;
		this.tileHeight = this.height / this.rowNum;

		// init tiles
		for (let i = 0; i < this.rowNum; i++) {
			this.tiles[i] = [];
		}

		// create tiles
		for (let i = 0; i < this.rowNum; i++) {
			for (let j = 0; j < this.colNum; j++) {
				let tile = new MapTile(res.map_tile_empty , null);
				tile.attr({
					x: j * this.tileWidth,
					y: i * this.tileHeight,
					anchorX: 0,
					anchorY: 0,
					width: this.tileWidth,
					height: this.tileHeight 
				});
				tile.setMapPos(j, i);
				this.tiles[i].push(tile);
				this.addChild(tile, 0);
			}
		}

		return true;
	},


	onEnter: function() {
		this._super();

	},

	run: function () {
		for (const unit of this.units) {
			unit.compileCode();
			unit.run();
		}
	},

	getMapPosByCoord: function (pos) {
		// cc.log(pos);

		for (let row = 0; row < this.tiles.length; row++) {
			for (let col = 0; col < this.tiles[0].length; col++) {
				const tile = this.tiles[row][col];
				if (cc.rectContainsPoint(tile.getBoundingBox(), this.convertToNodeSpace(pos))) {
					return tile.getMapPos();
				}
			}
		}

		return null;
	},

	getTileByXY: function (mapX, mapY) {
		if (mapY >= this.rowNum || mapY < 0 || mapX >= this.colNum || mapX < 0) {
			return null;
		} else {
			return this.tiles[mapY][mapX];
		}
	},

	placeUnit: function (mapX, mapY, unit) {
		if (mapY >= this.rowNum || mapY < 0 || mapX >= this.colNum || mapX < 0 || this.getTileByXY(mapX, mapY).item == null) {
			return;
		} 

		this.units.push(unit);
		unit.setMapPos(mapX, mapY);
		const tempTile = this.tiles[mapY][mapX];
		unit.attr({
			anchorX: 0.5,
			anchorY: 0.5,
			x: tempTile.x + tempTile.width / 2,
			y: tempTile.y + tempTile.height / 2,
			width: tempTile.width * 0.8,
			height: tempTile.height * 0.8
		});
		unit.map = this;
		unit.unitId = this.unitCount++;
		this.addChild(unit, 1);

	},

	portUnitTo: function (portal, unit) {
		const portalX = portal.parent.mapX;
		const portalY = portal.parent.mapY;
		this.moveUnitToXY(unit, portalX, portalY);
		portal.onPortIn(unit);
	},

	moveUnit: function (unit) {
		const direction = unit.facing;
		let mapX = unit.getMapPos().mapX;
		let mapY = unit.getMapPos().mapY;

        switch (direction) {
            case DIRECTION.UP:
            case "up":
            	mapY++;
                break;

            case DIRECTION.DOWN:
            case "down":
            	mapY--;
                break;

            case DIRECTION.LEFT:
            case "left":
            	mapX--;
                break;

            case DIRECTION.RIGHT:
            case "right":
            	mapX++;
                break;    
          
            default:
                break;  
        } 

        if (mapX >= this.colNum 
        	|| mapX < 0 
        	|| mapY >= this.rowNum 
        	|| mapY < 0 
        	|| !this.tiles[mapY][mapX].canReach()) {
        	return false;
        }

        const targetTile = this.tiles[mapY][mapX];
        unit.isExecuting = true;
        unit.runAction(
			cc.sequence(
				cc.MoveTo.create(0.5, cc.p(targetTile.x + targetTile.width / 2, targetTile.y + targetTile.height / 2)),
				cc.callFunc(function () {
					this.isExecuting = false;
					this.setMapPos(mapX, mapY);
					this.onArrivingPos();
				}, unit)
           	)
       	);

        return true;
	},

	unitPush: function (unit) {
		const direction = unit.facing;
		let mapX = unit.getMapPos().mapX;
		let mapY = unit.getMapPos().mapY;
		let targetTile;
		let nextTile;

		// get target tile
        switch (direction) {
            case DIRECTION.UP:
            case "up":
            	targetTile = this.getTileByXY(mapX, mapY + 1);
            	nextTile = this.getTileByXY(mapX, mapY + 2);
                break;

            case DIRECTION.DOWN:
            case "down":
            	targetTile = this.getTileByXY(mapX, mapY - 1);
            	nextTile = this.getTileByXY(mapX, mapY - 2);
                break;

            case DIRECTION.LEFT:
            case "left":
            	targetTile = this.getTileByXY(mapX - 1, mapY);
            	nextTile = this.getTileByXY(mapX - 2, mapY);
                break;

            case DIRECTION.RIGHT:
            case "right":
            	targetTile = this.getTileByXY(mapX + 1, mapY);
            	nextTile = this.getTileByXY(mapX + 2, mapY);
                break;    
          
            default:
                break;  
        } 

    	if (
    		targetTile &&
    		targetTile.item &&
    		targetTile.item.itemSprite &&
    		nextTile &&
    		nextTile.item &&
    		nextTile.item.canPlaceOn()
    	) {
    		let itemPushing = targetTile.item.moveItemSpriteOut();
    		nextTile.placeItemSprite(itemPushing);
    		return true;
    	}

        return false;
	},

	moveUnitToXY: function (unit, mapX, mapY) {
		const tile = this.getTileByXY(mapX, mapY);
		unit.x = tile.x + tile.width / 2;
		unit.y = tile.y + tile.height / 2;
		unit.setMapPos(mapX, mapY);
	},

	placeItem: function (mapX, mapY, item) {
		const tile = this.getTileByXY(mapX, mapY);
		if (tile) {
			tile.placeItem(item);
			item.map = this;
		}
	},

	placeItemSprite: function (mapX, mapY, itemSprite) {
		const tile = this.getTileByXY(mapX, mapY);
		if (tile) {
			tile.placeItemSprite(itemSprite);
		}
	},

	removeOnMapPosXY: function (mapX, mapY) {
		// remove unit
		for (let i = 0; i < this.units.length; i++) {
			let unit = this.units[i];
			if (unit.mapX == mapX && unit.mapY == mapY) {
				this.units.splice(i, 1);
				unit.removeFromParent();
				return true;
			}
		}

		// remove item 
		let tile = this.getTileByXY(mapX, mapY);
		if (tile && tile.item) {
			tile.deleteItem();
		}

		return false;
	},

	onExit: function () {
		this._super;

	}
});

