var JSX = {};
(function () {

/**
 * copies the implementations from source interface to target
 */
function $__jsx_merge_interface(target, source) {
	for (var k in source.prototype)
		if (source.prototype.hasOwnProperty(k))
			target.prototype[k] = source.prototype[k];
}

/**
 * defers the initialization of the property
 */
function $__jsx_lazy_init(obj, prop, func) {
	function reset(obj, prop, value) {
		delete obj[prop];
		obj[prop] = value;
		return value;
	}

	Object.defineProperty(obj, prop, {
		get: function () {
			return reset(obj, prop, func());
		},
		set: function (v) {
			reset(obj, prop, v);
		},
		enumerable: true,
		configurable: true
	});
}

/**
 * sideeffect().a /= b
 */
function $__jsx_div_assign(obj, prop, divisor) {
	return obj[prop] = (obj[prop] / divisor) | 0;
}

/*
 * global functions called by JSX
 * (enamed so that they do not conflict with local variable names)
 */
var $__jsx_parseInt = parseInt;
var $__jsx_parseFloat = parseFloat;
var $__jsx_isNaN = isNaN;
var $__jsx_isFinite = isFinite;

var $__jsx_encodeURIComponent = encodeURIComponent;
var $__jsx_decodeURIComponent = decodeURIComponent;
var $__jsx_encodeURI = encodeURI;
var $__jsx_decodeURI = decodeURI;

var $__jsx_ObjectToString = Object.prototype.toString;
var $__jsx_ObjectHasOwnProperty = Object.prototype.hasOwnProperty;

/*
 * profiler object, initialized afterwards
 */
function $__jsx_profiler() {
}

/*
 * public interface to JSX code
 */
JSX.require = function (path) {
	var m = $__jsx_classMap[path];
	return m !== undefined ? m : null;
};

JSX.profilerIsRunning = function () {
	return $__jsx_profiler.getResults != null;
};

JSX.getProfileResults = function () {
	return ($__jsx_profiler.getResults || function () { return {}; })();
};

JSX.postProfileResults = function (url) {
	if ($__jsx_profiler.postResults == null)
		throw new Error("profiler has not been turned on");
	return $__jsx_profiler.postResults(url);
};
/**
 * class Config extends Object
 * @constructor
 */
function Config() {
}

Config.prototype = new Object;
/**
 * @constructor
 */
function Config$() {
};

Config$.prototype = new Config;

/**
 * class Sprite
 * @constructor
 */
function Sprite() {
}

Sprite.prototype.$__jsx_implements_Sprite = true;

/**
 * @constructor
 */
function Sprite$() {
};

Sprite$.prototype = new Sprite;

/**
 * @param {Sprite} other
 * @return {!boolean}
 */
Sprite.prototype.detectCollision$LSprite$ = function (other) {
	var $math_abs_t;
	return (($math_abs_t = this.x - other.x) >= 0 ? $math_abs_t : -$math_abs_t) < 16 && (($math_abs_t = this.y - other.y) >= 0 ? $math_abs_t : -$math_abs_t) < 16;
};

/**
 * @param {CanvasRenderingContext2D} context
 */
Sprite.prototype.draw$LCanvasRenderingContext2D$ = function (context) {
	context.drawImage(this.image, this.x - (this.width >> 1), this.y - (this.height >> 1));
};

/**
 * class MovingObject extends Object
 * @constructor
 */
function MovingObject() {
}

MovingObject.prototype = new Object;
$__jsx_merge_interface(MovingObject, Sprite);

/**
 * @constructor
 * @param {!number} x
 * @param {!number} y
 * @param {!number} dx
 * @param {!number} dy
 * @param {HTMLCanvasElement} image
 */
function MovingObject$NNNNLHTMLCanvasElement$(x, y, dx, dy, image) {
	this.x = x;
	this.y = y;
	this.dx = dx;
	this.dy = dy;
	this.image = image;
};

MovingObject$NNNNLHTMLCanvasElement$.prototype = new MovingObject;

/**
 * @return {!boolean}
 */
MovingObject.prototype.update$ = function () {
	this.x += this.dx;
	this.y += this.dy;
	return ! (this.x <= 0 || this.x >= 320 || this.y <= 0 || this.y >= 480);
};

/**
 * @return {!boolean}
 */
MovingObject.prototype._inDisplay$ = function () {
	return ! (this.x <= 0 || this.x >= 320 || this.y <= 0 || this.y >= 480);
};

/**
 * class Bullet extends MovingObject
 * @constructor
 */
function Bullet() {
}

Bullet.prototype = new MovingObject;
/**
 * @constructor
 * @param {!number} x
 * @param {!number} y
 * @param {!number} dx
 * @param {!number} dy
 * @param {HTMLCanvasElement} image
 */
function Bullet$NNNNLHTMLCanvasElement$(x, y, dx, dy, image) {
	this.x = x;
	this.y = y;
	this.dx = dx;
	this.dy = dy;
	this.image = image;
	this.width = 4;
	this.height = 4;
};

Bullet$NNNNLHTMLCanvasElement$.prototype = new Bullet;

/**
 * @param {Stage} st
 * @return {!boolean}
 */
Bullet.prototype.update$LStage$ = function (st) {
	var $math_abs_t;
	/** @type {!boolean} */
	var inDisplay;
	/** @type {!string} */
	var rockKey;
	/** @type {Rock} */
	var rock;
	/** @type {!string} */
	var newState;
	/** @type {CanvasRenderingContext2D} */
	var context$0;
	/** @type {!number} */
	var value1$0;
	/** @type {!string} */
	var scoreStr$0;
	/** @type {!string} */
	var fillz$0;
	inDisplay = MovingObject.prototype.update$.call(this);
	context$0 = st.ctx;
	context$0.drawImage(this.image, this.x - (this.width >> 1), this.y - (this.height >> 1));
	for (rockKey in st.rocks) {
		rock = st.rocks[rockKey];
		if ((($math_abs_t = this.x - rock.x) >= 0 ? $math_abs_t : -$math_abs_t) < 16 && (($math_abs_t = this.y - rock.y) >= 0 ? $math_abs_t : -$math_abs_t) < 16) {
			if (rock.hp === 0) {
				return false;
			}
			inDisplay = false;
			if (-- rock.hp === 0) {
				value1$0 = st.score + rock.score;
				st.score = (value1$0 <= 999999999 ? value1$0 : 999999999);
				scoreStr$0 = st.score + "";
				fillz$0 = "000000000".substring(0, 9 - scoreStr$0.length);
				st.scoreElement.innerHTML = fillz$0 + scoreStr$0 + "<br/>\n" + (st.fps + "") + " FPS";
				rock.dx = rock.dy = 0;
				rock.state = "bomb1";
				rock.image = st.images.bomb1;
			} else {
				newState = (rock.state + "w").substring(0, 6);
				rock.state = newState;
				rock.image = st.images[newState];
			}
		}
	}
	return inDisplay;
};

/**
 * class Rock extends MovingObject
 * @constructor
 */
function Rock() {
}

Rock.prototype = new MovingObject;
/**
 * @constructor
 * @param {!number} x
 * @param {!number} y
 * @param {!number} dx
 * @param {!number} dy
 * @param {!number} hp
 * @param {!number} score
 * @param {!string} state
 * @param {HTMLCanvasElement} image
 */
function Rock$NNNNNNSLHTMLCanvasElement$(x, y, dx, dy, hp, score, state, image) {
	this.x = x;
	this.y = y;
	this.dx = dx;
	this.dy = dy;
	this.image = image;
	this.width = 32;
	this.height = 32;
	this.hp = hp;
	this.score = score;
	this.state = state;
};

Rock$NNNNNNSLHTMLCanvasElement$.prototype = new Rock;

/**
 * @param {Stage} st
 * @return {!boolean}
 */
Rock.prototype.update$LStage$ = function (st) {
	/** @type {!boolean} */
	var inDisplay;
	/** @type {!number} */
	var next;
	/** @type {CanvasRenderingContext2D} */
	var context$0;
	/** @type {!string} */
	var state$0;
	/** @type {!string} */
	var state$1;
	inDisplay = MovingObject.prototype.update$.call(this);
	context$0 = st.ctx;
	context$0.drawImage(this.image, this.x - (this.width >> 1), this.y - (this.height >> 1));
	if (this.hp === 0) {
		next = (this.state.substring(4) | 0) + 1;
		if (next > 10) {
			return false;
		} else {
			state$0 = "bomb" + (next + "");
			this.state = state$0;
			this.image = st.images[state$0];
		}
	} else {
		state$1 = this.state.substring(0, 5);
		this.state = state$1;
		this.image = st.images[state$1];
		if (st.state === "gaming" && this.detectCollision$LSprite$(st.ship)) {
			st.state = "dying";
			st.dying = 1;
		}
	}
	return inDisplay;
};

/**
 * @param {Stage} stage
 * @param {!string} state
 */
Rock.prototype.setState$LStage$S = function (stage, state) {
	this.state = state;
	this.image = stage.images[state];
};

/**
 * class SpaceShip extends Object
 * @constructor
 */
function SpaceShip() {
}

SpaceShip.prototype = new Object;
$__jsx_merge_interface(SpaceShip, Sprite);

/**
 * @constructor
 * @param {!number} x
 * @param {!number} y
 * @param {HTMLCanvasElement} image
 */
function SpaceShip$NNLHTMLCanvasElement$(x, y, image) {
	this.width = 32;
	this.height = 32;
	this.x = x;
	this.y = y;
	this.image = image;
};

SpaceShip$NNLHTMLCanvasElement$.prototype = new SpaceShip;

/**
 * class Stage extends Object
 * @constructor
 */
function Stage() {
}

Stage.prototype = new Object;
/**
 * @constructor
 * @param {HTMLCanvasElement} stageCanvas
 * @param {HTMLElement} scoreboard
 */
function Stage$LHTMLCanvasElement$LHTMLElement$(stageCanvas, scoreboard) {
	var $this = this;
	/** @type {HTMLCanvasElement} */
	var bg;
	/** @type {!number} */
	var i;
	/** @type {!number} */
	var loadedCount;
	var checkLoad;
	/** @type {undefined|!string} */
	var name;
	/** @type {HTMLImageElement} */
	var image;
	var touchStart;
	/** @type {HTMLElement} */
	var body;
	var touchMove;
	this.imageName = undefined;
	this.images = undefined;
	this.state = "loading";
	this.ship = undefined;
	this.dying = 0;
	this.lastX = -1;
	this.lastY = -1;
	this.frameCount = 0;
	this.currentTop = 0;
	this.ctx = undefined;
	this.bgCtx = undefined;
	this.bullets = undefined;
	this.rocks = undefined;
	this.numRocks = 0;
	this.score = 0;
	this.scoreElement = undefined;
	this.start = Date.now();
	this.fps = 0;
	this.state = "loading";
	this.imageName = [ "my", "bullet", "rock1", "rock2", "rock3" ];
	this.images = {  };
	scoreboard.style.width = "320px";
	this.scoreElement = scoreboard;
	stageCanvas.width = 320;
	stageCanvas.height = 480;
	this.ctx = (function (o) { return o instanceof CanvasRenderingContext2D ? o : null; })(stageCanvas.getContext("2d"));
	bg = (function (o) { return o instanceof HTMLCanvasElement ? o : null; })(dom.window.document.createElement("canvas"));
	bg.width = 320;
	bg.height = 512;
	this.bgCtx = (function (o) { return o instanceof CanvasRenderingContext2D ? o : null; })(bg.getContext("2d"));
	for (i = 0; i < 10; ++ i) {
		this.imageName.push("space" + (i + 1 + ""));
		this.imageName.push("bomb" + (i + 1 + ""));
	}
	loadedCount = 0;
	checkLoad = (function (e) {
		/** @type {HTMLImageElement} */
		var image;
		/** @type {HTMLCanvasElement} */
		var canvas;
		/** @type {CanvasRenderingContext2D} */
		var cx;
		image = (function (o) { return o instanceof HTMLImageElement ? o : null; })(e.target);
		canvas = (function (o) { return o instanceof HTMLCanvasElement ? o : null; })(dom.window.document.createElement("canvas"));
		cx = (function (o) { return o instanceof CanvasRenderingContext2D ? o : null; })(canvas.getContext("2d"));
		cx.drawImage(image, 0, 0);
		$this.images[image.name] = canvas;
		if (++ loadedCount === $this.imageName.length) {
			$this.initialize$();
		}
	});
	for (i = 0; i < this.imageName.length; ++ i) {
		name = this.imageName[i];
		image = (function (o) { return o instanceof HTMLImageElement ? o : null; })(dom.window.document.createElement("img"));
		image.addEventListener("load", checkLoad);
		image.src = "img/" + name + ".png";
		image.name = name;
	}
	touchStart = (function (e) {
		/** @type {Array.<undefined|!number>} */
		var p;
		e.preventDefault();
		p = $this.getPoint$LEvent$(e);
		$this.lastX = p[0];
		$this.lastY = p[1];
		if ($this.state === "gameover") {
			$this.initialize$();
		}
	});
	body = dom.window.document.body;
	body.addEventListener("mousedown", touchStart);
	body.addEventListener("touchstart", touchStart);
	touchMove = (function (e) {
		/** @type {Array.<undefined|!number>} */
		var p;
		/** @type {SpaceShip} */
		var ship;
		/** @type {!number} */
		var value1$0;
		/** @type {!number} */
		var value1$1;
		/** @type {!number} */
		var value1$2;
		/** @type {!number} */
		var value1$3;
		e.preventDefault();
		p = $this.getPoint$LEvent$(e);
		if ($this.state === "gaming" && $this.lastX !== -1) {
			ship = $this.ship;
			ship.x += (p[0] - $this.lastX) * 2.5 | 0;
			ship.y += (p[1] - $this.lastY) * 3.0 | 0;
			value1$0 = ship.x;
			ship.x = (value1$0 >= 0 ? value1$0 : 0);
			value1$1 = ship.x;
			ship.x = (value1$1 <= 320 ? value1$1 : 320);
			value1$2 = ship.y;
			ship.y = (value1$2 >= 0 ? value1$2 : 0);
			value1$3 = ship.y;
			ship.y = (value1$3 <= 480 ? value1$3 : 480);
		}
		$this.lastX = p[0];
		$this.lastY = p[1];
	});
	body.addEventListener("mousemove", touchMove);
	body.addEventListener("touchmove", touchMove);
};

Stage$LHTMLCanvasElement$LHTMLElement$.prototype = new Stage;

/**
 */
Stage.prototype.changeStateToBeLoading$ = function () {
	this.state = "loading";
};

/**
 * @return {!boolean}
 */
Stage.prototype.isLoading$ = function () {
	return this.state === "loading";
};

/**
 */
Stage.prototype.changeStateToBeGaming$ = function () {
	this.state = "gaming";
};

/**
 * @return {!boolean}
 */
Stage.prototype.isGaming$ = function () {
	return this.state === "gaming";
};

/**
 */
Stage.prototype.changeStateToBeDying$ = function () {
	this.state = "dying";
};

/**
 * @return {!boolean}
 */
Stage.prototype.isDying$ = function () {
	return this.state === "dying";
};

/**
 */
Stage.prototype.changeStateToBeGameOver$ = function () {
	this.state = "gameover";
};

/**
 * @return {!boolean}
 */
Stage.prototype.isGameOver$ = function () {
	return this.state === "gameover";
};

/**
 * @return {!number}
 */
Stage.prototype.level$ = function () {
	return (this.frameCount / 500 | 0);
};

/**
 */
Stage.prototype.drawBackground$ = function () {
	var $math_abs_t;
	/** @type {!number} */
	var bottom;
	bottom = 512 - this.currentTop;
	if (bottom > 0) {
		this.ctx.drawImage(this.bgCtx.canvas, 0, this.currentTop, 320, bottom, 0, 0, 320, bottom);
	}
	if ((($math_abs_t = 480 - bottom) >= 0 ? $math_abs_t : -$math_abs_t) > 0) {
		this.ctx.drawImage(this.bgCtx.canvas, 0, bottom);
	}
};

/**
 */
Stage.prototype.draw$ = function () {
	/** @type {SpaceShip} */
	var ship;
	/** @type {CanvasRenderingContext2D} */
	var context$0;
	/** @type {CanvasRenderingContext2D} */
	var context$1;
	this.drawBackground$();
	ship = this.ship;
	if (this.state === "gaming") {
		context$0 = this.ctx;
		context$0.drawImage(ship.image, ship.x - (ship.width >> 1), ship.y - (ship.height >> 1));
	} else {
		if (this.state === "dying") {
			ship.image = this.images["bomb" + (this.dying + "")];
			context$1 = this.ctx;
			context$1.drawImage(ship.image, ship.x - (ship.width >> 1), ship.y - (ship.height >> 1));
			if (++ this.dying > 10) {
				this.initialize$();
			}
		}
	}
};

/**
 * @param {!number} px
 * @param {!number} py
 */
Stage.prototype.drawSpace$NN = function (px, py) {
	/** @type {!string} */
	var spaceType;
	/** @type {HTMLCanvasElement} */
	var image;
	spaceType = (Math.random() * 10 + 1 | 0) + "";
	image = this.images["space" + spaceType];
	this.bgCtx.drawImage(image, px * 32, py * 32);
};

/**
 * @param {!number} dx
 * @param {!number} dy
 * @return {Bullet}
 */
Stage.prototype.createBullet$NN = function (dx, dy) {
	return new Bullet$NNNNLHTMLCanvasElement$(this.ship.x, this.ship.y, dx * 20, dy * 20, this.images.bullet);
};

/**
 * @return {Rock}
 */
Stage.prototype.createRock$ = function () {
	/** @type {!number} */
	var level;
	/** @type {!number} */
	var px;
	/** @type {!number} */
	var py;
	/** @type {!number} */
	var fx;
	/** @type {!number} */
	var fy;
	/** @type {!number} */
	var r;
	/** @type {!number} */
	var d;
	/** @type {!number} */
	var hp;
	/** @type {!string} */
	var rockId;
	/** @type {!number} */
	var value1$0;
	level = (this.frameCount / 500 | 0);
	px = this.ship.x + Math.random() * 100 - 50;
	py = this.ship.y + Math.random() * 100 - 50;
	fx = Math.random() * 320;
	fy = (level >= 4 ? Math.random() * 2 * 480 : 0);
	r = Math.atan2(py - fy, px - fx);
	value1$0 = Math.random() * (5.5 + level) + 1.5;
	d = (value1$0 >= 10 ? value1$0 : 10);
	hp = Math.random() * Math.random() * (5 + level / 4 | 0) | 1;
	rockId = (Math.random() * 3 + 1 | 0) + "";
	return new Rock$NNNNNNSLHTMLCanvasElement$(fx, fy, Math.cos(r) * d, Math.sin(r) * d, hp, hp * hp * 100, "rock" + rockId, this.images["rock" + rockId]);
};

/**
 */
Stage.prototype.tick$ = function () {
	var $this = this;
	/** @type {!number} */
	var line;
	/** @type {!number} */
	var px;
	/** @type {!string} */
	var fc;
	/** @type {!string} */
	var bulletKey;
	/** @type {!string} */
	var rockKey;
	/** @type {!string} */
	var spaceType$0;
	/** @type {HTMLCanvasElement} */
	var image$0;
	++ this.frameCount;
	dom.window.setTimeout((function () {
		$this.tick$();
	}), 33);
	this.watchFPS$();
	if (this.state === "loading") {
		return;
	}
	if (-- this.currentTop === 0) {
		this.currentTop = 512;
	}
	if (this.currentTop % 32 === 0) {
		line = this.currentTop / 32 - 1;
		for (px = 0; px < 10; ++ px) {
			spaceType$0 = (Math.random() * 10 + 1 | 0) + "";
			image$0 = this.images["space" + spaceType$0];
			this.bgCtx.drawImage(image$0, px * 32, line * 32);
		}
	}
	this.draw$();
	fc = this.frameCount + "";
	if (this.state === "gaming" && this.frameCount % 3 === 0) {
		this.bullets[fc + "a"] = new Bullet$NNNNLHTMLCanvasElement$(this.ship.x, this.ship.y, -20, -20, this.images.bullet);
		this.bullets[fc + "b"] = new Bullet$NNNNLHTMLCanvasElement$(this.ship.x, this.ship.y, 0, -20, this.images.bullet);
		this.bullets[fc + "c"] = new Bullet$NNNNLHTMLCanvasElement$(this.ship.x, this.ship.y, 20, -20, this.images.bullet);
		this.bullets[fc + "d"] = new Bullet$NNNNLHTMLCanvasElement$(this.ship.x, this.ship.y, -20, 20, this.images.bullet);
		this.bullets[fc + "e"] = new Bullet$NNNNLHTMLCanvasElement$(this.ship.x, this.ship.y, 20, 20, this.images.bullet);
	}
	if (this.numRocks < 5 + this.frameCount / 500) {
		this.rocks[fc + "r"] = this.createRock$();
		++ this.numRocks;
	}
	for (bulletKey in this.bullets) {
		if (! this.bullets[bulletKey].update$LStage$(this)) {
			delete this.bullets[bulletKey];
		}
	}
	for (rockKey in this.rocks) {
		if (! this.rocks[rockKey].update$LStage$(this)) {
			delete this.rocks[rockKey];
			-- this.numRocks;
		}
	}
};

/**
 */
Stage.prototype.initialize$ = function () {
	var $this = this;
	/** @type {!number} */
	var px;
	/** @type {!number} */
	var py;
	/** @type {!number} */
	var i;
	/** @type {HTMLCanvasElement} */
	var canvas;
	/** @type {CanvasRenderingContext2D} */
	var rctx;
	/** @type {!string} */
	var k;
	/** @type {!string} */
	var spaceType$0;
	/** @type {HTMLCanvasElement} */
	var image$0;
	for (px = 0; px < 10; ++ px) {
		for (py = 0; py < 16; ++ py) {
			spaceType$0 = (Math.random() * 10 + 1 | 0) + "";
			image$0 = this.images["space" + spaceType$0];
			this.bgCtx.drawImage(image$0, px * 32, py * 32);
		}
	}
	for (i = 0; i < 3; ++ i) {
		canvas = (function (o) { return o instanceof HTMLCanvasElement ? o : null; })(dom.window.document.createElement("canvas"));
		canvas.width = 32;
		canvas.height = 32;
		rctx = (function (o) { return o instanceof CanvasRenderingContext2D ? o : null; })(canvas.getContext("2d"));
		k = "rock" + (i + 1 + "");
		rctx.drawImage(this.images[k], 0, 0);
		rctx.globalCompositeOperation = "source-in";
		rctx.fillStyle = "#fff";
		rctx.fillRect(0, 0, canvas.width, canvas.height);
		this.images[k + "w"] = canvas;
	}
	this.currentTop = 512;
	this.ship = new SpaceShip$NNLHTMLCanvasElement$(80, 360 | 0, this.images.my);
	this.score = 0;
	this.bullets = {  };
	this.rocks = {  };
	this.numRocks = 0;
	this.state = "gaming";
	dom.window.setTimeout((function () {
		dom.window.scrollTo(0, 0);
	}), 250);
};

/**
 * @param {Event} e
 * @return {Array.<undefined|!number>}
 */
Stage.prototype.getPoint$LEvent$ = function (e) {
	/** @type {!number} */
	var px;
	/** @type {!number} */
	var py;
	/** @type {MouseEvent} */
	var me;
	/** @type {TouchEvent} */
	var te;
	px = 0;
	py = 0;
	if (e instanceof MouseEvent) {
		me = (function (o) { return o instanceof MouseEvent ? o : null; })(e);
		px = me.clientX;
		py = me.clientY;
	} else {
		if (e instanceof TouchEvent) {
			te = (function (o) { return o instanceof TouchEvent ? o : null; })(e);
			px = te.touches[0].pageX;
			py = te.touches[0].pageY;
		}
	}
	return [ px, py ];
};

/**
 */
Stage.prototype.watchFPS$ = function () {
	/** @type {!string} */
	var scoreStr$0;
	/** @type {!string} */
	var fillz$0;
	if (this.frameCount % 30 === 0) {
		this.fps = this.frameCount / (Date.now() - this.start) * 1000 | 0;
		scoreStr$0 = this.score + "";
		fillz$0 = "000000000".substring(0, 9 - scoreStr$0.length);
		this.scoreElement.innerHTML = fillz$0 + scoreStr$0 + "<br/>\n" + (this.fps + "") + " FPS";
	}
};

/**
 */
Stage.prototype.updateScore$ = function () {
	/** @type {!string} */
	var scoreStr;
	/** @type {!string} */
	var fillz;
	scoreStr = this.score + "";
	fillz = "000000000".substring(0, 9 - scoreStr.length);
	this.scoreElement.innerHTML = fillz + scoreStr + "<br/>\n" + (this.fps + "") + " FPS";
};

/**
 * class _Main extends Object
 * @constructor
 */
function _Main() {
}

_Main.prototype = new Object;
/**
 * @constructor
 */
function _Main$() {
};

_Main$.prototype = new _Main;

/**
 * @param {Array.<undefined|!string>} args
 */
_Main.main$AS = function (args) {
	/** @type {HTMLCanvasElement} */
	var stageCanvas;
	/** @type {HTMLElement} */
	var scoreboard;
	/** @type {Stage} */
	var stage;
	stageCanvas = (function (o) { return o instanceof HTMLCanvasElement ? o : null; })((function (o) { return o instanceof HTMLElement ? o : null; })(dom.window.document.getElementById("stage")));
	scoreboard = (function (o) { return o instanceof HTMLElement ? o : null; })(dom.window.document.getElementById("scoreboard"));
	stage = new Stage$LHTMLCanvasElement$LHTMLElement$(stageCanvas, scoreboard);
	stage.tick$();
};

var _Main$main$AS = _Main.main$AS;

/**
 * class dom extends Object
 * @constructor
 */
function dom() {
}

dom.prototype = new Object;
/**
 * @constructor
 */
function dom$() {
};

dom$.prototype = new dom;

/**
 * @param {!string} id
 * @return {HTMLElement}
 */
dom.id$S = function (id) {
	return (function (o) { return o instanceof HTMLElement ? o : null; })(dom.window.document.getElementById(id));
};

var dom$id$S = dom.id$S;

/**
 * @param {!string} id
 * @return {HTMLElement}
 */
dom.getElementById$S = function (id) {
	return (function (o) { return o instanceof HTMLElement ? o : null; })(dom.window.document.getElementById(id));
};

var dom$getElementById$S = dom.getElementById$S;

/**
 * @param {!string} tag
 * @return {HTMLElement}
 */
dom.createElement$S = function (tag) {
	return dom.window.document.createElement(tag);
};

var dom$createElement$S = dom.createElement$S;

/**
 * class js extends Object
 * @constructor
 */
function js() {
}

js.prototype = new Object;
/**
 * @constructor
 */
function js$() {
};

js$.prototype = new js;

Config.cols = 10;
Config.rows = 15;
Config.cellWidth = 32;
Config.cellHeight = 32;
Config.bulletWidth = 4;
Config.bulletHeight = 4;
Config.bulletSpeed = 20;
Config.reloadCount = 3;
Config.initialNumRocks = 5;
Config.FPS = 30;
Config.width = 320;
Config.height = 480;
Config.imagePath = "img";
Config.canvasId = "stage";
Config.scoreboardId = "scoreboard";
$__jsx_lazy_init(dom, "window", function () {
	return js.global.window;
});
js.global = (function () { return this; })();

var $__jsx_classMap = {
	"shooting.jsx": {
		Config: Config,
		Config$: Config$,
		Sprite: Sprite,
		Sprite$: Sprite$,
		MovingObject: MovingObject,
		MovingObject$NNNNLHTMLCanvasElement$: MovingObject$NNNNLHTMLCanvasElement$,
		Bullet: Bullet,
		Bullet$NNNNLHTMLCanvasElement$: Bullet$NNNNLHTMLCanvasElement$,
		Rock: Rock,
		Rock$NNNNNNSLHTMLCanvasElement$: Rock$NNNNNNSLHTMLCanvasElement$,
		SpaceShip: SpaceShip,
		SpaceShip$NNLHTMLCanvasElement$: SpaceShip$NNLHTMLCanvasElement$,
		Stage: Stage,
		Stage$LHTMLCanvasElement$LHTMLElement$: Stage$LHTMLCanvasElement$LHTMLElement$,
		_Main: _Main,
		_Main$: _Main$
	},
	"system:lib/js/js/web.jsx": {
		dom: dom,
		dom$: dom$
	},
	"system:lib/js/js.jsx": {
		js: js,
		js$: js$
	}
};


/**
 * launches _Main.main(:string[]):void invoked by jsx --run|--executable
 */
JSX.runMain = function (sourceFile, args) {
	var module = JSX.require(sourceFile);

	if (! module._Main) {
		throw new Error("entry point _Main not found in " + sourceFile);
	}
	if (! module._Main.main$AS) {
		throw new Error("entry point _Main.main(:string[]):void not found in " + sourceFile);
	}

	module._Main.main$AS(args);
}

/**
 * launches _Test#test*():void invoked by jsx --test
 */
JSX.runTests = function (sourceFile, tests) {
	var module = JSX.require(sourceFile);
	var testClass = module._Test$;

	if (!testClass) return; // skip if there's no test class

	if(tests.length === 0) {
		var p = testClass.prototype;
		for (var m in p) {
			if (p[m] instanceof Function
				&& /^test.*[$]$/.test(m)) {
				tests.push(m);
			}
		}
	}

	var test = new testClass();

	if (test.beforeClass$AS != null)
		test.beforeClass$AS(tests);

	for (var i = 0; i < tests.length; ++i) {
		(function (m) {
			test.run$SF$V$(m, function() { test[m](); });
		}(tests[i]));
	}

	if (test.afterClass$ != null)
		test.afterClass$();
}
/**
 * call a function on load/DOMContentLoaded
 */
function $__jsx_onload (event) {
	window.removeEventListener("load", $__jsx_onload);
	window.removeEventListener("DOMContentLoaded", $__jsx_onload);
	JSX.runMain("shooting.jsx", [])
}

window.addEventListener("load", $__jsx_onload);
window.addEventListener("DOMContentLoaded", $__jsx_onload);

})();
