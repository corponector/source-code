/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable max-len */
/* eslint-disable react/no-array-index-key */

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import swal from 'sweetalert';
import { searchStuff } from '@/lib/dbActions';
import LoadingSpinner from '@/components/LoadingSpinner';
import { searchSchema } from '@/lib/validationSchemas';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { Container, Form, Button, Alert, InputGroup, Row, Col } from 'react-bootstrap';
import { Search } from 'react-bootstrap-icons';
import StudentCard from '@/components/StudentCard';
import CompanyCard from '@/components/CompanyCard';
import { prisma } from '@/lib/prisma';
import { Student, Company } from './Interface';

const onSubmit = async (data: { query: string }, setResults: (results: any) => void, setSearchPerformed: (value: boolean) => void) => {
  try {
    const results = await searchStuff(data.query);
    setResults(results);
    setSearchPerformed(true);
  } catch (error) {
    setSearchPerformed(true);
    swal('Error', 'Search failed', 'error', {
      timer: 2000,
    });
  }
};

const SearchPage: React.FC = () => {
  const { status } = useSession();
  const [results, setResults] = useState<{ companies: Company[]; students: Student[] }>({ companies: [], students: [] });
  const [searchPerformed, setSearchPerformed] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(searchSchema),
  });

  const [students, setStudents] = useState<Student[]>([]);
  const [companies, setCompanies] = useState<Company[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const students = await prisma.student.findMany();
      const companies = await prisma.company.findMany();
      setStudents(students);
      setCompanies(companies);
    };
    fetchData();
  }, []);

  if (status === 'loading') {
    return <LoadingSpinner />;
  }

  return (
    <Container className="d-flex flex-column align-items-center justify-content-start min-vh-100">
      <h1>Search</h1>
      <Form onSubmit={handleSubmit((data) => onSubmit(data, setResults, setSearchPerformed))} className="w-50 mb-4">
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
          <Col md={6}>
            <h2>Students</h2>
            {students.map((student) => (
              <StudentCard key={student.id} student={student} />
            ))}
          </Col>
          <Col md={6}>
            <h2>Companies</h2>
            {companies.map((company) => (
              <CompanyCard key={company.id} company={company} />
            ))}
          </Col>
        </Row>
        {searchPerformed && (
          <Row className="mt-4">
            <Col md={6}>
              <h2>Search Results - Students</h2>
              {results.students.length > 0 ? (
                results.students.map((student) => (
                  <StudentCard key={student.id} student={student} />
                ))
              ) : (
                <Alert variant="info">No students found</Alert>
              )}
            </Col>
            <Col md={6}>
              <h2>Search Results - Companies</h2>
              {results.companies.length > 0 ? (
                results.companies.map((company) => (
                  <CompanyCard key={company.id} company={company} />
                ))
              ) : (
                <Alert variant="info">No companies found</Alert>
              )}
            </Col>
          </Row>
        )}
      </div>
    </Container>
  );
};

export default SearchPage;
