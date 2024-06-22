import { ListClasses } from '@/lib/types';
import { Courses } from '@prisma/client';
import axios from 'axios';
import { useState, useEffect } from 'react';

const useCourseData = (courseId: string) => {
  const [course, setCourse] = useState<Courses | null>(null);
  const [listClasses, setListClasses] = useState<ListClasses[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        const [courseResponse, modulesResponse] = await Promise.all([
          axios.get(`/api/courses/${courseId}`),
          axios.get(`/api/courses/${courseId}/modules`)
        ]);

        setCourse(courseResponse.data);
        setListClasses(modulesResponse.data.modules);
      } catch (err: unknown) {
        console.error("Failed to fetch course data", err);
        if (err instanceof Error) {
          setError(err);
        } else {
          setError(new Error('An unknown error occurred'));
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchCourseData();
  }, [courseId]);

  return { course, listClasses, setListClasses, isLoading, error };
};

export default useCourseData;

