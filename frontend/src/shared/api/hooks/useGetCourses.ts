import { useMutation } from 'react-query';
import { useStore } from 'store';

import { ApiCourse, Course, CourseList } from 'domain/courses';

import { getCourses, GetCoursesQuery } from '../api';

export const useGetCourses = () => {
  const { setCourses } = useStore();
  return useMutation<ApiCourse[], unknown, GetCoursesQuery>(getCourses, {
    onSuccess: (data) => {
      const result: CourseList[] = data.map(record => {
        const [skill, obj] = Object.entries(record)[0];

        const list: Course[] = obj.map(course => {
          const [title, url] = course;

          return { title, url };
        });

        return { skill, list };
      });

      return setCourses(result);
    },
  });
};
