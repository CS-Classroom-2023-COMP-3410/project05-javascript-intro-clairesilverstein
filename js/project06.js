// Full list of 118 elements, with approximate group and period assignments.
// Lanthanides (57–71) and actinides (89–103) are placed under "group: 3" in periods 6 and 7.
const elementsData = [
  { atomicNumber: 1,  symbol: "H",   name: "Hydrogen",       group: 1,  period: 1 },
  { atomicNumber: 2,  symbol: "He",  name: "Helium",         group: 18, period: 1 },
  { atomicNumber: 3,  symbol: "Li",  name: "Lithium",        group: 1,  period: 2 },
  { atomicNumber: 4,  symbol: "Be",  name: "Beryllium",      group: 2,  period: 2 },
  { atomicNumber: 5,  symbol: "B",   name: "Boron",          group: 13, period: 2 },
  { atomicNumber: 6,  symbol: "C",   name: "Carbon",         group: 14, period: 2 },
  { atomicNumber: 7,  symbol: "N",   name: "Nitrogen",       group: 15, period: 2 },
  { atomicNumber: 8,  symbol: "O",   name: "Oxygen",         group: 16, period: 2 },
  { atomicNumber: 9,  symbol: "F",   name: "Fluorine",       group: 17, period: 2 },
  { atomicNumber: 10, symbol: "Ne",  name: "Neon",           group: 18, period: 2 },
  { atomicNumber: 11, symbol: "Na",  name: "Sodium",         group: 1,  period: 3 },
  { atomicNumber: 12, symbol: "Mg",  name: "Magnesium",      group: 2,  period: 3 },
  { atomicNumber: 13, symbol: "Al",  name: "Aluminium",      group: 13, period: 3 },
  { atomicNumber: 14, symbol: "Si",  name: "Silicon",        group: 14, period: 3 },
  { atomicNumber: 15, symbol: "P",   name: "Phosphorus",     group: 15, period: 3 },
  { atomicNumber: 16, symbol: "S",   name: "Sulfur",         group: 16, period: 3 },
  { atomicNumber: 17, symbol: "Cl",  name: "Chlorine",       group: 17, period: 3 },
  { atomicNumber: 18, symbol: "Ar",  name: "Argon",          group: 18, period: 3 },
  { atomicNumber: 19, symbol: "K",   name: "Potassium",      group: 1,  period: 4 },
  { atomicNumber: 20, symbol: "Ca",  name: "Calcium",        group: 2,  period: 4 },
  { atomicNumber: 21, symbol: "Sc",  name: "Scandium",       group: 3,  period: 4 },
  { atomicNumber: 22, symbol: "Ti",  name: "Titanium",       group: 4,  period: 4 },
  { atomicNumber: 23, symbol: "V",   name: "Vanadium",       group: 5,  period: 4 },
  { atomicNumber: 24, symbol: "Cr",  name: "Chromium",       group: 6,  period: 4 },
  { atomicNumber: 25, symbol: "Mn",  name: "Manganese",      group: 7,  period: 4 },
  { atomicNumber: 26, symbol: "Fe",  name: "Iron",           group: 8,  period: 4 },
  { atomicNumber: 27, symbol: "Co",  name: "Cobalt",         group: 9,  period: 4 },
  { atomicNumber: 28, symbol: "Ni",  name: "Nickel",         group: 10, period: 4 },
  { atomicNumber: 29, symbol: "Cu",  name: "Copper",         group: 11, period: 4 },
  { atomicNumber: 30, symbol: "Zn",  name: "Zinc",           group: 12, period: 4 },
  { atomicNumber: 31, symbol: "Ga",  name: "Gallium",        group: 13, period: 4 },
  { atomicNumber: 32, symbol: "Ge",  name: "Germanium",      group: 14, period: 4 },
  { atomicNumber: 33, symbol: "As",  name: "Arsenic",        group: 15, period: 4 },
  { atomicNumber: 34, symbol: "Se",  name: "Selenium",       group: 16, period: 4 },
  { atomicNumber: 35, symbol: "Br",  name: "Bromine",        group: 17, period: 4 },
  { atomicNumber: 36, symbol: "Kr",  name: "Krypton",        group: 18, period: 4 },
  { atomicNumber: 37, symbol: "Rb",  name: "Rubidium",       group: 1,  period: 5 },
  { atomicNumber: 38, symbol: "Sr",  name: "Strontium",      group: 2,  period: 5 },
  { atomicNumber: 39, symbol: "Y",   name: "Yttrium",        group: 3,  period: 5 },
  { atomicNumber: 40, symbol: "Zr",  name: "Zirconium",      group: 4,  period: 5 },
  { atomicNumber: 41, symbol: "Nb",  name: "Niobium",        group: 5,  period: 5 },
  { atomicNumber: 42, symbol: "Mo",  name: "Molybdenum",     group: 6,  period: 5 },
  { atomicNumber: 43, symbol: "Tc",  name: "Technetium",     group: 7,  period: 5 },
  { atomicNumber: 44, symbol: "Ru",  name: "Ruthenium",      group: 8,  period: 5 },
  { atomicNumber: 45, symbol: "Rh",  name: "Rhodium",        group: 9,  period: 5 },
  { atomicNumber: 46, symbol: "Pd",  name: "Palladium",      group: 10, period: 5 },
  { atomicNumber: 47, symbol: "Ag",  name: "Silver",         group: 11, period: 5 },
  { atomicNumber: 48, symbol: "Cd",  name: "Cadmium",        group: 12, period: 5 },
  { atomicNumber: 49, symbol: "In",  name: "Indium",         group: 13, period: 5 },
  { atomicNumber: 50, symbol: "Sn",  name: "Tin",            group: 14, period: 5 },
  { atomicNumber: 51, symbol: "Sb",  name: "Antimony",       group: 15, period: 5 },
  { atomicNumber: 52, symbol: "Te",  name: "Tellurium",      group: 16, period: 5 },
  { atomicNumber: 53, symbol: "I",   name: "Iodine",         group: 17, period: 5 },
  { atomicNumber: 54, symbol: "Xe",  name: "Xenon",          group: 18, period: 5 },
  { atomicNumber: 55, symbol: "Cs",  name: "Cesium",         group: 1,  period: 6 },
  { atomicNumber: 56, symbol: "Ba",  name: "Barium",         group: 2,  period: 6 },
  { atomicNumber: 57, symbol: "La",  name: "Lanthanum",      group: 3,  period: 6 },
  { atomicNumber: 58, symbol: "Ce",  name: "Cerium",         group: 3,  period: 6 },
  { atomicNumber: 59, symbol: "Pr",  name: "Praseodymium",   group: 3,  period: 6 },
  { atomicNumber: 60, symbol: "Nd",  name: "Neodymium",      group: 3,  period: 6 },
  { atomicNumber: 61, symbol: "Pm",  name: "Promethium",     group: 3,  period: 6 },
  { atomicNumber: 62, symbol: "Sm",  name: "Samarium",       group: 3,  period: 6 },
  { atomicNumber: 63, symbol: "Eu",  name: "Europium",       group: 3,  period: 6 },
  { atomicNumber: 64, symbol: "Gd",  name: "Gadolinium",     group: 3,  period: 6 },
  { atomicNumber: 65, symbol: "Tb",  name: "Terbium",        group: 3,  period: 6 },
  { atomicNumber: 66, symbol: "Dy",  name: "Dysprosium",     group: 3,  period: 6 },
  { atomicNumber: 67, symbol: "Ho",  name: "Holmium",        group: 3,  period: 6 },
  { atomicNumber: 68, symbol: "Er",  name: "Erbium",         group: 3,  period: 6 },
  { atomicNumber: 69, symbol: "Tm",  name: "Thulium",        group: 3,  period: 6 },
  { atomicNumber: 70, symbol: "Yb",  name: "Ytterbium",      group: 3,  period: 6 },
  { atomicNumber: 71, symbol: "Lu",  name: "Lutetium",       group: 3,  period: 6 },
  { atomicNumber: 72, symbol: "Hf",  name: "Hafnium",        group: 4,  period: 6 },
  { atomicNumber: 73, symbol: "Ta",  name: "Tantalum",       group: 5,  period: 6 },
  { atomicNumber: 74, symbol: "W",   name: "Tungsten",       group: 6,  period: 6 },
  { atomicNumber: 75, symbol: "Re",  name: "Rhenium",        group: 7,  period: 6 },
  { atomicNumber: 76, symbol: "Os",  name: "Osmium",         group: 8,  period: 6 },
  { atomicNumber: 77, symbol: "Ir",  name: "Iridium",        group: 9,  period: 6 },
  { atomicNumber: 78, symbol: "Pt",  name: "Platinum",       group: 10, period: 6 },
  { atomicNumber: 79, symbol: "Au",  name: "Gold",           group: 11, period: 6 },
  { atomicNumber: 80, symbol: "Hg",  name: "Mercury",        group: 12, period: 6 },
  { atomicNumber: 81, symbol: "Tl",  name: "Thallium",       group: 13, period: 6 },
  { atomicNumber: 82, symbol: "Pb",  name: "Lead",           group: 14, period: 6 },
  { atomicNumber: 83, symbol: "Bi",  name: "Bismuth",        group: 15, period: 6 },
  { atomicNumber: 84, symbol: "Po",  name: "Polonium",       group: 16, period: 6 },
  { atomicNumber: 85, symbol: "At",  name: "Astatine",       group: 17, period: 6 },
  { atomicNumber: 86, symbol: "Rn",  name: "Radon",          group: 18, period: 6 },
  { atomicNumber: 87, symbol: "Fr",  name: "Francium",       group: 1,  period: 7 },
  { atomicNumber: 88, symbol: "Ra",  name: "Radium",         group: 2,  period: 7 },
  { atomicNumber: 89, symbol: "Ac",  name: "Actinium",       group: 3,  period: 7 },
  { atomicNumber: 90, symbol: "Th",  name: "Thorium",        group: 3,  period: 7 },
  { atomicNumber: 91, symbol: "Pa",  name: "Protactinium",   group: 3,  period: 7 },
  { atomicNumber: 92, symbol: "U",   name: "Uranium",        group: 3,  period: 7 },
  { atomicNumber: 93, symbol: "Np",  name: "Neptunium",      group: 3,  period: 7 },
  { atomicNumber: 94, symbol: "Pu",  name: "Plutonium",      group: 3,  period: 7 },
  { atomicNumber: 95, symbol: "Am",  name: "Americium",      group: 3,  period: 7 },
  { atomicNumber: 96, symbol: "Cm",  name: "Curium",         group: 3,  period: 7 },
  { atomicNumber: 97, symbol: "Bk",  name: "Berkelium",      group: 3,  period: 7 },
  { atomicNumber: 98, symbol: "Cf",  name: "Californium",    group: 3,  period: 7 },
  { atomicNumber: 99, symbol: "Es",  name: "Einsteinium",    group: 3,  period: 7 },
  { atomicNumber: 100, symbol: "Fm", name: "Fermium",        group: 3,  period: 7 },
  { atomicNumber: 101, symbol: "Md", name: "Mendelevium",    group: 3,  period: 7 },
  { atomicNumber: 102, symbol: "No", name: "Nobelium",       group: 3,  period: 7 },
  { atomicNumber: 103, symbol: "Lr", name: "Lawrencium",     group: 3,  period: 7 },
  { atomicNumber: 104, symbol: "Rf", name: "Rutherfordium",  group: 4,  period: 7 },
  { atomicNumber: 105, symbol: "Db", name: "Dubnium",        group: 5,  period: 7 },
  { atomicNumber: 106, symbol: "Sg", name: "Seaborgium",     group: 6,  period: 7 },
  { atomicNumber: 107, symbol: "Bh", name: "Bohrium",        group: 7,  period: 7 },
  { atomicNumber: 108, symbol: "Hs", name: "Hassium",        group: 8,  period: 7 },
  { atomicNumber: 109, symbol: "Mt", name: "Meitnerium",     group: 9,  period: 7 },
  { atomicNumber: 110, symbol: "Ds", name: "Darmstadtium",   group: 10, period: 7 },
  { atomicNumber: 111, symbol: "Rg", name: "Roentgenium",    group: 11, period: 7 },
  { atomicNumber: 112, symbol: "Cn", name: "Copernicium",    group: 12, period: 7 },
  { atomicNumber: 113, symbol: "Nh", name: "Nihonium",       group: 13, period: 7 },
  { atomicNumber: 114, symbol: "Fl", name: "Flerovium",      group: 14, period: 7 },
  { atomicNumber: 115, symbol: "Mc", name: "Moscovium",      group: 15, period: 7 },
  { atomicNumber: 116, symbol: "Lv", name: "Livermorium",    group: 16, period: 7 },
  { atomicNumber: 117, symbol: "Ts", name: "Tennessine",     group: 17, period: 7 },
  { atomicNumber: 118, symbol: "Og", name: "Oganesson",      group: 18, period: 7 },
];

/**
 * Dynamically create the periodic table grid.
 * Positions each element at (grid-row = period, grid-column = group).
 */
function generateTable() {
  const periodicTable = document.getElementById("periodicTable");

  elementsData.forEach((element) => {
    // Create a div for each element
    const cell = document.createElement("div");
    cell.classList.add("element-cell");

    // Position in the grid:
    // row = element.period, column = element.group
    cell.style.gridRow = element.period;
    cell.style.gridColumn = element.group;

    // Content for the cell
    const atomicNumberEl = document.createElement("div");
    atomicNumberEl.classList.add("atomic-number");
    atomicNumberEl.textContent = element.atomicNumber;

    const symbolEl = document.createElement("div");
    symbolEl.classList.add("symbol");
    symbolEl.textContent = element.symbol;

    cell.appendChild(atomicNumberEl);
    cell.appendChild(symbolEl);

    // On click, display detailed info & highlight
    cell.addEventListener("click", () => {
      displayElementInfo(element);
      highlightElementAndGroup(element);
    });

    periodicTable.appendChild(cell);
  });
}

/**
 * Display detailed info for the selected element.
 */
function displayElementInfo(element) {
  const infoDiv = document.getElementById("elementInfo");
  infoDiv.innerHTML = `
    <strong>Atomic Number:</strong> ${element.atomicNumber} &nbsp;|&nbsp;
    <strong>Symbol:</strong> ${element.symbol} &nbsp;|&nbsp;
    <strong>Name:</strong> ${element.name} &nbsp;|&nbsp;
    <strong>Group:</strong> ${element.group} &nbsp;|&nbsp;
    <strong>Period:</strong> ${element.period}
  `;
}

/**
 * Highlight the selected element and any elements in the same group.
 */
function highlightElementAndGroup(selectedElement) {
  const cells = document.querySelectorAll(".element-cell");
  
  // Remove previous highlights
  cells.forEach((cell) => {
    cell.classList.remove("selected", "same-group");
  });

  // Re-apply highlights
  cells.forEach((cell, index) => {
    const data = elementsData[index];
    if (data.atomicNumber === selectedElement.atomicNumber) {
      // The clicked element
      cell.classList.add("selected");
    } else if (data.group === selectedElement.group) {
      // Same group
      cell.classList.add("same-group");
    }
  });
}

/**
 * Handle searching by atomic number, name, or symbol.
 */
function searchElement() {
  const query = document.getElementById("search").value.trim().toLowerCase();
  if (!query) return;

  let foundElement = null;

  // If it's numeric, compare with atomicNumber; otherwise compare name or symbol
  if (!isNaN(query)) {
    const atomicNum = parseInt(query, 10);
    foundElement = elementsData.find((el) => el.atomicNumber === atomicNum);
  } else {
    foundElement = elementsData.find(
      (el) =>
        el.name.toLowerCase() === query ||
        el.symbol.toLowerCase() === query
    );
  }

  if (foundElement) {
    displayElementInfo(foundElement);
    highlightElementAndGroup(foundElement);
    // Optionally scroll or focus the element cell...
  } else {
    document.getElementById("elementInfo").textContent = "No match found.";
    const cells = document.querySelectorAll(".element-cell");
    cells.forEach((cell) => {
      cell.classList.remove("selected", "same-group");
    });
  }
}

// Initialize
window.addEventListener("DOMContentLoaded", () => {
  generateTable();

  // Search button
  document.getElementById("searchBtn").addEventListener("click", searchElement);

  // Search on ENTER key as well
  document.getElementById("search").addEventListener("keyup", (e) => {
    if (e.key === "Enter") {
      searchElement();
    }
  });
});
