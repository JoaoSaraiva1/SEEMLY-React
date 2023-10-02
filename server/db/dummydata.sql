-- Insert dummy data into the 'categories' table
INSERT INTO task_list_app.categories (name, color)
VALUES
    ('Work', '#FF5733'),
    ('Personal', '#3366FF'),
    ('Home', '#33FF33');

-- Insert descriptive dummy data into the 'tasks' table
INSERT INTO task_list_app.tasks (name, description, date, completion_state, favorite, deleted, category_id)
VALUES
    ('Finish Work Proposal', 'Complete and submit the work proposal for the upcoming project.', '2023-10-05', true, false, false, 1), 
    ('Buy Groceries', 'Purchase groceries for the week, including fruits, vegetables, and household items.', '2023-10-06', false, true, false, 2), 
    ('Home Cleaning', 'Clean the house, including vacuuming, dusting, and tidying up.', '2023-10-07', false, true, false, 3), 
    ('Meeting with Client', 'Attend the scheduled meeting with the client to discuss project details.', '2023-10-08', true, false, false, 1); 
