// src/app/company/page.tsx

'use client';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { Button, Form } from 'react-bootstrap';

type CompanyForm = {
  companyName: string;
  overview: string;
  location: string;
  positions: string;
  links: string;
  contactEmail: string;
};

const CompanyPage = () => {
  const validationSchema = Yup.object().shape({
    companyName: Yup.string().required('Company Name is required'),
    overview: Yup.string().required('Overview is required'),
    location: Yup.string().required('Location is required'),
    positions: Yup.string().required('Positions are required'),
    links: Yup.string().url('Must be a valid URL').required('Links are required'),
    contactEmail: Yup.string().email('Must be a valid email').required('Contact Email is required'),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CompanyForm>({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = (data: CompanyForm) => {
    // Handle form submission here
    console.log(data);
  };

  return (
    <div>
      <h1>Company Additional Information</h1>
      <Form onSubmit={handleSubmit(onSubmit)}>
        {/* Company Name Input */}
        <Form.Group className="mb-3">
          <Form.Label>Company Name</Form.Label>
          <Form.Control type="text" {...register('companyName')} isInvalid={!!errors.companyName} />
          <Form.Control.Feedback type="invalid">{errors.companyName?.message}</Form.Control.Feedback>
        </Form.Group>

        {/* Overview Input */}
        <Form.Group className="mb-3">
          <Form.Label>Overview</Form.Label>
          <Form.Control as="textarea" rows={3} {...register('overview')} isInvalid={!!errors.overview} />
          <Form.Control.Feedback type="invalid">{errors.overview?.message}</Form.Control.Feedback>
        </Form.Group>

        {/* Location Input */}
        <Form.Group className="mb-3">
          <Form.Label>Location</Form.Label>
          <Form.Control type="text" {...register('location')} isInvalid={!!errors.location} />
          <Form.Control.Feedback type="invalid">{errors.location?.message}</Form.Control.Feedback>
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
          <Form.Control type="email" {...register('contactEmail')} isInvalid={!!errors.contactEmail} />
          <Form.Control.Feedback type="invalid">{errors.contactEmail?.message}</Form.Control.Feedback>
        </Form.Group>

        {/* Brings Company to Company Page */}
        <Button type="submit" className="btn btn-primary">
          <a href="/app">Submit</a>
        </Button>
      </Form>
    </div>
  );
};

export default CompanyPage;
