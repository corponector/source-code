/* eslint-disable react/no-array-index-key */

'use client';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import swal from 'sweetalert';
import { searchStuff } from '@/lib/dbActions';
import LoadingSpinner from '@/components/LoadingSpinner';
import { searchSchema } from '@/lib/validationSchemas';
import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { Container, Form, Button, Alert, InputGroup } from 'react-bootstrap';
import { Search } from 'react-bootstrap-icons';

// eslint-disable-next-line max-len
const onSubmit = async (data: { query: string }, setResults: (results: any[]) => void, setSearchPerformed: (value: boolean) => void) => {
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
  const [results, setResults] = useState<any[]>([]);
  const [searchPerformed, setSearchPerformed] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(searchSchema),
  });

  if (status === 'loading') {
    return <LoadingSpinner />;
  }

  return (
    <Container className="d-flex flex-column align-items-center justify-content-center min-vh-100">
      <h1>Search</h1>
      <Form onSubmit={handleSubmit((data) => onSubmit(data, setResults, setSearchPerformed))} className="w-50">
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
      <div className="w-50 mt-4">
        {searchPerformed && (
          results.length > 0 ? (
            <ul>
              {results.map((result, index) => (
                <li key={index}>{result.name}</li>
              ))}
            </ul>
          ) : (
            <Alert variant="info">No results found</Alert>
          )
        )}
      </div>
    </Container>
  );
};

export default SearchPage;
