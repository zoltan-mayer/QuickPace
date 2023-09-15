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
    for (let j = 0; j < pace_table.rows[0].cells.length; j++) {
        pace_table.rows[i].cells[j].style.height = maxHeight + 'px';
    }
}

for (let i = 0; i < speed_table.rows.length; i++) {
    for (let j = 0; j < speed_table.rows[0].cells.length; j++) {
        speed_table.rows[i].cells[j].style.height = maxHeight + 'px';
    }
}

let speed_table_row_width = speed_table.rows[0].offsetWidth;
let pace_table_row_width = pace_table.rows[0].offsetWidth;
speed_table.rows[0].cells[3].style.width = (pace_table_row_width - speed_table_row_width - 30) + 'px';
// End: table formatting
const one_mile = 1609.344;
const dist_array = [1, 1000, one_mile, 5000, 10000, (10 * one_mile), 21097.5, (2 * 21097.5), 1, 1];

function update_pace_table() {
    for (let i = 1; i < pace_table.rows.length; ++i) {
        console.log(i + ' ' + dist_array[i]);
    } 
}

const coarse_slider = document.getElementById("coarseSlider");
const fine_slider = document.getElementById("fineSlider");
const cd_1_val = document.getElementById("custom_dist_1");
const cd_1_unit = document.getElementById("custom_unit_1");
const cd_2_val = document.getElementById("custom_dist_2");
const cd_2_unit = document.getElementById("custom_unit_2");
const kph_cell = document.getElementById("kphCell");
const mph_cell = document.getElementById("mphCell");

let speed_kph_var = parseFloat(Number(coarse_slider.value) + Number(fine_slider.value)).toFixed(5);
kph_cell.innerHTML = parseFloat(speed_kph_var).toFixed(3);
mph_cell.innerHTML = parseFloat(speed_kph_var * 0.6213712).toFixed(3);

let custom_distance_1 = parseFloat(cd_1_val.value) * parseFloat(cd_1_unit.value);
let custom_distance_2 = parseFloat(cd_2_val.value) * parseFloat(cd_2_unit.value);
dist_array[dist_array.length - 2] = custom_distance_1;
dist_array[dist_array.length - 1] = custom_distance_2;

update_pace_table();

function on_fine_slider_input() {
    speed_kph_var = parseFloat(Number(coarse_slider.value) + Number(fine_slider.value)).toFixed(5);
    kph_cell.innerHTML = parseFloat(speed_kph_var).toFixed(3);
    mph_cell.innerHTML = parseFloat(speed_kph_var * 0.6213712).toFixed(3);

    update_pace_table();
}

function on_coarse_slider_input() {
    fine_slider.value = 0.0;
    on_fine_slider_input();
}

coarse_slider.oninput = on_coarse_slider_input;
coarse_slider.onclick = on_coarse_slider_input;
fine_slider.oninput = on_fine_slider_input;
fine_slider.onclick = on_fine_slider_input;

function on_custom_dist_input() {
    custom_distance_1 = parseFloat(cd_1_val.value) * parseFloat(cd_1_unit.value);
    custom_distance_2 = parseFloat(cd_2_val.value) * parseFloat(cd_2_unit.value);
    dist_array[dist_array.length - 2] = custom_distance_1;
    dist_array[dist_array.length - 1] = custom_distance_2;

    update_pace_table();
}

cd_1_val.oninput = on_custom_dist_input;
cd_1_unit.onclick = on_custom_dist_input;
cd_2_val.oninput = on_custom_dist_input;
cd_2_unit.onclick = on_custom_dist_input;