-- Insert Levels
INSERT INTO public.levels (name, title, description, required_points, badge_icon, color_theme, order_index) VALUES
('frontend', 'Water Master', 'Master the fundamentals of frontend development with HTML, CSS, and JavaScript', 300, '💧', 'blue', 1),
('backend', 'Fire Master', 'Learn backend development with Node.js, Express, and databases', 600, '🔥', 'red', 2),
('fullstack', 'Air Master', 'Combine frontend and backend skills for full-stack development', 900, '💨', 'green', 3),
('advanced', 'Earth Master', 'Advanced concepts, deployment, and real-world applications', 1200, '🌍', 'brown', 4);

-- Insert Phases for Level 1 (Water Master - Frontend)
INSERT INTO public.phases (level_id, name, description, order_index, required_points) VALUES
(1, 'HTML5/CSS3 Fundamentals', 'Learn semantic HTML and responsive CSS layout techniques', 1, 100),
(1, 'JavaScript Essentials', 'Develop core logic and DOM manipulation skills', 2, 100),
(1, 'React Framework', 'Introduction to components, state management, and hooks', 3, 100);

-- Insert Phases for Level 2 (Fire Master - Backend)
INSERT INTO public.phases (level_id, name, description, order_index, required_points) VALUES
(2, 'Node.js & Express', 'Build scalable server-side applications', 1, 150),
(2, 'Databases (MongoDB/MySQL)', 'Learn data modeling and persistent storage', 2, 150);

-- Insert Phases for Level 3 (Air Master - Full-Stack)
INSERT INTO public.phases (level_id, name, description, order_index, required_points) VALUES
(3, 'Cloud Hosting and CI/CD', 'Understand continuous integration and cloud deployment', 1, 150),
(3, 'Capstone Project Development', 'Apply all skills in a real-world application', 2, 150);

-- Insert Phases for Level 4 (Earth Master - Advanced)
INSERT INTO public.phases (level_id, name, description, order_index, required_points) VALUES
(4, 'Evaluation & Filtering', 'Hackathon-style projects and technical interviews', 1, 300);

-- Insert Badges
INSERT INTO public.badges (name, description, icon, level_id, requirements) VALUES
('HTML Hero', 'Complete all HTML fundamentals', '🏆', 1, '{"quizzes_completed": 3, "puzzles_solved": 2}'),
('CSS Champion', 'Master CSS styling and layouts', '🎨', 1, '{"quizzes_completed": 3, "puzzles_solved": 3}'),
('JavaScript Jedi', 'Become proficient in JavaScript', '⚡', 1, '{"quizzes_completed": 4, "puzzles_solved": 5}'),
('React Rockstar', 'Build dynamic React applications', '⚛️', 1, '{"projects_completed": 1, "quizzes_completed": 3}'),
('Backend Boss', 'Master server-side development', '🔧', 2, '{"projects_completed": 2, "quizzes_completed": 5}'),
('Database Dynamo', 'Expert in data management', '🗄️', 2, '{"quizzes_completed": 3, "puzzles_solved": 3}'),
('Deployment Deity', 'Master of cloud deployment', '☁️', 3, '{"projects_completed": 1, "quizzes_completed": 2}'),
('Full-Stack Phenom', 'Complete full-stack mastery', '🌟', 3, '{"projects_completed": 2, "total_points": 900}'),
('Code Conqueror', 'Ultimate coding achievement', '👑', 4, '{"major_project_completed": 1, "total_points": 1200}');

-- Insert Sample Quizzes for Phase 1 (HTML5/CSS3 Fundamentals)
INSERT INTO public.quizzes (phase_id, title, description, questions, points_reward, time_limit) VALUES
(1, 'HTML Basics Quiz', 'Test your knowledge of HTML fundamentals', 
'[
  {
    "id": "q1",
    "question": "What does HTML stand for?",
    "options": ["Hyper Text Markup Language", "High Tech Modern Language", "Home Tool Markup Language", "Hyperlink and Text Markup Language"],
    "correct_answer": 0,
    "explanation": "HTML stands for Hyper Text Markup Language, which is the standard markup language for creating web pages."
  },
  {
    "id": "q2", 
    "question": "Which HTML element is used for the largest heading?",
    "options": ["<h6>", "<h1>", "<heading>", "<header>"],
    "correct_answer": 1,
    "explanation": "The <h1> element represents the largest heading in HTML, with <h6> being the smallest."
  },
  {
    "id": "q3",
    "question": "What is the correct HTML element for inserting a line break?",
    "options": ["<break>", "<lb>", "<br>", "<newline>"],
    "correct_answer": 2,
    "explanation": "The <br> element is used to insert a single line break in HTML."
  }
]', 15, 10),

(1, 'CSS Fundamentals Quiz', 'Test your CSS knowledge', 
'[
  {
    "id": "q1",
    "question": "What does CSS stand for?",
    "options": ["Creative Style Sheets", "Cascading Style Sheets", "Computer Style Sheets", "Colorful Style Sheets"],
    "correct_answer": 1,
    "explanation": "CSS stands for Cascading Style Sheets, used for styling HTML elements."
  },
  {
    "id": "q2",
    "question": "Which CSS property is used to change the text color?",
    "options": ["text-color", "font-color", "color", "text-style"],
    "correct_answer": 2,
    "explanation": "The color property is used to set the color of text in CSS."
  }
]', 10, 8);

-- Insert Sample Puzzles for Phase 1
INSERT INTO public.puzzles (phase_id, title, description, starter_code, solution, test_cases, points_reward, difficulty) VALUES
(1, 'Create a Simple HTML Page', 'Create a basic HTML page with a title, heading, and paragraph', 
'<!DOCTYPE html>
<html>
<head>
    <!-- Add your title here -->
</head>
<body>
    <!-- Add your content here -->
</body>
</html>',
'<!DOCTYPE html>
<html>
<head>
    <title>My First Page</title>
</head>
<body>
    <h1>Welcome to My Website</h1>
    <p>This is my first HTML page!</p>
</body>
</html>',
'[
  {
    "input": "HTML structure",
    "expected_output": "Valid HTML with title, h1, and p elements",
    "description": "Should contain proper HTML structure with title, heading, and paragraph"
  }
]', 20, 'easy'),

(1, 'CSS Flexbox Layout', 'Create a flexbox layout with three equal columns', 
'.container {
    /* Add your flexbox styles here */
}

.column {
    /* Style the columns */
}',
'.container {
    display: flex;
    justify-content: space-between;
    align-items: stretch;
}

.column {
    flex: 1;
    margin: 0 10px;
    padding: 20px;
    background-color: #f0f0f0;
}',
'[
  {
    "input": "Three div elements in container",
    "expected_output": "Equal width columns using flexbox",
    "description": "Should create three equal columns using flexbox properties"
  }
]', 25, 'medium');

-- Insert Sample Projects for Phase 1
INSERT INTO public.projects (phase_id, title, description, requirements, points_reward, is_major_project) VALUES
(1, 'Personal Portfolio Page', 'Create a responsive personal portfolio using HTML, CSS, and basic JavaScript', 
'[
  "Use semantic HTML5 elements",
  "Implement responsive design with CSS Grid or Flexbox", 
  "Include sections: Header, About, Skills, Projects, Contact",
  "Add smooth scrolling navigation",
  "Ensure mobile-friendly design",
  "Include at least 3 sample projects",
  "Use CSS animations or transitions"
]', 100, false),

(3, 'Weather Forecast App', 'Build a React weather app using a public API', 
'[
  "Use React hooks (useState, useEffect)",
  "Fetch data from a weather API",
  "Display current weather and 5-day forecast",
  "Implement search functionality by city",
  "Add loading states and error handling",
  "Use responsive design",
  "Include weather icons and animations"
]', 150, false);

-- Insert Sample Videos for Phase 1
INSERT INTO public.videos (phase_id, title, description, url, duration, order_index) VALUES
(1, 'Introduction to HTML5', 'Learn the basics of HTML5 and semantic elements', 'https://example.com/html5-intro', 1800, 1),
(1, 'CSS Grid and Flexbox', 'Master modern CSS layout techniques', 'https://example.com/css-layouts', 2400, 2),
(1, 'Responsive Web Design', 'Create websites that work on all devices', 'https://example.com/responsive-design', 2100, 3),
(2, 'JavaScript Fundamentals', 'Core JavaScript concepts and syntax', 'https://example.com/js-fundamentals', 3000, 1),
(2, 'DOM Manipulation', 'Learn to interact with HTML elements using JavaScript', 'https://example.com/dom-manipulation', 2700, 2),
(3, 'Introduction to React', 'Get started with React components and JSX', 'https://example.com/react-intro', 3600, 1),
(3, 'React Hooks Deep Dive', 'Master useState, useEffect, and custom hooks', 'https://example.com/react-hooks', 4200, 2);
