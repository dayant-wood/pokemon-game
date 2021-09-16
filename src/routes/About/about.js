import { useHistory } from 'react-router';

const AboutPage = () => {
  const history = useHistory();
  const handleClick = () => {
    history.push('/');
  };
  return (
    <>
      <h1>This is about page!</h1>;
      <button onClick={handleClick}>Return to Home</button>;
    </>
  );
};

export default AboutPage;
