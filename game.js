const nbmax = 19;
let plateau = Array.from({ length: nbmax }, () => Array.from({ length: nbmax }, () => ({ occupe: false, valeur: '.' })));
let tour = 0;
let victoire = false;
let symbole = 'o';
let prise_des_o = 0;
let prise_des_x = 0;

function initialisationPlateau() {
    plateau = Array.from({ length: nbmax }, () => Array.from({ length: nbmax }, () => ({ occupe: false, valeur: '.' })));
    tour = 0;
    victoire = false;
    prise_des_o = 0;
    prise_des_x = 0;
    afficherPlateau();
}

function afficherPlateau() {
    const gameBoard = document.getElementById('game-board');
    gameBoard.innerHTML = '';
    for (let i = 0; i < nbmax; i++) {
        for (let j = 0; j < nbmax; j++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.dataset.row = i;
            cell.dataset.col = j;
            if (plateau[i][j].occupe) {
                cell.textContent = plateau[i][j].valeur;
            } else {
                cell.textContent = '.';
            }
            cell.onclick = () => placerPion(i, j);
            gameBoard.appendChild(cell);
        }
    }
}

function placerPion(ligne, colonne) {
    if (plateau[ligne][colonne].occupe || victoire) return;

    plateau[ligne][colonne].valeur = symbole;
    plateau[ligne][colonne].occupe = true;
    if (symbole === 'o') {
        prise_des_o += priseDePions(ligne, colonne, symbole);
        if (prise_des_o >= 10) {
            document.getElementById('message').textContent = 'Les "o" ont gagné par prise !';
            victoire = true;
        }
    } else {
        prise_des_x += priseDePions(ligne, colonne, symbole);
        if (prise_des_x >= 10) {
            document.getElementById('message').textContent = 'Les "x" ont gagné par prise !';
            victoire = true;
        }
    }

    if (tour >= 8 && !victoire) {
        if (alignement(ligne, colonne, symbole)) {
            document.getElementById('message').textContent = `Les ${symbole} ont gagné par alignement !`;
            victoire = true;
        }
    }

    if (!victoire) {
        symbole = symbole === 'o' ? 'x' : 'o';
    }

    tour++;
    afficherPlateau();
}

function priseDePions(ligne, colonne, symbole) {
    let s_adverse = symbole === 'o' ? 'x' : 'o';
    let nb_pions_pris = 0;
    let directions = [
        [1, 0], [-1, 0], // Vertical (bas, haut)
        [0, 1], [0, -1], // Horizontal (droite, gauche)
        [1, 1], [-1, -1], // Diagonale principale (
        [1, -1], [-1, 1]  // Diagonale secondaire (/)
    ];

    for (let [dx, dy] of directions) {
        let x1 = ligne + dx, y1 = colonne + dy;
        let x2 = ligne + 2 * dx, y2 = colonne + 2 * dy;
        let x3 = ligne + 3 * dx, y3 = colonne + 3 * dy;

        if (x3 >= 0 && x3 < nbmax && y3 >= 0 && y3 < nbmax) {
            if (
                plateau[x1][y1].valeur === s_adverse &&
                plateau[x2][y2].valeur === s_adverse &&
                plateau[x3][y3].valeur === symbole
            ) {
                nb_pions_pris += 2;
                plateau[x1][y1].valeur = '.';
                plateau[x1][y1].occupe = false;
                plateau[x2][y2].valeur = '.';
                plateau[x2][y2].occupe = false;
            }
        }
    }
    return nb_pions_pris;
}

function alignement(ligne, colonne, symbole) {
    let directions = [
        [1, 0], [-1, 0], // Vertical (bas, haut)
        [0, 1], [0, -1], // Horizontal (droite, gauche)
        [1, 1], [-1, -1], // Diagonale principale (\)
        [1, -1], [-1, 1]  // Diagonale secondaire (/)
    ];

    for (let [dx, dy] of directions) {
        let nb_align = 1;
        let i = 1;

        // Vérification dans une direction
        while (
            ligne + i * dx >= 0 && ligne + i * dx < nbmax &&
            colonne + i * dy >= 0 && colonne + i * dy < nbmax &&
            plateau[ligne + i * dx][colonne + i * dy].valeur === symbole
        ) {
            nb_align++;
            i++;
        }

        i = 1;
        // Vérification dans l'autre direction
        while (
            ligne - i * dx >= 0 && ligne - i * dx < nbmax &&
            colonne - i * dy >= 0 && colonne - i * dy < nbmax &&
            plateau[ligne - i * dx][colonne - i * dy].valeur === symbole
        ) {
            nb_align++;
            i++;
        }

        if (nb_align >= 5) {
            return true;
        }
    }
    return false;
}


function resetGame() {
    initialisationPlateau();
    document.getElementById('message').textContent = '';
}

initialisationPlateau();
