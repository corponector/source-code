'use client';

import React, { useState } from 'react';
import { Button, Form, Alert } from 'react-bootstrap';
import { editUserRole } from '@/lib/dbActions';

interface User {
  id: number;
  role: string;
}

const roles = ['user', 'admin', 'company', 'student'];

const EditRoleButton: React.FC<{ user: User }> = ({ user }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [selectedRole, setSelectedRole] = useState<string>(user.role);
  const [alertInfo, setAlertInfo] = useState<{ type: string; message: string } | null>(null);

  const handleSave = async () => {
    try {
      await editUserRole(user.id, selectedRole);
      setAlertInfo({ type: 'success', message: 'Role updated successfully!' });
      window.location.reload(); // Consider using state management instead of reloading
    } catch (error) {
      console.error('Error updating role:', error);
      setAlertInfo({ type: 'danger', message: 'Failed to update role' });
    } finally {
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setSelectedRole(user.role); // Reset to original role on cancel
  };

  return (
    <div>
      {alertInfo && (
        <Alert variant={alertInfo.type} onClose={() => setAlertInfo(null)} dismissible>
          {alertInfo.message}
        </Alert>
      )}
      {isEditing ? (
        <>
          <Form.Control
            as="select"
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
            className="mb-3"
          >
            {roles.map((role) => (
              <option key={role} value={role}>
                {role}
              </option>
            ))}
          </Form.Control>
          <Button variant="success" onClick={handleSave}>
            Save
          </Button>
          <Button variant="secondary" onClick={handleCancel} className="ms-2">
            Cancel
          </Button>
        </>
      ) : (
        <Button variant="warning" onClick={() => setIsEditing(true)}>
          Edit Role
        </Button>
      )}
    </div>
  );
};

export default EditRoleButton;
