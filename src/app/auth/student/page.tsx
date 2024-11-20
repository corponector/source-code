// src/app/student/page.tsx

'use client';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { Button, Form } from 'react-bootstrap';

type StudentForm = {
  name: string;
  skills: string;
  professionalPage: string;
};

const StudentPage = () => {
  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    skills: Yup.string().required('Skills are required'),
    professionalPage: Yup.string().url('Must be a valid URL').required('Professional page is required'),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<StudentForm>({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = (data: StudentForm) => {
    // Handle form submission here
    console.log(data);
  };

  return (
    <div>
      <h1>Student Additional Information</h1>
      <Form onSubmit={handleSubmit(onSubmit)}>
        {/* Name Input */}
        <Form.Group className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" {...register('name')} isInvalid={!!errors.name} />
          <Form.Control.Feedback type="invalid">{errors.name?.message}</Form.Control.Feedback>
        </Form.Group>

        {/* Skills Input */}
        <Form.Group className="mb-3">
          <Form.Label>Skills</Form.Label>
          <Form.Control type="text" {...register('skills')} isInvalid={!!errors.skills} />
          <Form.Control.Feedback type="invalid">{errors.skills?.message}</Form.Control.Feedback>
        </Form.Group>

        {/* Professional Page URL Input */}
        <Form.Group className="mb-3">
          <Form.Label>Professional Page</Form.Label>
          <Form.Control type="url" {...register('professionalPage')} isInvalid={!!errors.professionalPage} />
          <Form.Control.Feedback type="invalid">{errors.professionalPage?.message}</Form.Control.Feedback>
        </Form.Group>

        {/* Brings Student to Student Page */}
        <Button type="submit" className="btn btn-primary">
          <a href="/app" className="text-white text-decoration-none">
            Submit
          </a>
        </Button>
      </Form>
    </div>
  );
};

export default StudentPage;
