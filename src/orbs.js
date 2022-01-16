import triggers from "./triggers.js";

class Orb {
	constructor(pos, vect, value, color) {
		this.pos = pos;
		this.vect = vect;
		this.value = value;
		this.color = color;
		this.destroy = false;
	}
}

const orbs = {
	/** @type Orb[] */
	list: [],
	update(i, { pos, vect, value, color }) { 
		if (pos.y + 7 >= Jel.h*0.75) {
			// on conveyor
			pos.y = Jel.h*0.75 - 7;
			vect.x = triggers.conveyor_speed * (Jel.w / 1056) * triggers.speed_mult;
			vect.y -= vect.y;
		} else if (pos.y - 7 <= 0) {
			pos.y = 7;
			vect.y = 0;
		}
		if (pos.x + 7 >= Jel.w) {
			pos.x = Jel.w - 7;
			vect.x -= vect.x;
		} else if (pos.x - 7 <= 0) {
			pos.x = 7;
			vect.x += vect.x;
		}

		vect.y += 0.1;
		pos.x += vect.x;
		pos.y += vect.y;

		const res = triggers.check({ pos, vect, value, color });
		if (res === true) {
			this.list[i].destroy = true;
			return value;
		}
		if (res === "upgrade") {
			if (this.list[i].color == "white") {
				this.list[i].value = Math.round(this.list[i].value * triggers.gate1.mult * 10)/10;
				this.list[i].color = "lime";
			} else if (this.list[i].color == "lime") {
				this.list[i].value = Math.round(this.list[i].value * triggers.gate2.mult * 10)/10;
				this.list[i].color = "blue";
			} else if (this.list[i].color == "blue") {
				this.list[i].value = Math.round(this.list[i].value * triggers.gate3.mult * 10)/10;
				this.list[i].color = "magenta";
			} else if (this.list[i].color == "magenta") {
				this.list[i].value = Math.round(this.list[i].value * triggers.gate4.mult * 10)/10;
				this.list[i].color = "gold";
			}
		}
		// console.log(res);
		return 0;
	},
	update_all() {
		for (let i = this.list.length-1; i >= 0; i--) {
			if (this.list[i].destroy) this.list.splice(i, 1);
		}
		let total = 0;
		for (let i = 0; i < this.list.length; i++) {
			const orb = this.list[i];
			total += this.update(i, orb);
		}
		return total;
	},
	draw({ pos, color }) {
		Jel.fill_color = color;
		Jel.rect1(pos.x-7, pos.y-7, 14, 14);
	},
	draw_all() {
		for (let i = 0; i < this.list.length; i++) {
			const orb = this.list[i];
			this.draw(orb);
		}
	},

	new(x,y, value, color) {
		this.list.push( new Orb(Jel.nv(x,y), Jel.nv(0,0), value, color) );
	}
	
};

export default orbs;