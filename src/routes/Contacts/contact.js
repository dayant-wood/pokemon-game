import { useHistory } from 'react-router';

const ContactPage = () => {
  const history = useHistory();
  const handleClick = () => {
    history.push('/');
  };
  return (
    <>
      <h1>This is contacts page!</h1>
      <button onClick={handleClick}>Return to Home</button>;
    </>
  );
};

export default ContactPage;
