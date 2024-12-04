/* eslint-disable max-len */
import * as Yup from 'yup';

export const AddStudentSchema = Yup.object({
  name: Yup.string().required(),
  aboutMe: Yup.string().required(),
  skills: Yup.string().required(),
  location: Yup.string().required(),
  professionalPage: Yup.string().required(),
  profileImage: Yup.string().required(),
  owner: Yup.string().required(),
});

export const EditStudentSchema = Yup.object({
  id: Yup.number().required(),
  name: Yup.string().required(),
  aboutMe: Yup.string().required(),
  skills: Yup.string().required(),
  location: Yup.string().required(),
  professionalPage: Yup.string().required(),
  profileImage: Yup.string().required(),
  owner: Yup.string().required(),
});

export const AddCompanySchema = Yup.object().shape({
  name: Yup.string().required('Company name is required'),
  location: Yup.string().required('Location is required'),
  owner: Yup.string().required('Owner is required'),
  overview: Yup.string().required('Overview is required'),
  links: Yup.string().required('Links are required'),
  emails: Yup.string().required('Emails are required'),
  profileImage: Yup.string().required('Profile image is required'),
  positions: Yup.array().of(
    Yup.object().shape({
      title: Yup.string().required('Title is required'),
      description: Yup.string().required('Description is required'),
      skills: Yup.string().required('Skills are required'),
      jobType: Yup.string().required('Job type is required'),
      numberOfHires: Yup.number().required('Number of hires is required'),
      salaryRange: Yup.number().required('Salary range is required'),
    }),
  ),
});

export const EditCompanySchema = Yup.object({
  id: Yup.number().required(),
  name: Yup.string().required(),
  overview: Yup.string().required(),
  location: Yup.string().required(),
  positions: Yup.string().required(),
  links: Yup.string().required(),
  emails: Yup.string().required(),
  profileImage: Yup.string().required(),
  owner: Yup.string().required(),
});

export const searchSchema = Yup.object().shape({
  query: Yup.string().notRequired(),
});
