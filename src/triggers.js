const triggers = {
	conveyor_speed: 10,
	speed_mult: 1,
	speed_cost: 100,
	gate1: {
		mult: 1.25,
		unlock_cost: 50,
		unlock: false,
		px: 20,
		cost: 50,
		check(x1, x2) {
			return ( this.unlock && x1 < this.px/100 * Jel.w   &&   x2 >= this.px/100 * Jel.w );
		},
	},
	gate2: {
		mult: 1.25,
		unlock_cost: 500,
		unlock: false,
		px: 40,
		cost: 100,
		check(x1, x2) {
			return ( this.unlock && x1 < this.px/100 * Jel.w   &&   x2 >= this.px/100 * Jel.w );
		},
	},
	gate3: {
		mult: 1.25,
		unlock_cost: 5000,
		unlock: false,
		px: 60,
		cost: 1000,
		check(x1, x2) {
			return ( this.unlock && x1 < this.px/100 * Jel.w   &&   x2 >= this.px/100 * Jel.w );
		},
	},
	gate4: {
		mult: 1.25,
		unlock_cost: 50000,
		unlock: false,
		px: 80,
		cost: 10000,
		check(x1, x2) {
			return ( this.unlock && x1 < this.px/100 * Jel.w   &&   x2 >= this.px/100 * Jel.w );
		},
	},
	check({ pos, vect, value, color }) {
		if (pos.x + 7 >= Jel.w-10) return true;
		
		const next = Jel.nv(
			pos.x + vect.x,
			pos.y + vect.y,
		);
		
		if (this.gate1.check(pos.x, next.x)) {
			return "upgrade";
		}

		if (this.gate2.check(pos.x, next.x)) {
			return "upgrade";
		}

		if (this.gate3.check(pos.x, next.x)) {
			return "upgrade";
		}

		if (this.gate4.check(pos.x, next.x)) {
			return "upgrade";
		}
	},
	draw() {
		// collector | destroyer
		Jel.fill_color = "red";
		Jel.rect1(Jel.w - 10, 0, 10, Jel.h*0.75);

		// Gate 1
		if (this.gate1.unlock) {
			Jel.fill_color = "#00ff5599";
			Jel.rect1(this.gate1.px/100 * Jel.w - 5, 0, 10, Jel.h*0.75);
		}

		// Gate 2
		if (this.gate2.unlock) {
			Jel.fill_color = "#0055ff99";
			Jel.rect1(this.gate2.px/100 * Jel.w - 5, 0, 10, Jel.h*0.75);
		}

		// Gate 3
		if (this.gate3.unlock) {
			Jel.fill_color = "#9900ff99";
			Jel.rect1(this.gate3.px/100 * Jel.w - 5, 0, 10, Jel.h*0.75);
		}

		// Gate 4
		if (this.gate4.unlock) {
			Jel.fill_color = "#ffd70099";
			Jel.rect1(this.gate4.px/100 * Jel.w - 5, 0, 10, Jel.h*0.75);
		}
	}
};

export default triggers;