/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable max-len */

'use client';

import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Alert, InputGroup } from 'react-bootstrap';
import Select from 'react-select';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { searchSchema, Student, Company, Position } from '@/lib/validationSchemas';
import { useSession } from 'next-auth/react';
import StudentCard from '@/components/StudentCard';
import CompanyCard from '@/components/CompanyCard';
import LoadingSpinner from '@/components/LoadingSpinner';
import { Search } from 'react-bootstrap-icons';

interface SearchPageProps {
  students: Student[];
  companies: Company[];
}

const SearchPageContent: React.FC<SearchPageProps> = ({ students, companies }) => {
  const { status } = useSession();
  const [filteredStudents, setFilteredStudents] = useState<Student[]>(students);
  const [filteredCompanies, setFilteredCompanies] = useState<Company[]>(companies);
  const [selectedTags, setSelectedTags] = useState<{ value: string; label: string }[]>([]);
  const [tagOptions, setTagOptions] = useState<{ value: string; label: string }[]>([]);
  const [filterType, setFilterType] = useState<'students' | 'companies' | ''>('');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(searchSchema),
  });

  useEffect(() => {
    setTagOptions(generateTagOptions(filterType));
  }, [filterType, students, companies]);

  // Generate tag options based on student and company data
  const generateTagOptions = (filterType: 'students' | 'companies' | '') => {
    const tags = new Set<{ value: string; label: string }>();
    if (filterType === 'students' || filterType === '') {
      students.forEach((student: Student) => {
        student.skills.forEach(skill => tags.add({ value: skill, label: `Skill: ${skill}` }));
        tags.add({ value: student.location, label: `Location: ${student.location}` });
      });
    }
    if (filterType === 'companies' || filterType === '') {
      companies.forEach((company: Company) => {
        tags.add({ value: company.location, label: `Location: ${company.location}` });
        company.positions.forEach((position: Position) => {
          tags.add({ value: position.title, label: `Position: ${position.title}` });
        });
      });
    }
    return Array.from(tags).sort((a, b) => a.label.localeCompare(b.label));
  };

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
          <Col md={8}>
            {filteredStudents.length > 0 && (
              <>
                <h2>Students</h2>
                {filteredStudents.map((student) => (
                  <StudentCard key={student.id} student={student} />
                ))}
              </>
            )}
            {filteredCompanies.length > 0 && (
              <>
                <h2>Companies</h2>
                {filteredCompanies.map((company) => (
                  <CompanyCard key={company.id} company={company} />
                ))}
              </>
            )}
            {filteredStudents.length === 0 && filteredCompanies.length === 0 && (
              <Alert variant="info">No results found</Alert>
            )}
          </Col>
        </Row>
      </div>
    </Container>
  );
};

export default SearchPageContent;
