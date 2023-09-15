const table = document.getElementById('paceTable');

// Find the maximum cell height in each row
for (let i = 0; i < table.rows.length; i++) {
    let maxHeight = 0;
    for (let j = 0; j < table.rows[i].cells.length; j++) {
        const cellHeight = table.rows[i].cells[j].offsetHeight;
        if (cellHeight > maxHeight) {
            maxHeight = cellHeight;
        }
    }

    // Set the height of all cells in the row to the maximum height
    for (let j = 0; j < table.rows[i].cells.length; j++) {
        table.rows[i].cells[j].style.height = maxHeight + 'px';
    }
}