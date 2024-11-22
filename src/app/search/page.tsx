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
  const [filterType, setFilterType] = useState<'students' | 'companies'>('students');
  const [selectedSkills, setSelectedSkills] = useState<{ value: string; label: string }[]>([]);
  const [selectedLocations, setSelectedLocations] = useState<{ value: string; label: string }[]>([]);
  const [skillOptions, setSkillOptions] = useState<{ value: string; label: string }[]>([]);
  const [locationOptions, setLocationOptions] = useState<{ value: string; label: string }[]>([]);

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

    // Generate skill options based on student data
    const skills = new Set<string>();
    exampleStudents.forEach(student => {
      student.skills.forEach(skill => skills.add(skill));
    });
    const skillOptions = Array.from(skills).map(skill => ({ value: skill, label: skill }));
    setSkillOptions(skillOptions);

    // Generate location options based on student and company data
    const locations = new Set<string>();
    exampleStudents.forEach(student => locations.add(student.location));
    exampleCompanies.forEach(company => locations.add(company.location));
    const locationOptions = Array.from(locations).map(location => ({ value: location, label: location }));
    setLocationOptions(locationOptions);
  }, []);

  const onSubmit: SubmitHandler<{ query?: string | null }> = (data) => {
    const query = data.query?.toLowerCase() || '';
    if (query === '' && selectedSkills.length === 0 && selectedLocations.length === 0) {
      setFilteredStudents(students);
      setFilteredCompanies(companies);
    } else if (filterType === 'students') {
      const filteredStudents = students.filter(student => {
        const matchesQuery = student.name.toLowerCase().includes(query)
            || student.skills.some((skill: string) => skill.toLowerCase().includes(query));
        const matchesSkills = selectedSkills.length === 0 || selectedSkills.every(skill => student.skills.includes(skill.value));
        const matchesLocations = selectedLocations.length === 0 || selectedLocations.some(location => student.location === location.value);
        return matchesQuery && matchesSkills && matchesLocations;
      });
      setFilteredStudents(filteredStudents);
      setFilteredCompanies([]);
    } else {
      const filteredCompanies = companies.filter(company => {
        const matchesQuery = company.name.toLowerCase().includes(query)
            || company.overview.toLowerCase().includes(query)
            || company.location.toLowerCase().includes(query);
        const matchesLocations = selectedLocations.length === 0 || selectedLocations.some(location => company.location === location.value);
        return matchesQuery && matchesLocations;
      });
      setFilteredCompanies(filteredCompanies);
      setFilteredStudents([]);
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
          <Form.Control as="select" value={filterType} onChange={(e) => setFilterType(e.target.value as 'students' | 'companies')}>
            <option value="students">Students</option>
            <option value="companies">Companies</option>
          </Form.Control>
        </Form.Group>
        {filterType === 'students' && (
          <>
            <Form.Group controlId="skills" className="mb-3">
              <Form.Label>Skills</Form.Label>
              <Select
                isMulti
                options={skillOptions}
                value={selectedSkills}
                onChange={(selected) => setSelectedSkills(selected as { value: string; label: string }[])}
              />
            </Form.Group>
            <Form.Group controlId="locations" className="mb-3">
              <Form.Label>Location</Form.Label>
              <Select
                isMulti
                options={locationOptions}
                value={selectedLocations}
                onChange={(selected) => setSelectedLocations(selected as { value: string; label: string }[])}
              />
            </Form.Group>
          </>
        )}
        {filterType === 'companies' && (
          <Form.Group controlId="locations" className="mb-3">
            <Form.Label>Location</Form.Label>
            <Select
              isMulti
              options={locationOptions}
              value={selectedLocations}
              onChange={(selected) => setSelectedLocations(selected as { value: string; label: string }[])}
            />
          </Form.Group>
        )}
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
        <Row>
          {filterType === 'students' && (
            <Col md={12}>
              <h2>Students</h2>
              {filteredStudents.length > 0 ? (
                filteredStudents.map((student) => (
                  <StudentCard key={student.id} student={student} />
                ))
              ) : (
                <Alert variant="info">No students found</Alert>
              )}
            </Col>
          )}
          {filterType === 'companies' && (
            <Col md={12}>
              <h2>Companies</h2>
              {filteredCompanies.length > 0 ? (
                filteredCompanies.map((company) => (
                  <CompanyCard key={company.id} company={company} />
                ))
              ) : (
                <Alert variant="info">No companies found</Alert>
              )}
            </Col>
          )}
        </Row>
      </div>
    </Container>
  );
};

export default SearchPage;
