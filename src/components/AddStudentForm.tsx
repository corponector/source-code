'use client';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Form, Container, Row, Col } from 'react-bootstrap';
import { useSession } from 'next-auth/react';
import { addStudent } from '@/lib/dbActions';
import LoadingSpinner from '@/components/LoadingSpinner';
import { redirect } from 'next/navigation';
import swal from 'sweetalert';
import { AddStudentSchema } from '@/lib/validationSchemas';

const onSubmit = async (data: {
  name: string;
  location: string;
  aboutMe: string;
  education: string;
  email: string;
  skills: string;
  professionalPage: string;
  profileImage: string;
  owner: string;
}) => {
  console.log(data);
  // Handle form submission here
  await addStudent(data);
  swal('Success', 'Your item has been added', 'success', {
    timer: 2000,
  });
};

const AddStudentForm: React.FC = () => {
  const { data: session, status } = useSession();
  const currentUser = session?.user?.email || '';
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(AddStudentSchema),
  });

  if (status === 'loading') {
    return <LoadingSpinner />;
  }
  if (status === 'unauthenticated') {
    redirect('/auth/signin');
  }

  return (
    <Container className="mt-3">
      <h1>Student Additional Information</h1>
      <Form onSubmit={handleSubmit(onSubmit)}>
        {/* Name & Location Input */}
        <Row>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" {...register('name')} isInvalid={!!errors.name} />
              <Form.Control.Feedback type="invalid">{errors.name?.message}</Form.Control.Feedback>
            </Form.Group>
          </Col>

          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Location</Form.Label>
              <Form.Control type="text" {...register('location')} isInvalid={!!errors.location} />
              <Form.Control.Feedback type="invalid">{errors.location?.message}</Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>

        {/* About Me Input */}
        <Form.Group className="mb-3">
          <Form.Label>About Me</Form.Label>
          <Form.Control type="text" {...register('aboutMe')} isInvalid={!!errors.aboutMe} />
          <Form.Control.Feedback type="invalid">{errors.aboutMe?.message}</Form.Control.Feedback>
        </Form.Group>

        {/* Education Input */}
        <Form.Group className="mb-3">
          <Form.Label>Education</Form.Label>
          <Form.Control
            type="text"
            {...register('education')}
            isInvalid={!!errors.education}
            placeholder="BS in Computer Science, University of Hawaii at Manoa"
          />
          <Form.Control.Feedback type="invalid">{errors.education?.message}</Form.Control.Feedback>
        </Form.Group>

        {/* Skills Input */}
        <Form.Group className="mb-3">
          <Form.Label>Skills</Form.Label>
          <Form.Control type="text" {...register('skills')} isInvalid={!!errors.skills} />
          <Form.Control.Feedback type="invalid">{errors.skills?.message}</Form.Control.Feedback>
        </Form.Group>

        <Row>
          {/* Professional Page URL Input */}
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Professional Page</Form.Label>
              <Form.Control type="url" {...register('professionalPage')} isInvalid={!!errors.professionalPage} />
              <Form.Control.Feedback type="invalid">{errors.professionalPage?.message}</Form.Control.Feedback>
            </Form.Group>
          </Col>

          {/* Email Input */}
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Contact Email</Form.Label>
              <Form.Control type="email" {...register('email')} isInvalid={!!errors.email} />
              <Form.Control.Feedback type="invalid">{errors.email?.message}</Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>

        {/* Profile Image URL Input */}
        <Form.Group className="mb-3">
          <Form.Label>Profile Image URL</Form.Label>
          <Form.Control type="url" {...register('profileImage')} isInvalid={!!errors.profileImage} />
          <Form.Control.Feedback type="invalid">{errors.profileImage?.message}</Form.Control.Feedback>
        </Form.Group>

        <input type="hidden" {...register('owner')} value={currentUser} />

        {/* Submit Button */}
        <Button type="submit" variant="primary" className="mb-5">
          Submit
        </Button>
      </Form>
    </Container>
  );
};

export default AddStudentForm;
