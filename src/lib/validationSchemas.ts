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
  name: Yup.string().required(),
  overview: Yup.string().required(),
  location: Yup.string().required(),
  // links: company.links,
  // emails: company.emails,
  owner: Yup.string().required(),
});

export const EditCompanySchema = Yup.object({
  id: Yup.number().required(),
  name: Yup.string().required(),
  overview: Yup.string().required(),
  location: Yup.string().required(),
  // links: company.links,
  // emails: company.emails,
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
