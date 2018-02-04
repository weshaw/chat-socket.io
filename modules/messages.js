
module.exports = function(m)
{
    this.history = [];

    this.get = function()
    {
        return this.history;
    };
    this.set = function(json)
    {
        this.history.push(json);
    };
    return this;
};