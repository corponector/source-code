'use client';

import { redirect } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { Card, Col, Container, Button, Form, Row } from 'react-bootstrap';
import { createUser } from '@/lib/dbActions';
import { signIn } from 'next-auth/react';

type SignUpForm = {
  email: string;
  password: string;
  confirmPassword: string;
  role: string;
};

const SignUp = () => {
  // const router = useRouter();

  const validationSchema = Yup.object().shape({
    email: Yup.string().required('Email is required').email('Email is invalid'),
    password: Yup.string()
      .required('Password is required')
      .min(6, 'Password must be at least 6 characters')
      .max(40, 'Password must not exceed 40 characters'),
    confirmPassword: Yup.string()
      .required('Confirm Password is required')
      .oneOf([Yup.ref('password'), ''], 'Confirm Password does not match'),
    role: Yup.string().required('Please select a role'),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SignUpForm>({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = async (data: SignUpForm) => {
    // try {
    //   if (data.role === 'student') {
    //     router.push('/student');
    //   } else if (data.role === 'company') {
    //     router.push('/company');
    //   }
    // } catch (error) {
    //   console.error('Error during role-specific navigation:', error);
    // }
    // console.log(JSON.stringify(data, null, 2));
    await createUser(data);
    // After creating, signIn with redirect to the add page
    if (data.role === 'student') {
      await signIn('credentials', { callbackUrl: '/auth/student', ...data });
    } else if (data.role === 'company') {
      await signIn('credentials', { callbackUrl: '/auth/company', ...data });
    } else {
      console.error('Invalid role:');
      redirect('/auth/signup');
    }
  };

  return (
    <main>
      <Container className="py-5">
        <Row className="justify-content-center">
          <Col xs={5}>
            <h1 className="text-center">Sign Up</h1>
            <Card>
              <Card.Body>
                <Form onSubmit={handleSubmit(onSubmit)}>
                  {/* Email */}
                  <Form.Group className="form-group mb-3">
                    <Form.Label>Email</Form.Label>
                    <input
                      type="text"
                      {...register('email')}
                      className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                    />
                    <div className="invalid-feedback">{errors.email?.message}</div>
                  </Form.Group>

                  {/* Password */}
                  <Form.Group className="form-group mb-3">
                    <Form.Label>Password</Form.Label>
                    <input
                      type="password"
                      {...register('password')}
                      className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                    />
                    <div className="invalid-feedback">{errors.password?.message}</div>
                  </Form.Group>

                  {/* Confirm Password */}
                  <Form.Group className="form-group mb-3">
                    <Form.Label>Confirm Password</Form.Label>
                    <input
                      type="password"
                      {...register('confirmPassword')}
                      className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`}
                    />
                    <div className="invalid-feedback">{errors.confirmPassword?.message}</div>
                  </Form.Group>

                  {/* Role Selection */}
                  <Form.Group className="form-group mb-3">
                    <Form.Label>Role</Form.Label>
                    <select {...register('role')} className={`form-control ${errors.role ? 'is-invalid' : ''}`}>
                      <option value="">Select Role</option>
                      <option value="student">Student</option>
                      <option value="company">Company</option>
                    </select>
                    <div className="invalid-feedback">{errors.role?.message}</div>
                  </Form.Group>

                  <Form.Group className="form-group py-3">
                    <Row>
                      <Col>
                        <Button type="submit" className="btn btn-primary">
                          Register
                        </Button>
                      </Col>
                      <Col>
                        <Button type="button" onClick={() => reset()} className="btn btn-warning float-right">
                          Reset
                        </Button>
                      </Col>
                    </Row>
                  </Form.Group>
                </Form>
              </Card.Body>
              <Card.Footer>
                Already have an account?
                <a href="/auth/signin">Sign in</a>
              </Card.Footer>
            </Card>
          </Col>
        </Row>
      </Container>
    </main>
  );
};

export default SignUp;
