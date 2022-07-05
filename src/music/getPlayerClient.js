

module.exports = function(clientArray, id) {

    var c

    clientArray.forEach((client) => {
        if(client.user.id == id) c = client
    });

    return c

}