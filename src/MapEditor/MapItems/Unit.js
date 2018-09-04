var Unit = cc.Scale9Sprite.extend({

    itemConfig: null,

    unitId: -1,
    map: null,
    mapX: 0,
    mapY: 0,
    status: null,
    facing: DIRECTION.UP,
    code: "",
    commandSequence: [],

    isRunning: false,
    isExecuting: false,

    ctor: function (itemConfig) {
        this._super(res.unit);

        this.setName("Unit");
        this.itemConfig = itemConfig;

        this.scheduleUpdate();
    },

    update: function () {
        if (!this.isRunning || this.isExecuting) {
            return;
        }

        // consume command
        if (this.commandSequence && this.commandSequence.length > 0) {
            const command = this.commandSequence.shift();
            this[command.func].apply(this, command.arguments);
        }

    },

    onEnter:function () {
        this._super();


    },

    getMapPos: function () {
        return {
            mapX: this.mapX,
            mapY: this.mapY
        };
    },

    getStatus: function () {
        return this.status;
    },

    getFacing: function () {
        return this.facing;
    },  

    getCode: function () {
        return this.code;
    },

    setCode: function (code) {
        this.code = code;
        cc.log(this.code);
    },

    setMapPos: function (mapX, mapY) {
        this.mapX = mapX;
        this.mapY = mapY;
    },

    turn: function (direction) {
        let nextDir;
        switch (direction) {
            case DIRECTION.back:
            case "back":
                nextDir = (this.facing + 2) % 4;
                break;

            case DIRECTION.LEFT:
            case "left":
                nextDir = (this.facing + 3) % 4;
                break;

            case DIRECTION.RIGHT:
            case "right":
                nextDir = (this.facing + 1) % 4;
                break;    
                
            default:
                return;
                break;  
        }

        this.turnToDirection(nextDir);
    },

    turnToDirection: function (direction) {
        switch (direction) {
            case DIRECTION.UP:
            case "up":
                this.runAction(cc.rotateTo(0, 0));
                this.facing = DIRECTION.UP;

                break;

            case DIRECTION.DOWN:
            case "down":
                this.runAction(cc.rotateTo(0, 180));
                this.facing = DIRECTION.DOWN;

                break;

            case DIRECTION.LEFT:
            case "left":
                this.runAction(cc.rotateTo(0, -90));
                this.facing = DIRECTION.LEFT;

                break;

            case DIRECTION.RIGHT:
            case "right":
                this.runAction(cc.rotateTo(0, 90));
                this.facing = DIRECTION.RIGHT;

                break;    
                
            default:
                break;            
        }
    },

    compileCode: function () {
        this.commandSequence = [];


// compile =============

        let originCode = this.code;

        var aetherOptions = {
            language: 'python',
            executionLimit: 10000
        };

        var aether = new Aether(aetherOptions);

        var regexcode = /self\.\s*(move|turn|get|say|toggle|build|show|attack|GetPlayerObject)\s*\(/g;
        var originCode2 = originCode.replace(regexcode, '$1(');
        var regexcode2 = /(move|turn|get|say|toggle|build|show|attack|GetPlayerObject)\s*\(/g;
        originCode = originCode2.replace(regexcode2, 'self.$1(');

// deal with loop =========================
        if (originCode.indexOf('range(') >= 0) {
            var origin_code_arrs = originCode.split("range(");
            var origin_code_flag = true;
            for (var n = 1; n < origin_code_arrs.length; n++) {
                var start_range_index = 0;
                var range_data = origin_code_arrs[n].substring(start_range_index).trim();
                var end_range_index = range_data.indexOf(")");
                var range_num = range_data.substring(0, end_range_index);
                if (!range_num || range_num == "" || range_num == " ") {
                    origin_code_flag = false;
                    break;
                }
            }
            if (!origin_code_flag) {
                alert('请输入循环次数');

                return;
            }
        }

        aether.transpile(originCode);
        var f = aether.createFunction();

        try {
            // var gen = f.apply(this);
            this.functionList.commandSequence.length = 0;
            var gen = f.apply(this.functionList);

        } catch (err) {
            var error = err.toString();
            if (error.indexOf("is not defined") >= 0) {
                cc.log(">>> " + error.substring(error.indexOf(":") + 1, error.indexOf("is not defined")) + "变量未定义！");
            } else if (err.message == "Statement execution limit reached") {
                cc.log(">>> " + "执行次数超出限制！请优化你的代码");
            } else {
                cc.log(">>> " + "请检测代码错误！");
            }

            return;
        }

        this.commandSequence = this.functionList.commandSequence;

// =====================

    },

    run: function () {
        this.isRunning = true;
    },

    onExit:function () {
        this._super();

        cc.log("onExit");
        this.unscheduleUpdate();
    },

    // function list
    functionList: {
        commandSequence: [],

        move: function (distance) {
            // cc.log("i'm moving!" + distance);
            this.commandSequence.push({
                func: "do_move",
                arguments: [distance]
            });
        },

        turn: function (direction) {
            this.commandSequence.push({
                func: "do_turn",
                arguments: [direction]
            });
        },
    },

    // function implementation
    do_move: function (distance) {
        cc.log("action: move " + distance);
        this.map.moveUnit(this);
    },

    do_turn: function (direction) {
        cc.log("action: turn " + direction);
        // this.turnToDirection(direction);
        this.turn(direction);
    }

});