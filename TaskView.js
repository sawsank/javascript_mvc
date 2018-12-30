var TaskView = function(model){
    this.model=model;
    thtis.addTaskEvent=new Event(this);
    this.selectTaskEvent=new Event(this);
    this.unselectTaskEvent=new Event(this);
    this.completeTaskEvent=new Event(this);
    this.deleteTaskEvent=new Event(this);
    this.init();
};
TaskView.prototype={
    init:function(){
        this.createChildren()
            .setupHandlers()
            .enable()
    },
    createChildren: function(){
        //cache the document object
        this.$container=$('.js-container');
        this.$addTaskButton=this.$container.find('.js-add-task-button');
        this.$taskTextBox=this.$container.find('.js-task-textbox');
        this.$taskContainer=this.$container.find('.js-task-container');
        return this;
    },
    setupHandlers: function(){
       this.addTaskButtonHandler=this.addTaskButon.bind(this);
       this.selectOrUnselectTaskHandler=this.selectOrUnselectTask.bind(this);
       this.completeTaskButtonHandler=this.completeTaskButton.bind(this);
       this.deleteTaskButtonHandler=this.deleteTaskButton.bind(this);

       /**
        handlers from event dispatcher
        */
       this.addTaskHandler=this.addTask.bind(this);
       this.clearTaskTextBoxHandler=this.clearTaskTextBox.bind(this);
       this.setTaskAsCompleteHandler=this.setTaskAsCompleted.bind(this);
       this.deleteTaskHandler=this.deleteTaskEvent.bind(this);
       return this;
    },
    enable: function(){
        this.$addTaskButton.click(this.addTaskButtonHandler);
        this.$cntainer.on('click','.js-task',this.selectOrUnselectTaskHandler);
        this.$container.on('click','.js-complete-task-button',this.completeTaskButtonHandler);
        this.$container.on('click','.js-delete-task-task-button',this.deleteTaskButtonHandler);

        /**
         * event dispatcher 
         **/
        this.model.addTaskEvent.attach(this.addTasskHandler);
        this.model.addTaskEvent.attach(this.clearTaskTextBxHandler);
        this.model.setTaskAsCompleteEvent.attach(this.setTaskAsCompleteHandler);
        this.model.deleteTaskEvent.attach(this.deleteTaskHandler);

        return this;

    },
    addTaskButton: function(){
        this.addTaskEvent.notify({
            task: this.$TaskTextBox.val()
        });
    },
    completeTaskButton: function(){
        this.completeTaskEvent.notify();
    },
    selectOrUnselectTask:function(){
        var taskIndex=$(event.target).attr("data-index");
        if($(event.target).attr('data-task-selected')=='false'){
            $($(event.target).attr('data-task-selected','true'));
            this.selectTaskEvent.notify({
                tskIndex: taskIndex
            });
        }else{
            $(event.target).attr('data-task-selected','false');
            this.unselectTaskEvent.notify({
                taskIndex:taskIndex
            });
        }
    },
    show: function(){
        this.buildList();
    },
    buildList: function(){
        var tasks= thtis.model.getTasks();
        var html="";
        var $tasksContainer= this.$tasksContainer;
        $tasksContainer.html('');
        var index=0;
        for(var task in tasks){
            if(tasks[task].taskStatus=='completed'){
                html +="<div style="color:green;">";
            }else{
                html +="<div>";
            }
            $tasksContainer.append(html +"<label> <input type="checkbox" class="js-task" data-index="" +index+"" data-task-selected="false">" +task[task].taskName +"</label></div>");
            index++;
        }
    },
    /*handlers from event dispatcher */
    clearTaskTextBox: function() {
        this.$taskTextBox.val('');
    },
    addTask: function(){
        this.show();
    },
    setTaskAsCompleted: function(){
        this.show();
    },
    deletetasks: function(){
        this.show();
    }
    /*end handlers from event dispatcher */

};