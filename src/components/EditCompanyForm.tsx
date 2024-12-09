/* eslint-disable max-len */

'use client';

import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import swal from 'sweetalert';
import { yupResolver } from '@hookform/resolvers/yup';
import { Company } from '@prisma/client';
import { EditCompanySchema } from '@/lib/validationSchemas';
import { editCompany } from '@/lib/dbActions';

const onSubmit = async (data: {
  id: number;
  name: string;
  location: string;
  overview: string;
  links: string;
  profileImage: string;
  emails: string;
  owner: string;
}) => {
  await editCompany({
    ...data,
    links: data.links.split(',').map(link => link.trim()),
    emails: data.emails.split(',').map(email => email.trim()),
  });
  swal('Success', 'Your company has been updated', 'success', {
    timer: 2000,
  });
};

const EditCompanyForm = ({ company }: { company: Company }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(EditCompanySchema),
  });

  return (
    <Container className="py-3">
      <h2>Edit Company</h2>

      <Form onSubmit={handleSubmit(onSubmit)}>
        <input type="hidden" {...register('id')} value={company.id} />

        {/* Name & Location Input */}
        <Row>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Company Name</Form.Label>
              <Form.Control type="text" {...register('name')} isInvalid={!!errors.name} defaultValue={company.name} />
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
                defaultValue={company.location}
              />
              <Form.Control.Feedback type="invalid">{errors.location?.message}</Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>

        {/* Overview Input */}
        <Form.Group className="mb-3">
          <Form.Label>Overview</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            {...register('overview')}
            isInvalid={!!errors.overview}
            defaultValue={company.overview}
          />
          <Form.Control.Feedback type="invalid">{errors.overview?.message}</Form.Control.Feedback>
        </Form.Group>

        {/* Links Input */}
        <Form.Group className="mb-3">
          <Form.Label>Links (Website or Social Media)</Form.Label>
          <Form.Control type="url" {...register('links')} isInvalid={!!errors.links} defaultValue={company.links} />
          <Form.Control.Feedback type="invalid">{errors.links?.message}</Form.Control.Feedback>
        </Form.Group>

        {/* Emails Input */}
        <Form.Group className="mb-3">
          <Form.Label>Contact Email</Form.Label>
          <Form.Control
            type="email"
            {...register('emails')}
            isInvalid={!!errors.emails}
            defaultValue={company.emails}
          />
          <Form.Control.Feedback type="invalid">{errors.emails?.message}</Form.Control.Feedback>
        </Form.Group>

        {/* Profile Image URL Input */}
        <Form.Group className="mb-3">
          <Form.Label>Profile Image URL</Form.Label>
          <Form.Control type="url" {...register('profileImage')} isInvalid={!!errors.profileImage} defaultValue={company.profileImage} />
          <Form.Control.Feedback type="invalid">{errors.profileImage?.message}</Form.Control.Feedback>
        </Form.Group>

        <input type="hidden" {...register('owner')} value={company.owner} />

        {/* Submit Button */}
        <Button type="submit" variant="primary">
          Submit
        </Button>
      </Form>
    </Container>
  );
};

export default EditCompanyForm;
