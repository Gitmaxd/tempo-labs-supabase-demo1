-- Get the admin role ID
DO $$
DECLARE
  admin_role_id INT;
BEGIN
  -- Get the admin role ID
  SELECT id INTO admin_role_id FROM roles WHERE name = 'admin';
  
  -- Update the user with the specified email to have the admin role
  UPDATE users
  SET role_id = admin_role_id
  WHERE email = 'gitmaxd@gmail.com';
  
  -- Log the change
  RAISE NOTICE 'Updated user with email gitmaxd@gmail.com to admin role';
END $$;
