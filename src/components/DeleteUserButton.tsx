'use client';

import React from 'react';
import { Button } from 'react-bootstrap';
import { deleteUser } from '@/lib/dbActions';

/**
 * Button to delete a user.
 * @param userId - The unique ID of the user to be deleted.
 */
const DeleteUserButton: React.FC<{ userId: number }> = ({ userId }) => {
  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await deleteUser(userId);
        // Optional: You can trigger a page reload or refetch the data to show the updated user list
        window.location.reload(); // This will refresh the page
      } catch (error) {
        console.error('Error deleting user:', error);
      }
    }
  };

  return (
    <Button variant='danger' onClick={handleDelete}>
      Delete
    </Button>
  );
};

export default DeleteUserButton;
