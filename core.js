let load_order = [
    "server",
    "io"
];

console.log("Loading Core");

global.__basedir = __dirname;
var module_path = require("path").join(__dirname, "modules");
var mods = {};

// load first
for(let i=0, l=load_order.length; i<l; i++)
{
    let f = load_order[i];
    console.log("Loading "+f);
    mods[f] = require("./modules/" + f +".js")(mods);
}

// load remaining modules
require("fs").readdirSync(module_path).forEach(function(file) {
    if(file.substr(-3)=='.js')
    {
        let f = file.substr(0,file.length-3);
        if(load_order.indexOf(f)<0)
        {
            console.log("Loading "+f);
            mods[f] = require("./modules/" + file)(mods);
        }
    }
});

module.exports = mods;
