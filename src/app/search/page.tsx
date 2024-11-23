/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable max-len */
/* eslint-disable react/no-array-index-key */

'use client';

import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { searchSchema } from '@/lib/validationSchemas';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { Container, Form, Button, Alert, InputGroup, Row, Col } from 'react-bootstrap';
import { Search } from 'react-bootstrap-icons';
import Select from 'react-select';
import StudentCard from '@/components/StudentCard';
import CompanyCard from '@/components/CompanyCard';
import LoadingSpinner from '@/components/LoadingSpinner';
import { Student, Company } from '@/components/Interface';

const SearchPage: React.FC = () => {
  const { status } = useSession();
  const [students, setStudents] = useState<Student[]>([]);
  const [companies, setCompanies] = useState<Company[]>([]);
  const [filteredStudents, setFilteredStudents] = useState<Student[]>([]);
  const [filteredCompanies, setFilteredCompanies] = useState<Company[]>([]);
  const [, setSearchPerformed] = useState(false);
  const [filterType, setFilterType] = useState<'students' | 'companies' | ''>('');
  const [selectedTags, setSelectedTags] = useState<{ value: string; label: string }[]>([]);
  const [tagOptions, setTagOptions] = useState<{ value: string; label: string }[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(searchSchema),
  });

  useEffect(() => {
    // Example data for students and companies
    const exampleStudents: Student[] = [
      {
        id: 1,
        name: 'John Doe',
        skills: ['JavaScript', 'React', 'Node.js'],
        professionalPage: 'https://linkedin.com/in/johndoe',
        location: 'San Francisco, CA',
        email: 'johndoe@gmail.com',
      },
      {
        id: 2,
        name: 'Jane Smith',
        skills: ['Python', 'Django', 'Machine Learning'],
        professionalPage: 'https://linkedin.com/in/janesmith',
        location: 'New York, NY',
        email: 'jane@smith.com',
      },
    ];

    const exampleCompanies: Company[] = [
      {
        id: 1,
        name: 'Tech Corp',
        overview: 'A leading tech company specializing in software development.',
        location: 'San Francisco, CA',
        links: ['https://techcorp.com', 'https://linkedin.com/company/techcorp'],
        emails: ['contact@techcorp.com'],
      },
      {
        id: 2,
        name: 'Innovate Ltd',
        overview: 'Innovative solutions for modern problems.',
        location: 'New York, NY',
        links: ['https://innovateltd.com', 'https://linkedin.com/company/innovateltd'],
        emails: ['info@innovateltd.com'],
      },
    ];

    setStudents(exampleStudents);
    setCompanies(exampleCompanies);
    setFilteredStudents(exampleStudents);
    setFilteredCompanies(exampleCompanies);

    // Generate tag options based on student and company data
    const tags = new Set<{ value: string; label: string }>();
    exampleStudents.forEach(student => {
      student.skills.forEach(skill => tags.add({ value: skill, label: `Skill: ${skill}` }));
      tags.add({ value: student.location, label: `Location: ${student.location}` });
    });
    exampleCompanies.forEach(company => {
      tags.add({ value: company.location, label: `Location: ${company.location}` });
    });

    const sortedTags = Array.from(tags).sort((a, b) => a.label.localeCompare(b.label));
    setTagOptions(sortedTags);
  }, []);

  const onSubmit: SubmitHandler<{ query?: string | null }> = (data) => {
    const query = data.query?.toLowerCase() || '';
    if (query === '' && selectedTags.length === 0) {
      setFilteredStudents(students);
      setFilteredCompanies(companies);
    } else {
      const filteredStudents = students.filter(student => {
        const matchesQuery = student.name.toLowerCase().includes(query)
            || student.skills.some((skill: string) => skill.toLowerCase().includes(query));
        const matchesTags = selectedTags.length === 0 || selectedTags.every(tag => student.skills.includes(tag.value) || student.location === tag.value);
        return matchesQuery && matchesTags;
      });

      const filteredCompanies = companies.filter(company => {
        const matchesQuery = company.name.toLowerCase().includes(query)
            || company.overview.toLowerCase().includes(query)
            || company.location.toLowerCase().includes(query);
        const matchesTags = selectedTags.length === 0 || selectedTags.some(tag => company.location === tag.value);
        return matchesQuery && matchesTags;
      });

      if (filterType === 'students') {
        setFilteredStudents(filteredStudents);
        setFilteredCompanies([]);
      } else if (filterType === 'companies') {
        setFilteredCompanies(filteredCompanies);
        setFilteredStudents([]);
      } else {
        setFilteredStudents(filteredStudents);
        setFilteredCompanies(filteredCompanies);
      }
    }
    setSearchPerformed(true);
  };

  if (status === 'loading') {
    return <LoadingSpinner />;
  }

  return (
    <Container className="d-flex flex-column align-items-center justify-content-start min-vh-100">
      <h1>Search</h1>
      <Form onSubmit={handleSubmit(onSubmit)} className="w-50 mb-4">
        <Form.Group controlId="filterType" className="mb-3">
          <Form.Label>Filter By</Form.Label>
          <Form.Control as="select" value={filterType} onChange={(e) => setFilterType(e.target.value as 'students' | 'companies' | '')}>
            <option value="">Students & Companies </option>
            <option value="students">Students Only</option>
            <option value="companies">Companies Only</option>
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="tags" className="mb-3">
          <Form.Label>Tags</Form.Label>
          <Select
            isMulti
            options={tagOptions}
            value={selectedTags}
            onChange={(selected) => setSelectedTags(selected as { value: string; label: string }[])}
          />
        </Form.Group>
        <Form.Group controlId="query" className="mb-3">
          <InputGroup>
            <Form.Control type="text" {...register('query')} isInvalid={!!errors.query} />
            <Button type="submit" variant="primary">
              <Search />
            </Button>
            <Form.Control.Feedback type="invalid">
              {errors.query?.message}
            </Form.Control.Feedback>
          </InputGroup>
        </Form.Group>
      </Form>
      <div className="w-100 mt-4">
        <Row className="justify-content-center">
          {(filterType === 'students' || filterType === '') && (
            <Col md={6}>
              <h2 className={filterType === 'students' ? 'text-center' : 'text-right ml-5'}>Students</h2>
              <Row className="justify-content-center">
                {filteredStudents.length > 0 ? (
                  filteredStudents.map((student) => (
                    <Col md={6} key={student.id}>
                      <StudentCard student={student} />
                    </Col>
                  ))
                ) : (
                  <Col>
                    <Alert variant="info">No students found</Alert>
                  </Col>
                )}
              </Row>
            </Col>
          )}
          {(filterType === 'companies' || filterType === '') && (
            <Col md={6}>
              <h2 className={filterType === 'companies' ? 'text-center' : 'text-right mr-5'}>Companies</h2>
              <Row className="justify-content-center">
                {filteredCompanies.length > 0 ? (
                  filteredCompanies.map((company) => (
                    <Col md={6} key={company.id}>
                      <CompanyCard company={company} />
                    </Col>
                  ))
                ) : (
                  <Col>
                    <Alert variant="info">No companies found</Alert>
                  </Col>
                )}
              </Row>
            </Col>
          )}
        </Row>
      </div>
    </Container>
  );
};

export default SearchPage;
