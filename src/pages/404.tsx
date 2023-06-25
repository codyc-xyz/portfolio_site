import { Helmet } from 'react-helmet';

export default function NotFound() {
  return (
    <main>
      <Helmet>
        <title>Page Not Found | CodyC </title>
      </Helmet>
      <p>Sorry, page not found!</p>
    </main>
  );
}
