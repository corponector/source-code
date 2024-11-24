/* eslint-disable import/no-duplicates */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable max-len */

'use client';

import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Form, Button, Alert, InputGroup } from 'react-bootstrap';
import Select from 'react-select';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { searchSchema } from '@/lib/validationSchemas';
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
    const fetchData = async () => {
      try {
        const [studentsRes, companiesRes] = await Promise.all([
          fetch('/api/students'),
          fetch('/api/companies'),
        ]);

        const fetchedStudents = await studentsRes.json();
        const fetchedCompanies = await companiesRes.json();

        setStudents(fetchedStudents);
        setCompanies(fetchedCompanies);
        setFilteredStudents(fetchedStudents);
        setFilteredCompanies(fetchedCompanies);

        // Generate tag options based on student and company data
        const generateTagOptions = (filterType: 'students' | 'companies' | '') => {
          const tags = new Set<{ value: string; label: string }>();
          if (filterType === 'students' || filterType === '') {
            fetchedStudents.forEach((student: Student) => {
              student.skills.forEach(skill => tags.add({ value: skill, label: `Skill: ${skill}` }));
              tags.add({ value: student.location, label: `Location: ${student.location}` });
            });
          }
          if (filterType === 'companies' || filterType === '') {
            fetchedCompanies.forEach((company: Company) => {
              tags.add({ value: company.location, label: `Location: ${company.location}` });
              company.positions.forEach((position: Position) => {
                tags.add({ value: position.title, label: `Position: ${position.title}` });
              });
            });
          }
          return Array.from(tags).sort((a, b) => a.label.localeCompare(b.label));
        };

        setTagOptions(generateTagOptions(filterType));
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    };

    fetchData();
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
            <option value="">Both</option>
            <option value="students">Students</option>
            <option value="companies">Companies</option>
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
              <h2 className={filterType === 'students' ? 'text-center' : 'text-left ml-5'}>Students</h2>
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
