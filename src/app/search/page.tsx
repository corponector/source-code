/* eslint-disable import/no-duplicates */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable max-len */

'use client';

import React from 'react';
import { Container, Row, Col, Form, Button, Alert, InputGroup } from 'react-bootstrap';
import Select from 'react-select';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { searchSchema } from '@/lib/validationSchemas';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import StudentCard from '@/components/StudentCard';
import CompanyCard from '@/components/CompanyCard';
import LoadingSpinner from '@/components/LoadingSpinner';
import { Student, Company, Position } from '@/components/Interface';
import { Search } from 'react-bootstrap-icons';

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

    const examplePositions: Position[] = [
      {
        id: 1,
        title: 'Software Engineer',
        description: 'Develop and maintain software applications.',
        skills: ['JavaScript', 'React', 'Node.js'],
        jobType: ['PERMANENT'],
        numberOfHires: 2,
        salaryRange: '$80,000 - $120,000',
        tagTitle: 'Full-time',
        companyId: 1,
      },
      {
        id: 2,
        title: 'Data Scientist',
        description: 'Analyze and interpret complex data.',
        skills: ['Python', 'Machine Learning', 'Data Analysis'],
        jobType: ['PERMANENT'],
        numberOfHires: 1,
        salaryRange: '$90,000 - $130,000',
        tagTitle: 'Full-time',
        companyId: 2,
      },
    ];

    const exampleCompanies: Company[] = [
      {
        id: 1,
        name: 'Tech Corp',
        overview: 'A leading tech company specializing in software development.',
        location: 'San Francisco, CA',
        emails: ['contact@techcorp.com'],
        positions: examplePositions.filter(position => position.companyId === 1),
        links: [],
      },
      {
        id: 2,
        name: 'Innovate Ltd',
        overview: 'Innovative solutions for modern problems.',
        location: 'New York, NY',
        emails: ['info@innovateltd.com'],
        positions: examplePositions.filter(position => position.companyId === 2),
        links: [],
      },
    ];

    setStudents(exampleStudents);
    setCompanies(exampleCompanies);
    setFilteredStudents(exampleStudents);
    setFilteredCompanies(exampleCompanies);

    // Generate tag options based on student and company data
    const generateTagOptions = (filterType: 'students' | 'companies' | '') => {
      const tags = new Set<{ value: string; label: string }>();
      if (filterType === 'students' || filterType === '') {
        exampleStudents.forEach(student => {
          student.skills.forEach(skill => tags.add({ value: skill, label: `Skill: ${skill}` }));
          tags.add({ value: student.location, label: `Location: ${student.location}` });
        });
      }
      if (filterType === 'companies' || filterType === '') {
        exampleCompanies.forEach(company => {
          tags.add({ value: company.location, label: `Location: ${company.location}` });
          company.positions.forEach(position => {
            tags.add({ value: position.title, label: `Position: ${position.title}` });
          });
        });
      }
      return Array.from(tags).sort((a, b) => a.label.localeCompare(b.label));
    };

    setTagOptions(generateTagOptions(filterType));
  }, [filterType]);

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
        const matchesTags = selectedTags.length === 0 || selectedTags.some(tag => company.location === tag.value || company.positions.some(position => position.title === tag.value));
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
            <option value="">Companies & Students</option>
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
