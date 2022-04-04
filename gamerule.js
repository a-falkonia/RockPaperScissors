function getResult(numberOfMoves, move1, move2) {
    let half = numberOfMoves / 2;

    if ((move1 == move2)) {
        return('Draw');
    }
    else if (move2 > move1) {
        if ((move2 - move1) < half) {
            return('Lose');
        }
        return ('Win');
    }
    else if ((move1 - move2) < half) {
        return ('Win');
    }
    
    return ('Lose');
    
    
}

module.exports = { getResult };