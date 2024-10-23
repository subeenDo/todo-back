const Task = require("../model/Task");

const taskController = {}

//Task 추가
taskController.createTask = async(req, res)=>{
    try{
        const { task, isComplete } = req.body;
        const { userId } = req;
        const newTask = new Task({task, isComplete, author:userId});
        await newTask.save();
        res.status(200).json({status:'ok', data:newTask});
    }catch(err){
        res.status(400).json({status:'fail', error : err});
    }
    
};

// Tasks 조회
taskController.getAllTasks = async (req, res) => {
    try {
        const tasks = await Task.find().select("-__v").populate("author");
        res.status(200).json({ status: 'ok', data: tasks });
    } catch (err) {
        res.status(400).json({ status: 'fail', error: err.message });
    }
};

// Task 상태변경
taskController.updateTask = async (req, res) => {
    try {
      const task = await Task.findById(req.params.id);
      if (!task) {
        throw new Error("App can not find the task");
      }
      const fields = Object.keys(req.body);
      fields.map((item) => (task[item] = req.body[item]));
      await task.save();
      res.status(200).json({ status: "success", data: task });
    } catch (error) {
      res.status(400).json({ status: "fail", error });
    }
  };

//Task 삭제
taskController.deleteTask = async(req, res) => {
    try {
        const { id } = req.params;

        const deleteTask = await Task.findByIdAndDelete(id);
        if (!deleteTask) {
            return res.status(404).json({ status: 'fail', message: 'Task not found' });
        }
        res.status(200).json({status:'ok', data:deleteTask});
    } catch (err) {
        res.status(400).json({status:'fail', error : err});
    }
};


module.exports = taskController