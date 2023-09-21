let original_document_height = 0;

function resize_sliders_as_needed() {
    const elements = document.getElementsByClassName('sliderdiv');
    var available_height = document.documentElement.clientHeight;

    if (available_height < original_document_height) {
        var missing_height = original_document_height - available_height;
        var new_slider_height = 300 - missing_height - 30;
        if (150 > new_slider_height) { new_slider_height = 150; }

        for (let i = 0; i < elements.length; i++) {
            elements[i].style.height = new_slider_height + 'px';
        }
    }
    else {
        for (let i = 0; i < elements.length; i++) {
            elements[i].style.height = 300 + 'px';
        }
    }
}

function on_page_load() {
    original_document_height = document.body.scrollHeight;

    resize_sliders_as_needed();
}

window.addEventListener('load', on_page_load);
window.addEventListener('resize', resize_sliders_as_needed);

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

// maxHeight -= 10;
maxHeight = 19; // TODO

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
let speed_kph_var = 12.0;
let fine_speed_value = 0.0;
let is_last_event_end = false;

function isVerticalScrollbarPresent() {
    if (element) {
        return element.scrollHeight > element.clientHeight;
    } else {
        return 
    }
}

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
const kph_cell = document.getElementById("speed_input_kph");
const mph_cell = document.getElementById("speed_input_mph");

var kph_store = localStorage.getItem('speed_kph');
if (kph_store !== null) {
    speed_kph_var = parseFloat(kph_store);
    if (isNaN(speed_kph_var) || (5.0 > speed_kph_var) || (25.0 < speed_kph_var)) {
        speed_kph_var = 12.0;
    }
}

var cust_dist_store1 = localStorage.getItem('custom_dist_1');
if (cust_dist_store1 !== null) {
    cd_1_val.value = parseFloat(cust_dist_store1);
    if (isNaN(cd_1_val.value)) { cd_1_val.value = 50.0; }
}
var cust_unit_store1 = localStorage.getItem('custom_unit_1');
if (cust_unit_store1 !== null) {
    cd_1_unit.value = parseInt(cust_unit_store1);
    if (isNaN(cd_1_unit.value)) { cd_1_unit.value = 1; }
}

var cust_dist_store2 = localStorage.getItem('custom_dist_2');
if (cust_dist_store2 !== null) {
    cd_2_val.value = parseFloat(cust_dist_store2);
    if (isNaN(cd_2_val.value)) { cd_2_val.value = 100.0; }
}
var cust_unit_store2 = localStorage.getItem('custom_unit_2');
if (cust_unit_store2 !== null) {
    cd_2_unit.value = parseInt(cust_unit_store2);
    if (isNaN(cd_2_unit.value)) { cd_2_unit.value = 3; }
}

noUiSlider.create(coarse_slider, {
    connect: 'lower',
    start: speed_kph_var * 100.0,
    direction: 'rtl',
    orientation: 'vertical',
    animationDuration: 300,
    range: {
        'min': 500,
        'max': 2500
    }
});

noUiSlider.create(fine_slider, {
    start: 0.0,
    direction: 'rtl',
    orientation: 'vertical',
    animationDuration: 100,
    range: {
        'min': -1.0,
        'max': 1.0
    }
});

kph_cell.value = parseFloat(speed_kph_var).toFixed(3);
mph_cell.value = parseFloat(speed_kph_var * 0.6213712).toFixed(3);

let custom_distance_1 = parseFloat(cd_1_val.value) * parseFloat(custom_unit_array[cd_1_unit.value]);
let custom_distance_2 = parseFloat(cd_2_val.value) * parseFloat(custom_unit_array[cd_2_unit.value]);
dist_array[dist_array.length - 2] = custom_distance_1;
dist_array[dist_array.length - 1] = custom_distance_2;

update_pace_table();

function on_fine_slider_input(values, handle, unencoded, tap, positions, noUiSlider) {
    if (false == is_last_event_end) {
        var coarse_val = parseFloat(coarse_slider.noUiSlider.get()) / 100.0;
        var fine_val = (fine_speed_value + parseFloat(fine_slider.noUiSlider.get())) / 100.0;
        speed_kph_var = parseFloat(coarse_val) + parseFloat(fine_val);
        var stored_speed = speed_kph_var;
        if (25.0 < stored_speed) { stored_speed = 25.0; }
        if (5.0 > stored_speed) { stored_speed = 5.0; }
        localStorage.setItem('speed_kph', stored_speed);
        kph_cell.value = parseFloat(speed_kph_var).toFixed(3);
        mph_cell.value = parseFloat(speed_kph_var * 0.6213712).toFixed(3);

        update_pace_table();
    }

    is_last_event_end = false;
}

function on_fine_slider_end(values, handle, unencoded, tap, positions, noUiSlider) {
    fine_speed_value += parseFloat(fine_slider.noUiSlider.get());
    fine_slider.noUiSlider.reset();

    is_last_event_end = true;
}

function on_coarse_slider_input(values, handle, unencoded, tap, positions, noUiSlider) {
    fine_speed_value = 0.0;

    speed_kph_var = parseFloat(coarse_slider.noUiSlider.get()) / 100.0;
    var stored_speed = speed_kph_var;
    if (25.0 < stored_speed) { stored_speed = 25.0; }
    if (5.0 > stored_speed) { stored_speed = 5.0; }
    localStorage.setItem('speed_kph', stored_speed);
    kph_cell.value = parseFloat(speed_kph_var).toFixed(3);
    mph_cell.value = parseFloat(speed_kph_var * 0.6213712).toFixed(3);

    update_pace_table();
}

function on_custom_dist_input() {
    var cd1 = parseFloat(cd_1_val.value)
    if (isNaN(cd1) || (0.0 > cd1)) {
        cd1 = 0.0;
    }
    cd_1_val.value = parseFloat(cd1);
    localStorage.setItem('custom_dist_1', cd_1_val.value);
    localStorage.setItem('custom_unit_1', cd_1_unit.value);
    custom_distance_1 = parseFloat(cd_1_val.value) * parseFloat(custom_unit_array[cd_1_unit.value]);

    var cd2 = parseFloat(cd_2_val.value)
    if (isNaN(cd2) || (0.0 > cd2)) {
        cd2 = 0.0;
    }
    cd_2_val.value = parseFloat(cd2);
    localStorage.setItem('custom_dist_2', cd_2_val.value);
    localStorage.setItem('custom_unit_2', cd_2_unit.value);
    custom_distance_2 = parseFloat(cd_2_val.value) * parseFloat(custom_unit_array[cd_2_unit.value]);

    dist_array[dist_array.length - 2] = custom_distance_1;
    dist_array[dist_array.length - 1] = custom_distance_2;

    update_pace_table();
}

function on_speed_input(is_kph) {
    var kph = parseFloat(kph_cell.value)
    if (isNaN(kph)) { kph = 12.0; }

    var mph = parseFloat(mph_cell.value)
    if (isNaN(mph)) { mph = 7.4565; }

    if (true == is_kph) {
        speed_kph_var = kph;
        mph_cell.value = parseFloat(speed_kph_var * 0.6213712).toFixed(3);
    }
    else {
        speed_kph_var = mph / 0.6213712;
        kph_cell.value = parseFloat(speed_kph_var).toFixed(3);
    }

    var stored_speed = speed_kph_var;
    if (25.0 < stored_speed) { stored_speed = 25.0; }
    if (5.0 > stored_speed) { stored_speed = 5.0; }
    localStorage.setItem('speed_kph', stored_speed);

    coarse_slider.noUiSlider.set(speed_kph_var * 100.0);

    fine_speed_value = 0.0;

    update_pace_table();
}

function on_speed_kph_input() {
    on_speed_input(true);
}

function on_speed_mph_input() {
    on_speed_input(false);
}

coarse_slider.noUiSlider.on('update', on_coarse_slider_input);
fine_slider.noUiSlider.on('update', on_fine_slider_input);
fine_slider.noUiSlider.on('change', on_fine_slider_end);

cd_1_val.onclick   = on_custom_dist_input;
cd_1_val.onselect  = on_custom_dist_input;
cd_1_val.oninput   = on_custom_dist_input;
cd_1_unit.onclick  = on_custom_dist_input;
cd_1_unit.onselect = on_custom_dist_input;
cd_1_unit.oninput  = on_custom_dist_input;
cd_2_val.onclick   = on_custom_dist_input;
cd_2_val.onselect  = on_custom_dist_input;
cd_2_val.oninput   = on_custom_dist_input;
cd_2_unit.onclick  = on_custom_dist_input;
cd_2_unit.onselect = on_custom_dist_input;
cd_2_unit.oninput  = on_custom_dist_input;

kph_cell.onclick   = on_speed_kph_input;
kph_cell.onselect  = on_speed_kph_input;
kph_cell.oninput   = on_speed_kph_input;
mph_cell.onclick   = on_speed_mph_input;
mph_cell.onselect  = on_speed_mph_input;
mph_cell.oninput   = on_speed_mph_input;