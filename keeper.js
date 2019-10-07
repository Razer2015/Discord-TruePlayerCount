import fetch from 'node-fetch';

export default class Keeper {
    constructor(guid) {
        this.guid = guid;
    }

    fetchPlayerCounts() {
        return fetch(`https://keeper.battlelog.com/snapshot/${this.guid}`)
            .then(res => res.json())
            .then(json => {
                if (json.snapshot.status == "SUCCESS") {
                    var totalPlayers = 0

                    var snapshot = json.snapshot
                    var teamInfos = snapshot.teamInfo
                    totalPlayers += (["0"] in teamInfos ? this.count(teamInfos["0"].players) : 0)
                    totalPlayers += (["1"] in teamInfos ? this.count(teamInfos["1"].players) : 0)
                    totalPlayers += (["2"] in teamInfos ? this.count(teamInfos["2"].players) : 0)
                    totalPlayers += (["3"] in teamInfos ? this.count(teamInfos["3"].players) : 0)
                    totalPlayers += (["4"] in teamInfos ? this.count(teamInfos["4"].players) : 0)

                    return totalPlayers
                }
                else {
                    throw new Exception(`Invalid fetch status`)
                }
            });
    }

    /* From BBLog source */
    count(obj, ignoreNull) {
        if (!obj) return 0;
        var c = 0;
        for (var _i in obj) {
            if (ignoreNull) {
                if (obj[_i] === null || obj[_i] === undefined) continue;
                c++;
            } else {
                c++;
            }
        }
        return c;
    }
}
