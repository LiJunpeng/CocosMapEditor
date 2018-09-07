var res = {
    HelloWorld_png : "res/HelloWorld.png",

    editor_layer_bg : "res/Background/editor_layer_bg.png",
    map_layer_bg : "res/Background/map_layer_bg.png",
    map_layer_item_menu_bg : "res/Background/map_layer_item_menu_bg.png", 

    run_code_normal : "res/UI/run_code_normal.png",
    run_code_pressed : "res/UI/run_code_pressed.png",
    reset_map_normal : "res/UI/reset_map_normal.png",
    reset_map_pressed : "res/UI/reset_map_pressed.png",

    menu_item_bg_selected :"res/UI/menu_item_selected_bg.png",
    menu_item_bg_normal : "res/UI/menu_item_normal_bg.png",
    menu_item_floor_1 : "res/MenuItems/floor_1.png",
    menu_item_unit_1 : "res/MenuItems/unit_1.png",
    menu_item_mouse : "res/MenuItems/mouse.png",
    menu_item_box_1 : "res/MenuItems/box_1.png",
    menu_item_portal : "res/MenuItems/portal.png",

    map_tile_empty : "res/MapTiles/map_tile_empty.png",
    movable_item : "res/MapTiles/movable_item.png",
    portal_item : "res/MapTiles/portal_item.png",
    unit : "res/MapTiles/unit.png",
    box_1 : "res/MapTiles/item_sprite_box.png"

};


var g_resources = [];
for (var i in res) {
    g_resources.push(res[i]);
}


