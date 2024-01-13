const notesColumnIndex = 9;
const partNumberColumnIndex = 6;
const partRequiredForRepairContextIndex = 1;
let table = document.getElementById('partsList');
const tableHeader = table.rows[0];
const tableRowsExcludingHeader = Array.from(table.rows).slice(1);
const partNumberRegex = /\d{11}/;
let partNumber;


chrome.storage.sync.get(['baseUrl'], function(result) {
    const baseUrl = result.baseUrl || 'https://www.fcpeuro.com/Parts/?keywords='; // Default URL if not set
    for (const row of tableRowsExcludingHeader) {
        if (checkIfRowShouldBeSkipped(row)) {
            console.log("skipping row")
            continue;
        }

        partNumber = row.cells[partNumberColumnIndex].querySelector("a").innerText;
        notes = row.cells[notesColumnIndex];
        let link = document.createElement('a');
        link.target = "_blank" // make link open in a new window
        link.href = `${baseUrl}${partNumber}`;
        link.textContent = "Lookup"
        notes.appendChild(link);
    }
});

function checkIfRowShouldBeSkipped(row) {
    const rowIdCell = row.cells[0];
    const rowHasRowNumber = parseInt(rowIdCell.textContent);

    if (rowHasRowNumber)
        return false;
    
    if (row.cells[partNumberColumnIndex]) {
        return false;
    }

    return true;
}