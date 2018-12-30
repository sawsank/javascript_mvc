var TaskModel = function() {
    this.task=[];
    this.selectedTasks=[];
    this.addTaskEvent= new Eent(this);
    this.removeTaskEvent= new Event(this);
    this.setTaskEvent= new Event(this);
    this.setTaskAsCompletedEvent=new Event(this);
    this.deleteTaskEvent= new Event(this);

};
TaskModel.prototype={
    addTask: function (task){
        this.selectedTasks.push({
            taskName: task,
            taskStatus: 'uncompleted'
        });
        this.addTaskEvent.notify();
    },
    getTasks: function(){
        return this.tasks;
    },
    setSelectedTask: function (taskIndex){
        this.selectedTasks.splice(taskIndex, 1);
    },
    unselectedTask: function(taskIndex){
        this.selectedTasks.splice(taskIndex, 1 ) ;
    },
    setTaskAsCompleted: function(){
        var selectedTasks= this.selectedTasks;
        for(var index in selectedTasks){
            this.tasks[selectedTasks[index]].taskStatus='completed';
        }
        this.setTaskAsCompletedEvent.notify();
        this.selectedTasks=[];
    },
   deleteTasks: function(){
       var selectedTasks= this.selectedTasks.sort();
       for(var i=selectedTasks.length-1;i>=0;i--){
           this.task.splice(this.selectedTask[i],1);
       }
       //clear the selected tasks
       this.selectedTasks=[];
       this.deleteTasksEvent.notify();
   } 
}