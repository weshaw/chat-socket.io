var app     = require('express')();
var http    = require('http').Server(app);
module.exports = function(m)
{    
    this.app    = app;
    this.http   = http;

    this.app.get('/', (req, res) => {
        res.sendFile(__basedir  + '/pages/index.html');
    });
    this.app.get('/:page', (req, res) => {
        res.sendFile(__basedir  + '/pages/'+req.params.page+'.html',function(err){
            if(err)
            {
                res.sendStatus(404);
            }
        });
    });
    this.http.listen(3000, () => {
        console.log('listening on *:3000');
    });

    return this;
};
