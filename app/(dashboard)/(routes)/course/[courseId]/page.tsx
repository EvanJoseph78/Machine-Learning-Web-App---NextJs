
const CoursePage = (
  {
    params
  }: {
    params: { courseId: string }
  }
) => {
  return (
    <div>Evan - {params.courseId}</div>
  );
};

export default CoursePage;
