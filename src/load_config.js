var res = {
    HelloWorld_png : "res/HelloWorld.png",

    editor_layer_bg : "res/Background/editor_layer_bg.png",
    map_layer_bg : "res/Background/map_layer_bg.png",

    run_code_normal : "res/UI/run_code_normal.png",
    run_code_pressed : "res/UI/run_code_pressed.png",

    map_tile_empty : "res/MapTiles/map_tile_empty.png",
    movable_item : "res/MapTiles/movable_item.png",
    unit : "res/MapTiles/unit.png"

};


var g_resources = [];
for (var i in res) {
    g_resources.push(res[i]);
}


