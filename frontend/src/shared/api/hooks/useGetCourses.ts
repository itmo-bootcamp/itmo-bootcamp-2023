import { useMutation } from 'react-query';
import { useStore } from 'store';

import { Course } from 'domain/courses';

import { getCourses, GetCoursesQuery } from '../api';

export const useGetCourses = () => {
  const { setCourses } = useStore();
  return useMutation<Course[], unknown, GetCoursesQuery>(getCourses, {
    onSuccess: (data) => setCourses(data),
  });
};
