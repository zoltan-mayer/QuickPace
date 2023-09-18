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

for (let i = 1; i < pace_table.rows[0].cells.length; i++) {
    pace_table.rows[0].cells[i].style.width = 45 + 'px';
}

let speed_table_row_width = speed_table.rows[0].offsetWidth;
let pace_table_row_width = pace_table.rows[0].offsetWidth;
speed_table.rows[0].cells[3].style.width = (pace_table_row_width - speed_table_row_width - 30) + 'px';
// End: table formatting
const one_mile = 1609.344;
const dist_array = [1, 1000, one_mile, 5000, 10000, (10 * one_mile), 21097.5, (2 * 21097.5), 1, 1];
const custom_unit_array = [1, 1000, 0.3048, one_mile];
const initial_speed = 12.0;

function update_pace_table() {
    let speed_mps = speed_kph_var / 3.6;
    for (let i = 1; i < pace_table.rows.length; ++i) {
        let duration_ms = (dist_array[i] / speed_mps) * 1000.0;
        duration_ms = parseFloat(duration_ms).toFixed(0);
        let rem_duration_ms = duration_ms;
        let hours = Math.floor((rem_duration_ms / 1000.0) / 60.0 / 60.0);
        rem_duration_ms = rem_duration_ms - (hours * 1000.0 * 60 * 60);
        let mins = Math.floor((rem_duration_ms / 1000.0) / 60.0);
        rem_duration_ms = rem_duration_ms - (mins * 1000.0 * 60);
        let seconds = Math.floor(rem_duration_ms / 1000.0);
        rem_duration_ms = rem_duration_ms - (seconds * 1000.0);
        let thou = parseFloat(rem_duration_ms).toFixed(0);

        if (1.0 > hours) {
            hours = "";
        }
        if ((1.0 > mins) && (1.0 > hours)) {
            mins = "";
        }
        if ((1.0 > seconds) && (1.0 > mins) && (1.0 > hours)) {
            seconds = ""; 
        }
        if ((1.0 > thou) && (1.0 > seconds) && (1.0 > mins) && (1.0 > hours)) {
            thou = "";
        }

        pace_table.rows[i].cells[1].innerHTML = hours;
        pace_table.rows[i].cells[2].innerHTML = mins;
        pace_table.rows[i].cells[3].innerHTML = seconds;
        pace_table.rows[i].cells[4].innerHTML = thou;
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

noUiSlider.create(coarse_slider, {
    connect: 'lower',
    start: 12.0,
    step: 0.01,
    direction: 'rtl',
    orientation: 'vertical',
    range: {
        'min': 5.5,
        'max': 24.5
    }
});

noUiSlider.create(fine_slider, {
    connect: 'lower',
    start: 0.0,
    step: 0.01,
    direction: 'rtl',
    orientation: 'vertical',
    range: {
        'min': -0.5,
        'max': 0.5
    }
});

let speed_kph_var = initial_speed;
kph_cell.innerHTML = parseFloat(speed_kph_var).toFixed(3);
mph_cell.innerHTML = parseFloat(speed_kph_var * 0.6213712).toFixed(3);

let custom_distance_1 = parseFloat(cd_1_val.value) * parseFloat(custom_unit_array[cd_1_unit.value]);
let custom_distance_2 = parseFloat(cd_2_val.value) * parseFloat(custom_unit_array[cd_2_unit.value]);
dist_array[dist_array.length - 2] = custom_distance_1;
dist_array[dist_array.length - 1] = custom_distance_2;

update_pace_table();

function on_fine_slider_input(values, handle, unencoded, tap, positions, noUiSlider) {
    var coarse_val = coarse_slider.noUiSlider.get();
    var fine_val = fine_slider.noUiSlider.get();
    speed_kph_var = parseFloat(Number(coarse_val) + Number(fine_val)).toFixed(5);
    kph_cell.innerHTML = parseFloat(speed_kph_var).toFixed(3);
    mph_cell.innerHTML = parseFloat(speed_kph_var * 0.6213712).toFixed(3);

    update_pace_table();
}

function on_coarse_slider_input(values, handle, unencoded, tap, positions, noUiSlider) {
    fine_slider.noUiSlider.set(0.0);
    on_fine_slider_input(values, handle, unencoded, tap, positions, noUiSlider);
}

function on_custom_dist_input() {
    custom_distance_1 = parseFloat(cd_1_val.value) * parseFloat(custom_unit_array[cd_1_unit.value]);
    custom_distance_2 = parseFloat(cd_2_val.value) * parseFloat(custom_unit_array[cd_2_unit.value]);
    dist_array[dist_array.length - 2] = custom_distance_1;
    dist_array[dist_array.length - 1] = custom_distance_2;

    update_pace_table();
}

coarse_slider.noUiSlider.on('update', on_coarse_slider_input);
fine_slider.noUiSlider.on('update', on_fine_slider_input);

cd_1_val.oninput = on_custom_dist_input;
cd_1_unit.onclick = on_custom_dist_input;
cd_2_val.oninput = on_custom_dist_input;
cd_2_unit.onclick = on_custom_dist_input;
