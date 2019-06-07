const board = [[], [], [], [], [], [], [], []];
var boardElement;
var g;
var shownPiece = null;
const shownLocations= [];
var material = 0;

window.addEventListener('load', (e) => {
    boardElement = document.getElementById('board');
    g = document.getElementById('g');
    for (let i = 1; i < 8; i++)
    {
        let line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line.setAttribute('x1', i * 50);
        line.setAttribute('y1', 0);
        line.setAttribute('x2', i * 50);
        line.setAttribute('y2', 400);
        line.setAttribute('style', 'stroke:black;stroke-width:1');
        g.appendChild(line);
    }
    for (let i = 1; i < 8; i++)
    {
        let line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line.setAttribute('x1', 0);
        line.setAttribute('y1', i * 50);
        line.setAttribute('x2', 400);
        line.setAttribute('y2', i * 50);
        line.setAttribute('style', 'stroke:black;stroke-width:1');
        g.appendChild(line);
    }
    init();
    board.forEach((arr) => {
        arr.forEach((piece) => {
            if (piece !== null)
            {
                piece.addEventListener('click', (e) => {
                    let x = Number(e.toElement.getAttribute('x'));
                    let y = Number(e.toElement.getAttribute('y'));
                    let elementName = e.toElement.getAttribute('href');
                    let name = elementName.slice(0, elementName.length - 4).toLowerCase();
                    let piece = name.split('_')[0];
                    let color = name.split('_')[1];
                    for (let i = 0; i < shownLocations.length;)
                    {
                        g.removeChild(shownLocations.shift());
                    }
                    shownPiece = e.toElement;
                    showPlaces(x, y, piece, color);
                });
            }
        });
    });
});

document.addEventListener('click', (e) => {
    if (e.target === document.body || e.target === boardElement)
    {
        shownPiece = null;
        for (let i = 0; i < shownLocations.length;)
        {
            g.removeChild(shownLocations.shift());
        }
    }
});

function showPlaces(x, y, piece, color)
{
    let up = (color === 'white');
    switch (piece)
    {
        case ('pawn'):
            showPawn(x, y, up);
            break;
        case ('knight'):
            showKnight(x, y, color);
            break;
        case ('rook'):
            showRook(x/50, y/50);
            break;
        case ('bishop'):
            showBishop(x/50, y/50);
            break;
        case ('queen'):
            showRook(x/50, y/50);
            showBishop(x/50, y/50);
            break;
        
    }
}

function showPawn(x, y, up)
{
    if (board[up ? y/50 - 1 : y/50 + 1][x/50] === null)
    {
        let moveLocation = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        moveLocation.setAttribute('cx', x + 25);
        moveLocation.setAttribute('cy', 25 + (up ? y - 50 : y + 50));
        moveLocation.setAttribute('r', 10);
        moveLocation.setAttribute('class', 'moveLocation');
        moveLocation.setAttribute('onclick', '"event.stopPropogation()"');
        moveLocation.addEventListener('click', (e) => {
            shownPiece.setAttribute('x', moveLocation.getAttribute('cx') - 25);
            shownPiece.setAttribute('y', moveLocation.getAttribute('cy') - 25);
            for (let i = 0; i < shownLocations.length;)
            {
                g.removeChild(shownLocations.shift());
            }
            board[up ? y/50 - 1 : y/50 + 1][x/50] = board[y/50][x/50];
            board[y/50][x/50] = null;
        });
        g.appendChild(moveLocation);
        shownLocations.push(moveLocation);
        if (board[up ? y/50 - 2 : y/50 + 2][x/50] === null && y/50 === (up ? 6 : 1))
        {
            let moveLocation2 = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            moveLocation2.setAttribute('cx', x + 25);
            moveLocation2.setAttribute('cy', 25 + (up ? y - 100 : y + 100));
            moveLocation2.setAttribute('r', 10);
            moveLocation2.setAttribute('class', 'moveLocation');
            moveLocation2.setAttribute('onclick', '"event.stopPropogation()"');
            moveLocation2.addEventListener('click', (e) => {
                shownPiece.setAttribute('x', moveLocation2.getAttribute('cx') - 25);
                shownPiece.setAttribute('y', moveLocation2.getAttribute('cy') - 25);
                for (let i = 0; i < shownLocations.length;)
                {
                    g.removeChild(shownLocations.shift());
                }
                board[up ? y/50 - 2 : y/50 + 2][x/50] = board[y/50][x/50];
                board[up ? y/50 - 1 : y/50 + 1][x/50] = board[y/50][x/50];
                board[y/50][x/50] = null;
            });
            g.appendChild(moveLocation2);
            shownLocations.push(moveLocation2);
        }
    }
    if (board[up ? y/50 -1 : y/50 + 1][x/50 + 1] !== null)
    {
        let moveLocation = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        moveLocation.setAttribute('cx', x + 75);
        moveLocation.setAttribute('cy', 25 + (up ? y - 50 : y + 50));
        moveLocation.setAttribute('r', 10);
        moveLocation.setAttribute('class', 'moveLocation');
        moveLocation.setAttribute('onclick', '"event.stopPropogation()"');
        moveLocation.addEventListener('click', (e) => {
            shownPiece.setAttribute('x', moveLocation.getAttribute('cx') - 25);
            shownPiece.setAttribute('y', moveLocation.getAttribute('cy') - 25);
            for (let i = 0; i < shownLocations.length;)
            {
                g.removeChild(shownLocations.shift());
            }
            removeLocation = board[up ? y/50 - 1 : y/50 + 1][x/50 + 1];
            g.removeChild(removeLocation);
            if (board[up ? y/50 - 2 : y/50 + 2][x/50 + 1] === removeLocation)
            {
                board[up ? y/50 - 2 : y/50 + 2][x/50 + 1] = null;
            }
            board[up ? y/50 - 1 : y/50 + 1][x/50 + 1] = null;
            board[up ? y/50 - 2 : y/50 + 2][x/50 - 1] = null;
            board[up ? y/50 - 1 : y/50 + 1][x/50 + 1] = board[y/50][x/50];
            board[y/50][x/50] = null;
            document.getElementById('materialcounter').textContent  = 'Material: ' + ++material;
        });
        g.appendChild(moveLocation);
        shownLocations.push(moveLocation);
    }
    if (board[up ? y/50 -1 : y/50 + 1][x/50 - 1] !== null)
    {
        let moveLocation = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        moveLocation.setAttribute('cx', x - 25);
        moveLocation.setAttribute('cy', 25 + (up ? y - 50 : y + 50));
        moveLocation.setAttribute('r', 10);
        moveLocation.setAttribute('class', 'moveLocation');
        moveLocation.setAttribute('onclick', '"event.stopPropogation()"');
        moveLocation.addEventListener('click', (e) => {
            shownPiece.setAttribute('x', moveLocation.getAttribute('cx') - 25);
            shownPiece.setAttribute('y', moveLocation.getAttribute('cy') - 25);
            for (let i = 0; i < shownLocations.length;)
            {
                g.removeChild(shownLocations.shift());
            }
            g.removeChild(board[up ? y/50 - 1 : y/50 + 1][x/50 - 1]);
            board[up ? y/50 - 1 : y/50 + 1][x/50 - 1] = null;
            board[up ? y/50 - 2 : y/50 + 2][x/50 - 1] = null;
            board[up ? y/50 - 1 : y/50 + 1][x/50 - 1] = board[y/50][x/50];
            board[y/50][x/50] = null;
            document.getElementById('materialcounter').textContent  = 'Material: ' + ++material;
        });
        g.appendChild(moveLocation);
        shownLocations.push(moveLocation);
    }
}

function showKnight(x, y, color)
{
    if ((y <= 250 && x <=300) && (board[y/50 + 2][x/50 + 1] === null || getColor(board[y/50 + 2][x/50 + 1]) !== color))
    {
        let moveLocation = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        moveLocation.setAttribute('cx', x + 75);
        moveLocation.setAttribute('cy', y + 125);
        moveLocation.setAttribute('r', 10);
        moveLocation.setAttribute('class', 'moveLocation');
        moveLocation.setAttribute('onclick', '"event.stopPropagation()"');
        moveLocation.addEventListener('click', (e) => {
            shownPiece.setAttribute('x', moveLocation.getAttribute('cx') - 25);
            shownPiece.setAttribute('y', moveLocation.getAttribute('cy') - 25);
            for (let i = 0; i < shownLocations.length;)
            {
                g.removeChild(shownLocations.shift());
            }
            if (board[y/50 + 2][x/50 + 1] !== null)
            {
                g.removeChild(board[y/50 + 2][x/50 + 1]);
                board[y/50 + 2][x/50 + 1] = null;
            }
            board[y/50 + 2][x/50 + 1] = board[y/50][x/50];
            board[y/50][x/50] = null;
        });
        g.appendChild(moveLocation);
        shownLocations.push(moveLocation);
    }
    if ((y >= 100 && x >= 50) && (board[y/50 - 2][x/50 - 1] === null || getColor(board[y/50 - 2][x/50 - 1]) !== color))
    {
        let moveLocation = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        moveLocation.setAttribute('cx', x - 25);
        moveLocation.setAttribute('cy', y - 75);
        moveLocation.setAttribute('r', 10);
        moveLocation.setAttribute('class', 'moveLocation');
        moveLocation.setAttribute('onclick', '"event.stopPropogation()"');
        moveLocation.addEventListener('click', (e) => {
            shownPiece.setAttribute('x', moveLocation.getAttribute('cx') - 25);
            shownPiece.setAttribute('y', moveLocation.getAttribute('cy') - 25);
            for (let i = 0; i < shownLocations.length;)
            {
                g.removeChild(shownLocations.shift());
            }
            if (board[y/50 - 2][x/50 - 1] !== null)
            {
                g.removeChild(board[y/50 - 2][x/50 - 1]);
                board[y/50 - 2][x/50 - 1] = null;
            }
            board[y/50 - 2][x/50 - 1] = board[y/50][x/50];
            board[y/50][x/50] = null;
        });
        g.appendChild(moveLocation);
        shownLocations.push(moveLocation);
    }
    if ((y <= 250 && x >= 50) && (board[y/50 + 2][x/50 - 1] === null || getColor(board[y/50 + 2][x/50 - 1]) !== color))
    {
        let moveLocation = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        moveLocation.setAttribute('cx', x - 25);
        moveLocation.setAttribute('cy', y + 125);
        moveLocation.setAttribute('r', 10);
        moveLocation.setAttribute('class', 'moveLocation');
        moveLocation.setAttribute('onclick', '"event.stopPropagation()"');
        moveLocation.addEventListener('click', (e) => {
            shownPiece.setAttribute('x', moveLocation.getAttribute('cx') - 25);
            shownPiece.setAttribute('y', moveLocation.getAttribute('cy') - 25);
            for (let i = 0; i < shownLocations.length;)
            {
                g.removeChild(shownLocations.shift());
            }
            if (board[y/50 + 2][x/50 - 1] !== null)
            {
                g.removeChild(board[y/50 + 2][x/50 - 1]);
                board[y/50 + 2][x/50 - 1] = null;
            }
            board[y/50 + 2][x/50 - 1] = board[y/50][x/50];
            board[y/50][x/50] = null;
        });
        g.appendChild(moveLocation);
        shownLocations.push(moveLocation);
    }
    if ((y >= 100 && x <= 300) && (board[y/50 - 2][x/50 + 1] === null || getColor(board[y/50 - 2][x/50 + 1]) !== color))
    {
        let moveLocation = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        moveLocation.setAttribute('cx', x + 75);
        moveLocation.setAttribute('cy', y - 75);
        moveLocation.setAttribute('r', 10);
        moveLocation.setAttribute('class', 'moveLocation');
        moveLocation.setAttribute('onclick', '"event.stopPropogation()"');
        moveLocation.addEventListener('click', (e) => {
            shownPiece.setAttribute('x', moveLocation.getAttribute('cx') - 25);
            shownPiece.setAttribute('y', moveLocation.getAttribute('cy') - 25);
            for (let i = 0; i < shownLocations.length;)
            {
                g.removeChild(shownLocations.shift());
            }
            if (board[y/50 - 2][x/50 + 1] !== null)
            {
                g.removeChild(board[y/50 - 2][x/50 + 1]);
                board[y/50 - 2][x/50 + 1] = null;
            }
            board[y/50 - 2][x/50 + 1] = board[y/50][x/50];
            board[y/50][x/50] = null;
        });
        g.appendChild(moveLocation);
        shownLocations.push(moveLocation);
    }
    if ((y <= 300 && x <=250) && (board[y/50 + 1][x/50 + 2] === null || getColor(board[y/50 + 1][x/50 + 2]) !== color))
    {
        let moveLocation = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        moveLocation.setAttribute('cx', x + 125);
        moveLocation.setAttribute('cy', y + 75);
        moveLocation.setAttribute('r', 10);
        moveLocation.setAttribute('class', 'moveLocation');
        moveLocation.setAttribute('onclick', '"event.stopPropagation()"');
        moveLocation.addEventListener('click', (e) => {
            shownPiece.setAttribute('x', moveLocation.getAttribute('cx') - 25);
            shownPiece.setAttribute('y', moveLocation.getAttribute('cy') - 25);
            for (let i = 0; i < shownLocations.length;)
            {
                g.removeChild(shownLocations.shift());
            }
            if (board[y/50 + 1][x/50 + 2] !== null)
            {
                g.removeChild(board[y/50 + 1][x/50 + 2]);
                board[y/50 + 1][x/50 + 2] = null;
            }
            board[y/50 + 1][x/50 + 2] = board[y/50][x/50];
            board[y/50][x/50] = null;
        });
        g.appendChild(moveLocation);
        shownLocations.push(moveLocation);
    }
    if ((y >= 50 && x >= 100) && (board[y/50 - 1][x/50 - 2] === null || getColor(board[y/50 - 1][x/50 - 2]) !== color))
    {
        let moveLocation = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        moveLocation.setAttribute('cx', x - 75);
        moveLocation.setAttribute('cy', y - 25);
        moveLocation.setAttribute('r', 10);
        moveLocation.setAttribute('class', 'moveLocation');
        moveLocation.setAttribute('onclick', '"event.stopPropogation()"');
        moveLocation.addEventListener('click', (e) => {
            shownPiece.setAttribute('x', moveLocation.getAttribute('cx') - 25);
            shownPiece.setAttribute('y', moveLocation.getAttribute('cy') - 25);
            for (let i = 0; i < shownLocations.length;)
            {
                g.removeChild(shownLocations.shift());
            }
            if (board[y/50 - 1][x/50 - 2] !== null)
            {
                g.removeChild(board[y/50 - 1][x/50 - 2]);
                board[y/50 - 1][x/50 - 2] = null;
            }
            board[y/50 - 1][x/50 - 2] = board[y/50][x/50];
            board[y/50][x/50] = null;
        });
        g.appendChild(moveLocation);
        shownLocations.push(moveLocation);
    }
    if ((y >= 50 && x <= 250) && (board[y/50 - 1][x/50 + 2] === null || getColor(board[y/50 - 1][x/50 + 2]) !== color))
    {
        let moveLocation = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        moveLocation.setAttribute('cx', x + 125);
        moveLocation.setAttribute('cy', y - 25);
        moveLocation.setAttribute('r', 10);
        moveLocation.setAttribute('class', 'moveLocation');
        moveLocation.setAttribute('onclick', '"event.stopPropagation()"');
        moveLocation.addEventListener('click', (e) => {
            shownPiece.setAttribute('x', moveLocation.getAttribute('cx') - 25);
            shownPiece.setAttribute('y', moveLocation.getAttribute('cy') - 25);
            for (let i = 0; i < shownLocations.length;)
            {
                g.removeChild(shownLocations.shift());
            }
            if (board[y/50 - 1][x/50 + 2] !== null)
            {
                g.removeChild(board[y/50 - 1][x/50 + 2]);
                board[y/50 - 1][x/50 + 2] = null;
            }
            board[y/50 - 1][x/50 + 2] = board[y/50][x/50];
            board[y/50][x/50] = null;
        });
        g.appendChild(moveLocation);
        shownLocations.push(moveLocation);
    }
    if ((y <= 300 && x >= 100) && (board[y/50 + 1][x/50 - 2] === null || getColor(board[y/50 + 1][x/50 - 2]) !== color))
    {
        let moveLocation = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        moveLocation.setAttribute('cx', x - 75);
        moveLocation.setAttribute('cy', y + 75);
        moveLocation.setAttribute('r', 10);
        moveLocation.setAttribute('class', 'moveLocation');
        moveLocation.setAttribute('onclick', '"event.stopPropogation()"');
        moveLocation.addEventListener('click', (e) => {
            shownPiece.setAttribute('x', moveLocation.getAttribute('cx') - 25);
            shownPiece.setAttribute('y', moveLocation.getAttribute('cy') - 25);
            for (let i = 0; i < shownLocations.length;)
            {
                g.removeChild(shownLocations.shift());
            }
            if (board[y/50 + 1][x/50 - 2] !== null)
            {
                g.removeChild(board[y/50 + 1][x/50 - 2]);
                board[y/50 + 1][x/50 - 2] = null;
            }
            board[y/50 + 1][x/50 - 2] = board[y/50][x/50];
            board[y/50][x/50] = null;
        });
        g.appendChild(moveLocation);
        shownLocations.push(moveLocation);
    }
}

function showRook(x, y)
{
    for (let i = x + 1; i < 7; i++)
    {
        if (board[y][i] !== null)
        {
            break;
        }
        let moveLocation = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        moveLocation.setAttribute('cx', i * 50 + 25);
        moveLocation.setAttribute('cy', 25 + y * 50);
        moveLocation.setAttribute('r', 10);
        moveLocation.setAttribute('class', 'moveLocation');
        moveLocation.setAttribute('onclick', '"event.stopPropogation()"');
        g.appendChild(moveLocation);
        shownLocations.push(moveLocation);
    }
    for (let i = x - 1; i >= 0; i--)
    {
        if (board[y][i] !== null)
        {
            break;
        }
        let moveLocation = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        moveLocation.setAttribute('cx', i * 50 + 25);
        moveLocation.setAttribute('cy', 25 + y * 50);
        moveLocation.setAttribute('r', 10);
        moveLocation.setAttribute('class', 'moveLocation');
        moveLocation.setAttribute('onclick', '"event.stopPropogation()"');
        g.appendChild(moveLocation);
        shownLocations.push(moveLocation);
    }
    for (let i = y + 1; i < 7; i++)
    {
        if (board[i][x] !== null)
        {
            break;
        }
        let moveLocation = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        moveLocation.setAttribute('cx', x * 50 + 25);
        moveLocation.setAttribute('cy', 25 + i * 50);
        moveLocation.setAttribute('r', 10);
        moveLocation.setAttribute('class', 'moveLocation');
        moveLocation.setAttribute('onclick', '"event.stopPropogation()"');
        g.appendChild(moveLocation);
        shownLocations.push(moveLocation);
    }
    for (let i = y - 1; i >= 0; i--)
    {
        if (board[i][x] !== null)
        {
            break;
        }
        let moveLocation = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        moveLocation.setAttribute('cx', x * 50 + 25);
        moveLocation.setAttribute('cy', 25 + i * 50);
        moveLocation.setAttribute('r', 10);
        moveLocation.setAttribute('class', 'moveLocation');
        moveLocation.setAttribute('onclick', '"event.stopPropogation()"');
        g.appendChild(moveLocation);
        shownLocations.push(moveLocation);
    }
}

function showBishop(x, y)
{

}

function getColor(piece)
{
    return piece.getAttribute('href').slice(0, piece.getAttribute('href').length - 4).toLowerCase().split('_')[1];
}

function init()
{
    for (let i = 0; i < 8; i++)
    {
        let whitePiece = document.createElementNS('http://www.w3.org/2000/svg', 'image');
        whitePiece.setAttribute('href', 'Pawn_White.png');
        whitePiece.setAttribute('x', 50 * i);
        whitePiece.setAttribute('y', 300);
        whitePiece.setAttribute('width', 50);
        whitePiece.setAttribute('height', 50);
        whitePiece.setAttribute('onclick', '"event.stopPropogation()"');
        g.appendChild(whitePiece);
        let blackPiece = document.createElementNS('http://www.w3.org/2000/svg', 'image');
        blackPiece.setAttribute('href', 'Pawn_Black.png');
        blackPiece.setAttribute('x', 50 * i);
        blackPiece.setAttribute('y', 50);
        blackPiece.setAttribute('width', 50);
        blackPiece.setAttribute('height', 50);
        blackPiece.setAttribute('onclick', '"event.stopPropogation()"');
        g.appendChild(blackPiece);
        board[1][i] = blackPiece;
        board[6][i] = whitePiece;
    }
    for (let i = 0; i < 8; i++)
    {
        board[2][i] = null;
        board[3][i] = null;
        board[4][i] = null;
        board[5][i] = null;
    }
    let whitePiece = document.createElementNS('http://www.w3.org/2000/svg', 'image');
    whitePiece.setAttribute('href', 'Rook_White.png');
    whitePiece.setAttribute('x', 0);
    whitePiece.setAttribute('y', 350);
    whitePiece.setAttribute('width', 50);
    whitePiece.setAttribute('height', 50);
    whitePiece.setAttribute('onclick', '"event.stopPropogation()"');
    g.appendChild(whitePiece);
    let blackPiece = document.createElementNS('http://www.w3.org/2000/svg', 'image');
    blackPiece.setAttribute('href', 'Rook_Black.png');
    blackPiece.setAttribute('x', 0);
    blackPiece.setAttribute('y', 0);
    blackPiece.setAttribute('width', 50);
    blackPiece.setAttribute('height', 50);
    blackPiece.setAttribute('onclick', '"event.stopPropogation()"');
    g.appendChild(blackPiece);
    board[0][0] = blackPiece;
    board[7][0] = whitePiece;
    whitePiece = document.createElementNS('http://www.w3.org/2000/svg', 'image');
    whitePiece.setAttribute('href', 'Rook_White.png');
    whitePiece.setAttribute('x', 350);
    whitePiece.setAttribute('y', 350);
    whitePiece.setAttribute('width', 50);
    whitePiece.setAttribute('height', 50);
    whitePiece.setAttribute('onclick', '"event.stopPropogation()"');
    g.appendChild(whitePiece);
    blackPiece = document.createElementNS('http://www.w3.org/2000/svg', 'image');
    blackPiece.setAttribute('href', 'Rook_Black.png');
    blackPiece.setAttribute('x', 350);
    blackPiece.setAttribute('y', 0);
    blackPiece.setAttribute('width', 50);
    blackPiece.setAttribute('height', 50);
    blackPiece.setAttribute('onclick', '"event.stopPropogation()"');
    g.appendChild(blackPiece);
    board[0][7] = blackPiece;
    board[7][7] = whitePiece;
    whitePiece = document.createElementNS('http://www.w3.org/2000/svg', 'image');
    whitePiece.setAttribute('href', 'Knight_White.png');
    whitePiece.setAttribute('x', 300);
    whitePiece.setAttribute('y', 350);
    whitePiece.setAttribute('width', 50);
    whitePiece.setAttribute('height', 50);
    whitePiece.setAttribute('onclick', '"event.stopPropogation()"');
    g.appendChild(whitePiece);
    blackPiece = document.createElementNS('http://www.w3.org/2000/svg', 'image');
    blackPiece.setAttribute('href', 'Knight_Black.png');
    blackPiece.setAttribute('x', 300);
    blackPiece.setAttribute('y', 0);
    blackPiece.setAttribute('width', 50);
    blackPiece.setAttribute('height', 50);
    blackPiece.setAttribute('onclick', '"event.stopPropogation()"');
    g.appendChild(blackPiece);
    board[0][6] = blackPiece;
    board[7][6] = whitePiece;
    whitePiece = document.createElementNS('http://www.w3.org/2000/svg', 'image');
    whitePiece.setAttribute('href', 'Knight_White.png');
    whitePiece.setAttribute('x', 50);
    whitePiece.setAttribute('y', 350);
    whitePiece.setAttribute('width', 50);
    whitePiece.setAttribute('height', 50);
    whitePiece.setAttribute('onclick', '"event.stopPropogation()"');
    g.appendChild(whitePiece);
    blackPiece = document.createElementNS('http://www.w3.org/2000/svg', 'image');
    blackPiece.setAttribute('href', 'Knight_Black.png');
    blackPiece.setAttribute('x', 50);
    blackPiece.setAttribute('y', 0);
    blackPiece.setAttribute('width', 50);
    blackPiece.setAttribute('height', 50);
    blackPiece.setAttribute('onclick', '"event.stopPropogation()"');
    g.appendChild(blackPiece);
    board[0][1] = blackPiece;
    board[7][1] = whitePiece;
    whitePiece = document.createElementNS('http://www.w3.org/2000/svg', 'image');
    whitePiece.setAttribute('href', 'Bishop_White.png');
    whitePiece.setAttribute('x', 250);
    whitePiece.setAttribute('y', 350);
    whitePiece.setAttribute('width', 50);
    whitePiece.setAttribute('height', 50);
    whitePiece.setAttribute('onclick', '"event.stopPropogation()"');
    g.appendChild(whitePiece);
    blackPiece = document.createElementNS('http://www.w3.org/2000/svg', 'image');
    blackPiece.setAttribute('href', 'Bishop_Black.png');
    blackPiece.setAttribute('x', 250);
    blackPiece.setAttribute('y', 0);
    blackPiece.setAttribute('width', 50);
    blackPiece.setAttribute('height', 50);
    blackPiece.setAttribute('onclick', '"event.stopPropogation()"');
    g.appendChild(blackPiece);
    board[0][5] = blackPiece;
    board[7][5] = whitePiece;
    whitePiece = document.createElementNS('http://www.w3.org/2000/svg', 'image');
    whitePiece.setAttribute('href', 'Bishop_White.png');
    whitePiece.setAttribute('x', 100);
    whitePiece.setAttribute('y', 350);
    whitePiece.setAttribute('width', 50);
    whitePiece.setAttribute('height', 50);
    whitePiece.setAttribute('onclick', '"event.stopPropogation()"');
    g.appendChild(whitePiece);
    blackPiece = document.createElementNS('http://www.w3.org/2000/svg', 'image');
    blackPiece.setAttribute('href', 'Bishop_Black.png');
    blackPiece.setAttribute('x', 100);
    blackPiece.setAttribute('y', 0);
    blackPiece.setAttribute('width', 50);
    blackPiece.setAttribute('height', 50);
    blackPiece.setAttribute('onclick', '"event.stopPropogation()"');
    g.appendChild(blackPiece);
    board[0][2] = blackPiece;
    board[7][2] = whitePiece;
    whitePiece = document.createElementNS('http://www.w3.org/2000/svg', 'image');
    whitePiece.setAttribute('href', 'King_White.png');
    whitePiece.setAttribute('x', 200);
    whitePiece.setAttribute('y', 350);
    whitePiece.setAttribute('width', 50);
    whitePiece.setAttribute('height', 50);
    whitePiece.setAttribute('onclick', '"event.stopPropogation()"');
    g.appendChild(whitePiece);
    blackPiece = document.createElementNS('http://www.w3.org/2000/svg', 'image');
    blackPiece.setAttribute('href', 'King_Black.png');
    blackPiece.setAttribute('x', 200);
    blackPiece.setAttribute('y', 0);
    blackPiece.setAttribute('width', 50);
    blackPiece.setAttribute('height', 50);
    blackPiece.setAttribute('onclick', '"event.stopPropogation()"');
    g.appendChild(blackPiece);
    board[0][4] = blackPiece;
    board[7][4] = whitePiece;
    whitePiece = document.createElementNS('http://www.w3.org/2000/svg', 'image');
    whitePiece.setAttribute('href', 'Queen_White.png');
    whitePiece.setAttribute('x', 150);
    whitePiece.setAttribute('y', 350);
    whitePiece.setAttribute('width', 50);
    whitePiece.setAttribute('height', 50);
    whitePiece.setAttribute('onclick', '"event.stopPropogation()"');
    g.appendChild(whitePiece);
    blackPiece = document.createElementNS('http://www.w3.org/2000/svg', 'image');
    blackPiece.setAttribute('href', 'Queen_Black.png');
    blackPiece.setAttribute('x', 150);
    blackPiece.setAttribute('y', 0);
    blackPiece.setAttribute('width', 50);
    blackPiece.setAttribute('height', 50);
    blackPiece.setAttribute('onclick', '"event.stopPropogation()"');
    g.appendChild(blackPiece);
    board[0][3] = blackPiece;
    board[7][3] = whitePiece;
}