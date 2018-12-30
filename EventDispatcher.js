var Event = function (sender){
    this._sender=sender;
    this._listener=[];
}
Event.prototype={
    attach:function(istener){
        this.listeners.push(listener);
    },
    notify:function(args){
        for(var i=0; i<this._listeners.length; i+=1){
            this._listener[i](this._sender,args);
        }
    }
};