function taskApp() {
    return {
        tasks: [],
        searchQuery: '',
        newTaskTitle: '',
        newTaskTime: '',
        filteredTasks() {
            return this.tasks.filter(task =>
                task.title.toLowerCase().includes(this.searchQuery.toLowerCase())
            );
        },
        addTask(title, time) {
            if (title.trim() !== '' && time > 0) {
                const timeInMillis = time * 60 * 1000;
                const task = { 
                    title, 
                    completed: false, 
                    timeLeft: `${time} minutes`, 
                    originalTime: timeInMillis,
                    remainingTime: timeInMillis,
                    timer: null 
                };
                this.tasks.push(task);

                // Start the timer
                task.timer = setInterval(() => {
                    if (task.remainingTime > 0) {
                        task.remainingTime -= 1000;
                        task.timeLeft = `${Math.floor(task.remainingTime / 60000)} minutes`;
                    } else {
                        clearInterval(task.timer);
                        this.deleteTask(this.tasks.indexOf(task));
                    }
                }, 1000);
            }
        },
        deleteTask(index) {
            if (this.tasks[index].timer) {
                clearInterval(this.tasks[index].timer);
            }
            this.tasks.splice(index, 1);
        },
        editTask(index) {
            const newTitle = prompt('Edit task:', this.tasks[index].title);
            if (newTitle) this.tasks[index].title = newTitle;

            const newTime = prompt('Edit time (in minutes):', this.tasks[index].originalTime / 60000);
            if (newTime && newTime > 0) {
                this.tasks[index].remainingTime = newTime * 60 * 1000;
                this.tasks[index].timeLeft = `${newTime} minutes`;
                clearInterval(this.tasks[index].timer); // Clear previous timer
                this.startTimer(this.tasks[index]); // Restart with new time
            }
        },
        startTimer(task) {
            task.timer = setInterval(() => {
                if (task.remainingTime > 0) {
                    task.remainingTime -= 1000;
                    task.timeLeft = `${Math.floor(task.remainingTime / 60000)} minutes`;
                } else {
                    clearInterval(task.timer);
                    this.deleteTask(this.tasks.indexOf(task));
                }
            }, 1000);
        }
    };
}