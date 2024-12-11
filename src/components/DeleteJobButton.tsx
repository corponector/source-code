"use client";

// DeleteJobButton.tsx
import React from 'react';
import { Button } from 'react-bootstrap';
import { deleteJobPosting } from '@/lib/dbActions'; // Ensure this function is properly implemented

/**
 * Button to delete a job posting.
 * @param jobId - The unique ID of the job to be deleted.
 */
const DeleteJobButton: React.FC<{ jobId: number }> = ({ jobId }) => {
  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this job posting?")) {
      try {
        await deleteJobPosting(jobId);
        // Trigger a page reload or refetch the data to show the updated list
        window.location.reload();
      } catch (error) {
        console.error("Error deleting job posting:", error);
      }
    }
  };

  return (
    <Button variant="danger" onClick={handleDelete}>
      Delete
    </Button>
  );
};

export default DeleteJobButton;

