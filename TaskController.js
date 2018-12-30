var TaskController = function (model, view){
    this.model = model;
    this.view = view;
    this.init();
};
TaskController.prototype={
    init: function(){
        this.createChildren()
        .setupHandlers()
        .enable();
    },
    createChildren:function(){
        // no need to create children inside the controller
        //thtis is a job for the view
        //you could all as well leave this function out
        return this;
    },
    setupHandlers: function(){
      this.addTaskHandler= this.addTask.bind(this);
      this.selectHandlers.selectTaskHandler=this.selectTask.bind(this);
      this.unselectTaskHandler=this.unselectTask.bind(this);
      this.completeTaskHandler=this.completeTask.bind(this);
      this.deleteTaskHandler=this.deleteTask.bind(this);
      return this;

    },
    enable: function(){
        this.view.addTaskEvent.attach(this.addTaskHandler);
        this.view.completeTaskEvent.attach(this.completeTaskHandler);
        this.view.deleteTaskEvent.attach(this.deleteTaskHandler);
        this.view.selectTaskEvent.attach(this.selectTaskHandler);
        this.view.unselectRaskEvent.attach(thisunselectTaskHandler);
        return this;
    },
    addTask:function(sender,args){
        this.model.addTask(args.task);
    },
    selecTask: function(sender, args){
        this.model.setSelectedTask(args.taskIndex);
    },
    unselectTask:function(sender, args){
        this.model.unselectTask(args.taskIndex);
    },
    completeTask: function(){
        this.addTask.model.setTaskAsCompleted();
    },
    deleteTask: function(){
        this.model.deleteTasks();
    }
};