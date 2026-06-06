function highlight(table) {
  for (let i = 0; i < table.rows.length; i++) {
    const row = table.rows[i];
    if (row.cells[3].dataset.available === "true") {
      row.classList.add("available");
    } else if (row.cells[3].dataset.available === "false") {
      row.classList.add("unavailable");
    } else if (row.cells[3].dataset.available == null) {
      row.hidden = true;
    }

    if (row.cells[2].innerText === "m") {
      row.classList.add("male");
    } else if (row.cells[2].innerText === "f") {
      row.classList.add("female");
    }

    if (Number(row.cells[1].innerText) < 18) {
      row.setAttribute("style", "text-decoration: line-through");
    }
  }
}
