kaboom.global();
loadSprite("player", "player.svg");
loadSprite("pipe", "pipe.png");
init({width: 240, height: 240, fullscreen: true, scale: 2});
scene("main", (args = {}) => {
	gravity(1200);
	layers(["obj", "ui"], "obj");
	const birdy = add([sprite("player"), pos(120, 0), layer("obj"), body()]);
	birdy.action(() => {if (birdy.pos.y >= height() || birdy.pos.y <= -120) {go("score", {score: score.value});}});
	keyPress("space", () => {birdy.jump(300);});
	function spawnpipe() {
		const h1 = rand(20, height() - 120);
		const h2 = h1 + 100;
		add([sprite("pipe"), origin("botleft"), pos(width(), h1), layer("obj"), "pipe"]);
		add([sprite("pipe"), origin("botleft"), scale(1, -1), layer("obj"), pos(width(), h2), "pipe", {passed: false}]);
	}
	birdy.collides("pipe", () => {go("score", {score: score.value});});
	action("pipe", (p) => {
		p.move(-100, 0);
		if (p.pos.x + p.width <= birdy.pos.x && p.passed === false) {
			addScore();
			p.passed = true;
		}
		if (p.pos.x < -width() / 2) {destroy(p);}
	});
	loop(1, () => {spawnpipe();});
	const score = add([text("0", 16), layer("ui"), pos(9, 9), {value: 0}]);
	function addScore() {score.text = ++score.value;}
});
scene("score", (args = {}) => {
	add([text(`${args.score}`, 32), pos(width() / 2, height() / 2), origin("center")]);
	add([text("Press space to start and jump"), pos(width() / 2, height() / 2 + 64), origin("center")]);
	keyPress("space", () => {go("main");});
});
start("main");