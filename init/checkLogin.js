'use strict';
/**
 * Created by jun_ma on 2016/3/17.
 */
module.exports = function(){
    return function (req,res,next){
        const includeUrls = [
            '/mongo'
        ];
        var path = req.path;
        for (var i in includeUrls){
            const url = includeUrls[i];
            if(path.indexOf(url) != -1 && !req.session.user){
                res.redirect("/");
                return;
            }
        }
        next();
    }
}
