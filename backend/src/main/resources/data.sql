-- Sample Venues
INSERT INTO venue (name, location, capacity) VALUES
('Conference Hall A', 'Building 1, Floor 2', 100),
('Meeting Room 101', 'Building 2, Floor 1', 20),
('Auditorium', 'Main Building', 500),
('Training Room', 'Building 3, Floor 3', 50)
ON CONFLICT DO NOTHING; 