var EditorLayer = ccui.Layout.extend({

	editBox: null,
	menuItemRunCode: null,

	ctor: function () {
		this._super();

		this.setName("EditorLayer");
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


		// init editbox
		this.editBox = new cc.EditBox(cc.size(config.width - 20, config.height - 170))
        this.editBox.setName("EditBox");
        this.editBox.setPosition(10, 100);
        this.editBox.anchorX = 0;
        this.editBox.anchorY = 0;
        this.editBox.setDelegate(this);
        this.editBox.setMaxLength(1000);
        this.editBox.setFontSize(32);
        // this.editBox.setPlaceHolder("input code");
        this.editBox.setInputFlag(cc.EDITBOX_INPUT_FLAG_SENSITIVE);//修改为不使用密文
        this.editBox.setInputMode(cc.EDITBOX_INPUT_MODE_ANY);
        this.addChild(this.editBox,1);

        // init start button
        let menuItemRunCode = new cc.MenuItemImage(
        	res.run_code_normal,
        	res.run_code_pressed,
        	this.runMap,
        	this
        );
        menuItemRunCode.attr({
        	anchorX: 0,
        	anchorY: 0,
        	x: 150,
        	y: 0
        });
        this.menuItemRunCode = menuItemRunCode;

        let editorMenu = new cc.Menu(this.menuItemRunCode);
        editorMenu.attr({
        	anchorX: 0,
        	anchorY: 0,
        	x: 0,
        	y: 0
        });
        this.addChild(editorMenu, 2);


	},

	onEnter: function() {
		this._super();
		cc.log("Enter UILayer");
	},

	runMap: function () {
		const eventRunMap = new cc.EventCustom(MAP_EDITOR_SCENE_EVENT.RUN_MAP);
		cc.eventManager.dispatchEvent(eventRunMap);
	},

	runCode: function () {
		// cc.log(this.editBox.string);

		let originCode = this.editBox.string;

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
			var gen = f.apply({
				move: function () {
					console.log("wtf");
				}

			});

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


	},

	getCode: function () {
		return this.editBox.string;
	},

	onExit: function () {
		this._super;
		// cc.eventManager.removeListeners(cc.EventListener.KEYBOARD);
		cc.log("Leave UILayer");
	}
});