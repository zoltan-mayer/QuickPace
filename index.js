// Begin: table formatting
const pace_table = document.getElementById('paceTable');
const speed_table = document.getElementById('speedTable');
let maxHeight = 0;

for (let i = 0; i < pace_table.rows.length; i++) {
    const cellHeight = pace_table.rows[i].cells[0].offsetHeight;
    if (cellHeight > maxHeight) {
        maxHeight = cellHeight;
    }
}

maxHeight -= 10;

for (let i = 0; i < pace_table.rows.length; i++) {
    for (let j = 0; j < pace_table.rows[0].length; j++) {
        pace_table.rows[i].cells[j].style.height = maxHeight + 'px';
    }
}

for (let i = 0; i < speed_table.rows.length; i++) {
    for (let j = 0; j < speed_table.rows[0].length; j++) {
        speed_table.rows[i].cells[j].style.height = maxHeight + 'px';
    }
}
// End: table formatting

const coarse_slider = document.getElementById("coarseSlider");
const fine_slider = document.getElementById("fineSlider");
const kph_cell = document.getElementById("kphCell");
const mph_cell = document.getElementById("mphCell");

let speed_kph_var = parseFloat(Number(coarse_slider.value) + Number(fine_slider.value)).toFixed(5);
kph_cell.innerHTML = parseFloat(speed_kph_var).toFixed(3);
mph_cell.innerHTML = parseFloat(speed_kph_var * 0.6213712).toFixed(3);

function on_fine_slider_input() {
    speed_kph_var = parseFloat(Number(coarse_slider.value) + Number(fine_slider.value)).toFixed(5);
    kph_cell.innerHTML = parseFloat(speed_kph_var).toFixed(3);
    mph_cell.innerHTML = parseFloat(speed_kph_var * 0.6213712).toFixed(3);
}

function on_coarse_slider_input() {
    fine_slider.value = 0.0;
    on_fine_slider_input();
}

coarse_slider.oninput = on_coarse_slider_input;
fine_slider.oninput = on_fine_slider_input;
