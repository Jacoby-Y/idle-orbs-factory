import spawner from "./spawner.js";
import orbs from "./orbs.js";
import triggers from "./triggers.js";
import gui from "./gui.js";

window.cash = 0;

Jel.run((t)=>{
	spawner.update();
	cash += orbs.update_all();
	gui.cash(cash);
	
	if (t % 2 == 0) { // Draw
		Jel.clear();

		// Conveyor
		Jel.fill_color = "#444";
		Jel.rect1(0, Jel.h*0.75, Jel.w, Jel.h*0.25);
		Jel.line_color = "black";
		Jel.line1(0, Jel.h*0.75+1, Jel.w, Jel.h*0.75+1);

		// Others
		orbs.draw_all();
		triggers.draw();
		spawner.draw();
	}
});

Jel.on_resize = ()=>{
	Jel.clear();
	for (let i = 0; i < orbs.list.length; i++) {
		const orb = orbs.list[i];
		orb.destroy = true;
	}
	(()=>{
		const w = window.innerWidth;
		const h = window.innerHeight;
		const sw = w;
		const sh = h/4;
		canvas.style.width = sw + "px";
		canvas.style.height = sh + "px";
		canvas.width = sw;
		canvas.height = sh;
		Jel.w = canvas.width;
		Jel.h = canvas.height;
	})();
}; Jel.on_resize();