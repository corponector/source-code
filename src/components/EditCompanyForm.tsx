/* eslint-disable max-len */
/* eslint-disable react/prop-types */

'use client';

import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import { useForm, useFieldArray } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import swal from 'sweetalert';
import { Company, Position } from '@/components/Interface';
import { EditCompanySchema } from '@/lib/validationSchemas'; // Assuming you have a validation schema
import { editCompany } from '@/lib/dbActions'; // Assuming you have an API function to edit the company

interface EditCompanyFormProps {
  company: Company & { positions: Position[] };
}

const EditCompanyForm: React.FC<EditCompanyFormProps> = ({ company }) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(EditCompanySchema),
    defaultValues: {
      ...company,
      links: Array.isArray(company.links) ? company.links.join(', ') : company.links,
      emails: Array.isArray(company.emails) ? company.emails.join(', ') : company.emails,
      positions: company.positions.map((position) => ({
        ...position,
        skills: Array.isArray(position.skills) ? position.skills.join(', ') : position.skills,
        jobType: Array.isArray(position.jobType) ? position.jobType.join(', ') : position.jobType,
      })),
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'positions',
  });

  const onSubmit = async (data: {
    id: number;
    name: string;
    location: string;
    overview: string;
    links: string;
    profileImage: string;
    emails: string;
    owner: string;
    positions: Position[];
  }) => {
    const formattedData = {
      ...data,
      links: data.links.split(',').map((link) => link.trim()),
      emails: data.emails.split(',').map((email) => email.trim()),
      positions: data.positions.map((position) => ({
        ...position,
        skills: typeof position.skills === 'string' ? position.skills.split(',').map((skill) => skill.trim()) : position.skills,
        jobType: typeof position.jobType === 'string' ? position.jobType.split(',').map((type) => type.trim()) : position.jobType,
        id: position.id,
        companyId: company.id,
      })),
    };

    try {
      await editCompany(formattedData);
      swal('Success', 'Your company has been updated', 'success', {
        timer: 2000,
      });
    } catch (error) {
      swal('Error', 'There was an error updating the company', 'error');
    }
  };

  return (
    <Container className="py-3">
      <h2>Edit Company</h2>

      <Form onSubmit={handleSubmit(onSubmit)}>
        <input type="hidden" {...register('id')} value={company.id} />

        {/* Name & Location Input */}
        <Row>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                {...register('name')}
                isInvalid={!!errors.name}
                defaultValue={company.name}
              />
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
          <Form.Control
            type="text"
            {...register('links')}
            isInvalid={!!errors.links}
            defaultValue={Array.isArray(company.links) ? company.links.join(', ') : company.links}
          />
          <Form.Control.Feedback type="invalid">{errors.links?.message}</Form.Control.Feedback>
        </Form.Group>

        {/* Emails Input */}
        <Form.Group className="mb-3">
          <Form.Label>Contact Email</Form.Label>
          <Form.Control
            type="email"
            {...register('emails')}
            isInvalid={!!errors.emails}
            defaultValue={Array.isArray(company.emails) ? company.emails.join(', ') : company.emails}
          />
          <Form.Control.Feedback type="invalid">{errors.emails?.message}</Form.Control.Feedback>
        </Form.Group>

        {/* Profile Image URL Input */}
        <Form.Group className="mb-3">
          <Form.Label>Profile Image URL</Form.Label>
          <Form.Control
            type="url"
            {...register('profileImage')}
            isInvalid={!!errors.profileImage}
            defaultValue={company.profileImage}
          />
          <Form.Control.Feedback type="invalid">{errors.profileImage?.message}</Form.Control.Feedback>
        </Form.Group>

        {/* Positions Input */}
        <h3 className="mt-5">Edit Positions</h3>
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
                    defaultValue={field.title}
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
                    defaultValue={field.description}
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
                    defaultValue={Array.isArray(field.skills) ? field.skills.join(', ') : field.skills}
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
                    defaultValue={Array.isArray(field.jobType) ? field.jobType.join(', ') : field.jobType}
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
                    defaultValue={field.numberOfHires}
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
                    defaultValue={field.salaryRange}
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
          onClick={() => append({
            id: fields.length + 1,
            title: '',
            description: '',
            skills: '',
            jobType: '',
            numberOfHires: 0,
            salaryRange: 0,
          })}
        >
          Add Position
        </Button>
        <div className="d-flex justify-content-center mt-3">
          <Button type="submit" variant="primary">
            Submit
          </Button>
        </div>
      </Form>
    </Container>
  );
};

export default EditCompanyForm;
