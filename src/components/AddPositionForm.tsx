'use client';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Form, Container, Row, Col } from 'react-bootstrap';
// import { addCompany } from '@/lib/dbActions';
import { AddCompanySchema } from '@/lib/validationSchemas';
import swal from 'sweetalert';
import LoadingSpinner from '@/components/LoadingSpinner';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';

const onSubmit = async (data: {
  name: string;
  overview: string;
  location: string;
  // positions: string;
  links: string;
  emails: string;
  owner: string;
}) => {
  // Handle form submission here
  console.log(data);
  // await addCompany(data);
  swal('Success', 'Your item has been added', 'success', {
    timer: 2000,
  });
};

const AddPositionForm: React.FC = () => {
  const { data: session, status } = useSession();
  // console.log('AddStuffForm', status, session);
  const currentUser = session?.user?.email || '';
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(AddCompanySchema),
  });

  if (status === 'loading') {
    return <LoadingSpinner />;
  }
  if (status === 'unauthenticated') {
    redirect('/auth/signin');
  }

  return (
    <Container className="mt-3">
      <h1>Company Additional Information</h1>
      <Form onSubmit={handleSubmit(onSubmit)}>

        <Row>
          {/* Company Name Input */}
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Company Name</Form.Label>
              <Form.Control type="text" {...register('name')} isInvalid={!!errors.name} />
              <Form.Control.Feedback type="invalid">{errors.name?.message}</Form.Control.Feedback>
            </Form.Group>
          </Col>

          {/* Location Input */}
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Location</Form.Label>
              <Form.Control type="text" {...register('location')} isInvalid={!!errors.location} />
              <Form.Control.Feedback type="invalid">{errors.location?.message}</Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>

        {/* Overview Input */}
        <Form.Group className="mb-3">
          <Form.Label>Overview</Form.Label>
          <Form.Control as="textarea" rows={3} {...register('overview')} isInvalid={!!errors.overview} />
          <Form.Control.Feedback type="invalid">{errors.overview?.message}</Form.Control.Feedback>
        </Form.Group>

        {/* Positions Input */}
        <Form.Group className="mb-3">
          <Form.Label>Job Positions</Form.Label>
          <Form.Control type="text" {...register('positions')} isInvalid={!!errors.positions} />
          <Form.Control.Feedback type="invalid">{errors.positions?.message}</Form.Control.Feedback>
        </Form.Group>

        {/* Links Input */}
        <Form.Group className="mb-3">
          <Form.Label>Links (Website or Social Media)</Form.Label>
          <Form.Control type="url" {...register('links')} isInvalid={!!errors.links} />
          <Form.Control.Feedback type="invalid">{errors.links?.message}</Form.Control.Feedback>
        </Form.Group>

        {/* Contact Email Input */}
        <Form.Group className="mb-3">
          <Form.Label>Contact Email</Form.Label>
          <Form.Control type="email" {...register('emails')} isInvalid={!!errors.emails} />
          <Form.Control.Feedback type="invalid">{errors.emails?.message}</Form.Control.Feedback>
        </Form.Group>

        <input type="hidden" {...register('owner')} value={currentUser} />

        {/* Brings Company to Company Page */}
        <Button type="submit" variant="primary">
          Submit
        </Button>
      </Form>
    </Container>
  );
};

export default AddPositionForm;
