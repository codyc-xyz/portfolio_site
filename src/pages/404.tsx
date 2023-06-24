import { Helmet } from 'react-helmet';

export default function NotFound() {
  return (
    <main>
      <Helmet>
        <title>404 Error - CodyC </title>
      </Helmet>
      <p>Sorry, page not found!</p>
    </main>
  );
}
