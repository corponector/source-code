/* eslint-disable max-len */

'use client';

import { useForm, useFieldArray } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Form, Container, Row, Col } from 'react-bootstrap';
import { addCompany } from '@/lib/dbActions';
import { AddCompanySchema } from '@/lib/validationSchemas';
import { Position } from '@/components/Interface';
import swal from 'sweetalert';
import LoadingSpinner from '@/components/LoadingSpinner';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const onSubmit = async (data: {
  name: string;
  overview: string;
  location: string;
  positions: Position[] | undefined;
  links: string;
  emails: string;
  profileImage: string;
  owner: string;
}) => {
  const formattedData = {
    ...data,
    positions: (data.positions ?? []).map((position) => ({
      ...position,
      skills: Array.isArray(position.skills)
        ? position.skills
        : (position.skills ?? ('' as string)).split(',').map((skill) => skill.trim()),
      jobType: Array.isArray(position.jobType)
        ? position.jobType
        : (position.jobType ?? '').split(',').map((type) => type.trim()),
    })),
  };

  try {
    await addCompany(formattedData);
    swal('Success', 'Your item has been added', 'success', {
      timer: 2000,
    });
  } catch (error) {
    swal('Error', 'There was an error adding the item', 'error');
  }
};

const AddCompanyForm: React.FC = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const currentUser = session?.user?.email || '';
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<{
    name: string;
    overview: string;
    location: string;
    positions: Position[];
    links: string;
    emails: string;
    profileImage: string;
    owner: string;
  }>({
    resolver: yupResolver(AddCompanySchema) as any,
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'positions',
  });

  if (status === 'loading') {
    return <LoadingSpinner />;
  }
  if (status === 'unauthenticated') {
    router.push('/auth/signin');
    return null;
  }

  return (
    <Container className="mt-3 mb-3">
      <h1>Company Additional Information</h1>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Row>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Company Name</Form.Label>
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
        <Form.Group className="mb-3">
          <Form.Label>Overview</Form.Label>
          <Form.Control as="textarea" rows={3} {...register('overview')} isInvalid={!!errors.overview} />
          <Form.Control.Feedback type="invalid">{errors.overview?.message}</Form.Control.Feedback>
        </Form.Group>
        <Form.Label><p className="fs-3">Job Positions</p></Form.Label>
        {fields.map((field, index) => (
          <div key={field.id} className="mb-3">
            <Row>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>Title</Form.Label>
                  <Form.Control
                    type="text"
                    {...register(`positions.${index}.title`)}
                    isInvalid={!!errors.positions?.[index]?.title}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.positions?.[index]?.title?.message}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    type="text"
                    {...register(`positions.${index}.description`)}
                    isInvalid={!!errors.positions?.[index]?.description}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.positions?.[index]?.description?.message}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>Skills</Form.Label>
                  <Form.Control
                    type="text"
                    {...register(`positions.${index}.skills`)}
                    isInvalid={!!errors.positions?.[index]?.skills}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.positions?.[index]?.skills?.message}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>Job Type</Form.Label>
                  <Form.Control
                    type="text"
                    {...register(`positions.${index}.jobType`)}
                    isInvalid={!!errors.positions?.[index]?.jobType}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.positions?.[index]?.jobType?.message}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>Number of Hires</Form.Label>
                  <Form.Control
                    type="number"
                    {...register(`positions.${index}.numberOfHires`)}
                    isInvalid={!!errors.positions?.[index]?.numberOfHires}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.positions?.[index]?.numberOfHires?.message}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>Salary Range</Form.Label>
                  <Form.Control
                    type="number"
                    {...register(`positions.${index}.salaryRange`)}
                    isInvalid={!!errors.positions?.[index]?.salaryRange}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.positions?.[index]?.salaryRange?.message}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>
            <Button variant="danger" onClick={() => remove(index)}>
              Remove Position
            </Button>
          </div>
        ))}
        <Button
          variant="secondary"
          onClick={() =>
            append({
              id: fields.length + 1,
              title: '',
              description: '',
              skills: [],
              jobType: '',
              numberOfHires: 0,
              salaryRange: 0,
            })
          }
        >
          Add Position
        </Button>
        <Form.Group className="mb-3">
          <Form.Label>Links (Website or Social Media)</Form.Label>
          <Form.Control type="url" {...register('links')} isInvalid={!!errors.links} />
          <Form.Control.Feedback type="invalid">{errors.links?.message}</Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Contact Email</Form.Label>
          <Form.Control type="email" {...register('emails')} isInvalid={!!errors.emails} />
          <Form.Control.Feedback type="invalid">{errors.emails?.message}</Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Profile Image URL</Form.Label>
          <Form.Control type="url" {...register('profileImage')} isInvalid={!!errors.profileImage} />
          <Form.Control.Feedback type="invalid">{errors.profileImage?.message}</Form.Control.Feedback>
        </Form.Group>
        <input type="hidden" {...register('owner')} value={currentUser} />
        <Button type="submit" variant="primary">
          Submit
        </Button>
      </Form>
    </Container>
  );
};

export default AddCompanyForm;
