export const sortTasks = (tasks, selectedSortOption) => {
        return tasks.slice().sort((a, b) => {
            if (selectedSortOption === "date") {
                return new Date(a.date) - new Date(b.date);
            } else if (selectedSortOption === "category") {
                return a.category_id - b.category_id;
            } else if (selectedSortOption === "uncompletedFirst") {
                // Sort by completion state, placing completed tasks first
                if (a.completion_state === b.completion_state) {
                    return 0; // If both tasks have the same completion state, no change in order
                } else if (b.completion_state) {
                    return -1; // Move uncompleted tasks (b) before uncompleted tasks (a)
                } else {
                    return 1; // Move completed tasks (a) before uncompleted tasks (b)
                }
            } else if (selectedSortOption === "completedFirst") {
                // Sort by completion state, placing completed tasks first
                if (a.completion_state === b.completion_state) {
                    return 0; // If both tasks have the same completion state, no change in order
                } else if (a.completion_state) {
                    return -1; // Move completed tasks (a) before uncompleted tasks (b)
                } else {
                    return 1; // Move uncompleted tasks (b) before completed tasks (a)
                }
            }
            // Add more sorting options as needed
            return 0; // Default case: no sorting
        });
    };
