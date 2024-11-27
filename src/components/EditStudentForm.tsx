'use client';

import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import swal from 'sweetalert';
import { yupResolver } from '@hookform/resolvers/yup';
import { Student } from '@prisma/client';
import { EditStudentSchema } from '@/lib/validationSchemas';
import { editStudent } from '@/lib/dbActions';

const onSubmit = async (data: {
  id: number;
  name: string;
  location: string;
  skills: string;
  professionalPage: string;
  owner: string;
}) => {
  // console.log(`onSubmit data: ${JSON.stringify(data, null, 2)}`);
  await editStudent(data);
  swal('Success', 'Your item has been updated', 'success', {
    timer: 2000,
  });
};

const EditStudentForm = ({ student }: { student: Student }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(EditStudentSchema),
  });
  // console.log(stuff);

  return (
    <Container className="py-3">
      <h2>Edit Student</h2>

      <Form onSubmit={handleSubmit(onSubmit)}>
        <input type="hidden" {...register('id')} value={student.id} />
        {/* Name & Location Input */}

        <Row>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" {...register('name')} isInvalid={!!errors.name} defaultValue={student.name} />
              <Form.Control.Feedback type="invalid">{errors.name?.message}</Form.Control.Feedback>
            </Form.Group>
          </Col>

          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Location</Form.Label>
              <Form.Control
                type="text"
                {...register('location')}
                isInvalid={!!errors.location}
                defaultValue={student.location}
              />
              <Form.Control.Feedback type="invalid">{errors.location?.message}</Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>

        {/* Skills Input */}
        <Form.Group className="mb-3">
          <Form.Label>Skills</Form.Label>
          <Form.Control
            type="text"
            {...register('skills')}
            isInvalid={!!errors.skills}
            defaultValue={student.skills.join(', ')}
          />
          <Form.Control.Feedback type="invalid">{errors.skills?.message}</Form.Control.Feedback>
        </Form.Group>

        {/* Professional Page URL Input */}
        <Form.Group className="mb-3">
          <Form.Label>Professional Page</Form.Label>
          <Form.Control
            type="url"
            {...register('professionalPage')}
            isInvalid={!!errors.professionalPage}
            defaultValue={student.professionalPage}
          />
          <Form.Control.Feedback type="invalid">{errors.professionalPage?.message}</Form.Control.Feedback>
        </Form.Group>

        <input type="hidden" {...register('owner')} value={student.owner} />

        {/* Brings Student to Student Page */}
        <Button type="submit" variant="primary">
          Submit
        </Button>
      </Form>
    </Container>
  );
};

export default EditStudentForm;
