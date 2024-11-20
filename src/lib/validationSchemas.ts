import * as Yup from 'yup';

export const AddStudentSchema = Yup.object({
  name: Yup.string().required(),
  skills: Yup.string().required(),
  location: Yup.string().required(),
  professionalPage: Yup.string().required(),
  owner: Yup.string().required(),
});

export const EditStudentSchema = Yup.object({
  id: Yup.number().required(),
  name: Yup.string().required(),
  skills: Yup.string().required(),
  location: Yup.string().required(),
  professionalPage: Yup.string().required(),
  owner: Yup.string().required(),
});

export const AddCompanySchema = Yup.object({
  name: Yup.string().required('Company Name is required'),
  overview: Yup.string().required('Overview is required'),
  location: Yup.string().required('Location is required'),
  positions: Yup.string().required('Positions are required'),
  links: Yup.string().url('Must be a valid URL').required('Links are required'),
  emails: Yup.string().email('Must be a valid email').required('Contact Email is required'),
  owner: Yup.string().required(),
});

export const EditCompanySchema = Yup.object({
  id: Yup.number().required(),
  name: Yup.string().required(),
  overview: Yup.string().required(),
  location: Yup.string().required(),
  positions: Yup.string().required(),
  links: Yup.string().required(),
  emails: Yup.string().required(),
  owner: Yup.string().required(),
});

export const AddStuffSchema = Yup.object({
  name: Yup.string().required(),
  quantity: Yup.number().positive().required(),
  condition: Yup.string().oneOf(['excellent', 'good', 'fair', 'poor']).required(),
  owner: Yup.string().required(),
});

export const EditStuffSchema = Yup.object({
  id: Yup.number().required(),
  name: Yup.string().required(),
  quantity: Yup.number().positive().required(),
  condition: Yup.string().oneOf(['excellent', 'good', 'fair', 'poor']).required(),
  owner: Yup.string().required(),
});
