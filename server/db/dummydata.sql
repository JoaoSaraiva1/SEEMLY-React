-- Insert dummy data into the 'categories' table
INSERT INTO task_list_app.categories (name, color)
VALUES
    ('Work', '#FF5733'),
    ('Personal', '#3366FF'),
    ('Home', '#33FF33');

INSERT INTO task_list_app.tasks (name, description, date, completion_state, favorite, deleted, category_id)
VALUES
    ('Finish Work Proposal', 'Complete and submit the work proposal for the upcoming project.', '2023-10-05', true, false, false, 1), 
    ('Buy Groceries', 'Purchase groceries for the week, including fruits, vegetables, and household items.', '2023-10-05', false, true, false, 2), 
    ('Weekly Home Cleaning', 'Clean the house, including vacuuming, dusting, and tidying up.', '2023-10-10', false, true, false, 3), 
    ('Meeting with Client', 'Attend the scheduled meeting with the client to discuss project details.', '2023-10-08', true, false, false, 1),
    
    ('Write Monthly Report', 'Prepare and compile the monthly report for the management team.', '2023-10-09', false, false, false, 1),
    ('Plan Weekend Getaway', 'Research and plan a weekend trip to the mountains for relaxation.', '2023-10-6', false, true, false, 2),
    ('Yard Maintenance', 'Mow the lawn, trim the hedges, and water the plants in the garden.', '2023-10-11', false, false, false, 3),
    
    ('Review Budget', 'Analyze and review the budget for the upcoming fiscal year.', '2023-10-12', false, false, false, 1),
    ('Read The New Book', 'Start reading the latest bestseller novel bought last week.', '2023-10-13', false, true, false, 2),
    ('Paint Living Room', 'Repaint the living room walls with a fresh coat of paint.', '2023-10-12', false, false, false, 3),
    
    ('Create Presentation', 'Prepare a presentation for the team meeting next week.', '2023-10-15', false, false, false, 1),
    ('Exercise Routine', 'Follow your daily workout routine for improved fitness.', '2023-10-16', false, true, false, 2),
    ('Sort and Organize Closet', 'Declutter and organize your closet for a neater appearance.', '2023-10-13', false, false, false, 3);
