const mp = new Map(); // sessionId TO User Mapping

function setUser(id , user){
    mp.set(id , user);
}

function getUser(id)
{
    return mp.get(id);
}

module.exports = {setUser , getUser};