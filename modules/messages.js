
module.exports = function(m)
{
    this.history = [];
    this.load_existing = function()
    {
        return new Promise((resolve,reject) => {
            m.data.find("messages").then((messages) => {
                this.history = messages;
                resolve();
            });
        });
    }
    this.get = function()
    {
        return this.history;
    };
    this.set = function(json)
    {
        m.data.insert("messages",json);
        this.history.push(json);
    };
    return this;
};