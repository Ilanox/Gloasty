module.exports = function (level) {
    var FiveCounter = 0;

    for (var i = 1; i <= level; i++) {
        if (i % 5 == 0) FiveCounter++
    }

    return (level * 6) + (FiveCounter * 6);
}

//  6 | 1  ->  2
// 12 | 2  ->  3
// 18 | 3  ->  4
// 24 | 4  ->  5
// 36 | 5  ->  6
// 42 | 6  ->  7
// 48 | 7  ->  8
// 54 | 8  ->  9
// 60 | 9  -> 10
// 72 | 10 -> 11