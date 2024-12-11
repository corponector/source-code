'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { Button, Form, Row, Col } from 'react-bootstrap';

interface NotificationFormData {
  message: string;
}

const SendNotificationForm: React.FC = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<NotificationFormData>();

  const handleSendNotification = async (message: string) => {
    try {
      // Here you would call your API or perform the action to send the notification
      console.log('Sending notification:', message);
      // Simulate API call with a timeout
      await new Promise(resolve => setTimeout(resolve, 1000));
      alert('Notification sent successfully!');
    } catch (error) {
      console.error('Error sending notification:', error);
      alert('Failed to send notification');
    } finally {
      reset();
    }
  };

  const onSubmit = (data: NotificationFormData) => {
    handleSendNotification(data.message);
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Row className="mb-4">
        <Col>
          <div className="shadow-sm p-4 bg-white rounded">
            <header className="bg-danger text-white p-3 rounded">
              <h3>Send Notifications</h3>
            </header>
            <section className="p-3">
              <Form.Group className="mb-3">
                <Form.Label>Notification Message</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  {...register('message', { required: 'This field is required' })}
                  isInvalid={!!errors.message}
                  placeholder="Enter your notification message here"
                />
                <Form.Control.Feedback type="invalid">
                  {errors.message?.message}
                </Form.Control.Feedback>
              </Form.Group>
              <Button type="submit" variant="danger">Send Site-Wide Notification</Button>
            </section>
          </div>
        </Col>
      </Row>
    </Form>
  );
};

export default SendNotificationForm;
