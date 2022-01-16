import orbs from "./orbs.js";

const spawner = {
	max_ticks: 120,
	ticks: 0,
	value: 1,
	amount: 1,
	amount_cost: 500,
	speed_cost: 50,
	speed_mult: 1,
	update() {
		if (this.ticks >= this.max_ticks) {
			this.spawn();
			this.ticks = 0;
		}
		else this.ticks += this.speed_mult;
	},
	draw() {
		const min = 40;
		const max = Jel.w*0.2-40;
		const gap = max/this.amount;
		for (let i = 0; i < this.amount; i++) {
			Jel.fill_color = "lime";
			Jel.circle1(min+i*gap, 20, 10);
		}
	},
	spawn() {
		const min = 40;
		const max = Jel.w*0.2-40;
		const gap = max/this.amount;
		for (let i = 0; i < this.amount; i++) {
			orbs.new(min+i*gap, 20, this.value, "white");
		}
	},

	// Upgrades
	value_cost: 10,
	upgrade_value(cash) {
		if (cash < this.value_cost) return cash;
		this.value += 1;
		const res = cash - this.value_cost;
		this.value_cost = Math.round(this.value_cost * 1.25 * 10)/10;
		return res;
	}
}

export default spawner;