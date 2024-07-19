const Header = ({ courseName }) => (
  <>
    <h2>{courseName}</h2>
  </>
);

const Content = ({ parts }) => {
  return (
    <>
      {parts.map((part) => (
        <p key={part.id}>
          {part.name} {part.exercises}
        </p>
      ))}
    </>
  );
};

const Total = ({ numbers }) => {
  const total = numbers.reduce((curSum, elem) => curSum + elem);
  return (
    <p>
      <b>Number of exercises {total}</b>
    </p>
  );
};

const Course = ({ course }) => {
  return (
    <div>
      <Header courseName={course.name} />
      <Content parts={course.parts} />
      <Total numbers={course.parts.map((part) => part.exercises)} />
    </div>
  );
};

export default Course;
