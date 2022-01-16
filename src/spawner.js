import orbs from "./orbs.js";

const spawner_gap = (callback)=>{
	const min = 20;
	const max = Jel.w*0.2-40;
	const gap = max/spawner.amount;
	for (let i = 0; i < spawner.amount; i++) {
		callback(min+i*gap, 20);
	}
}

const spawner = {
	max_ticks: 120,
	ticks: 0,
	value: 1,
	amount: 1,
	amount_cost: 250,
	speed_cost: 25,
	speed_mult: 1,
	update() {
		if (this.ticks >= this.max_ticks) {
			this.spawn();
			this.ticks = 0;
		}
		else this.ticks += this.speed_mult;
	},
	draw() {
		spawner_gap( (x,y)=> {
			Jel.fill_color = "lime";
			Jel.circle1(x,y, 10);
		});
	},
	spawn() {
		spawner_gap( (x,y)=> orbs.new(x,y, this.value, "white") );
	},

	// Upgrades
	value_cost: 100,
	upgrade_value() {
		if (cash < this.value_cost) return;
		this.value *= 2;
		cash -= this.value_cost;
		this.value_cost = Math.round(this.value_cost * 4 * 10)/10;
	}
}

export default spawner;