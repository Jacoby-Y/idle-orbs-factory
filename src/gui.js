import spawner from './spawner.js';
import triggers from './triggers.js';

const save = {};
const get = (id)=>{
	if (save[id] == undefined) {
		save[id] = $(id);
	}
	return save[id];
} 

document.body.onload = ()=>{
	for (const k in gui) {
		if (!Object.hasOwnProperty.call(gui, k)) continue;
		gui[k]();
	}

	$("#gate1").onclick = ()=>{
		if (triggers.gate1.unlock == false) {
			if (cash < triggers.gate1.unlock_cost) return;
			cash -= triggers.gate1.unlock_cost;
			triggers.gate1.unlock = true;
		} else {
			if (cash < triggers.gate1.cost) return;
			cash -= triggers.gate1.cost;
			triggers.gate1.cost = Math.round(triggers.gate1.cost * 1.25);
			triggers.gate1.mult += 0.25;
			gui.cash(cash);
		}
		gui.gate1(triggers.gate1.mult, triggers.gate1.cost);
	}
	
	$("#gate2").onclick = ()=>{
		if (triggers.gate2.unlock == false) {
			if (cash < triggers.gate2.unlock_cost) return;
			cash -= triggers.gate2.unlock_cost;
			triggers.gate2.unlock = true;
		} else {
			if (cash < triggers.gate2.cost) return;
			cash -= triggers.gate2.cost;
			triggers.gate2.cost = Math.round(triggers.gate2.cost * 1.25);
			triggers.gate2.mult += 0.25;
			gui.cash(cash);
		}
		gui.gate2(triggers.gate2.mult, triggers.gate2.cost);
	}
	
	$("#gate3").onclick = ()=>{
		if (triggers.gate3.unlock == false) {
			if (cash < triggers.gate3.unlock_cost) return;
			cash -= triggers.gate3.unlock_cost;
			triggers.gate3.unlock = true;
		} else {
			if (cash < triggers.gate3.cost) return;
			cash -= triggers.gate3.cost;
			triggers.gate3.cost = Math.round(triggers.gate3.cost * 1.25);
			triggers.gate3.mult += 0.25;
			gui.cash(cash);
		}
		gui.gate3(triggers.gate3.mult, triggers.gate3.cost);
	}

	$("#gate4").onclick = ()=>{
		if (triggers.gate4.unlock == false) {
			if (cash < triggers.gate4.unlock_cost) return;
			cash -= triggers.gate4.unlock_cost;
			triggers.gate4.unlock = true;
		} else {
			if (cash < triggers.gate4.cost) return;
			cash -= triggers.gate4.cost;
			triggers.gate4.cost = Math.round(triggers.gate4.cost * 1.25);
			triggers.gate4.mult += 0.25;
			gui.cash(cash);
		}
		gui.gate4(triggers.gate4.mult, triggers.gate4.cost);
	}

	$("#spawner #speed").onclick = ()=>{
		if (cash < spawner.speed_cost) return;
		cash -= spawner.speed_cost;
		spawner.speed_cost = Math.round(spawner.speed_cost * 1.25);
		spawner.speed_mult += 0.25;
		gui.spawner_speed();
	}
	$("#spawner #amount").onclick = ()=>{
		if (cash < spawner.amount_cost) return;
		cash -= spawner.amount_cost;
		spawner.amount_cost *= 10;
		spawner.amount++;
		gui.amount();
	}

	$("#conveyor #speed").onclick = ()=>{
		if (cash < triggers.speed_cost) return;
		cash -= triggers.speed_cost;
		triggers.speed_cost = Math.round(triggers.speed_cost * 1.25);
		triggers.speed_mult += 0.1;
		gui.conveyor_speed();
	}

	$("#base").onclick = ()=>{
		spawner.upgrade_value();
		gui.base();
	}
}

const gui = {
	cash: ()=> get("#cash-txt").innerText = `Cash: ${format_num(cash)}`,

	// gate (multiplier, cost)
	gate1: ()=> get("#gate1 h3").innerText = (triggers.gate1.unlock)? `Value: x${triggers.gate1.mult+0.25} ($${format_num(triggers.gate1.cost)})` : `Unlock Gate 1: ($${format_num(triggers.gate1.unlock_cost)})`,
	gate2: ()=> get("#gate2 h3").innerText = (triggers.gate2.unlock)? `Value: x${triggers.gate2.mult+0.25} ($${format_num(triggers.gate2.cost)})` : `Unlock Gate 2: ($${format_num(triggers.gate2.unlock_cost)})`,
	gate3: ()=> get("#gate3 h3").innerText = (triggers.gate3.unlock)? `Value: x${triggers.gate3.mult+0.25} ($${format_num(triggers.gate3.cost)})` : `Unlock Gate 3: ($${format_num(triggers.gate3.unlock_cost)})`,
	gate4: ()=> get("#gate4 h3").innerText = (triggers.gate4.unlock)? `Value: x${triggers.gate4.mult+0.25} ($${format_num(triggers.gate4.cost)})` : `Unlock Gate 4: ($${format_num(triggers.gate4.unlock_cost)})`,

	spawner_speed: ()=> get("#spawner #speed h3").innerText = `Spawn Speed: x${spawner.speed_mult+0.25} ($${format_num(spawner.speed_cost)})`,
	amount: ()=> get("#spawner #amount h3").innerText = `Buy Spawner: $${format_num(spawner.amount_cost)}`,

	conveyor_speed: ()=> get("#conveyor #speed h3").innerText = `Conveyor Speed: x${Math.round((triggers.speed_mult+0.1)*10)/10} ($${format_num(triggers.speed_cost)})`,

	base: ()=> get("#base h3").innerText = `Base Value: ${format_num(spawner.value*2)} ($${format_num(spawner.value_cost)})`,
};

export default gui;