import React from 'react';
import { ApolloError } from '@apollo/client';
import Spinner from './Spinner';

interface LoadingOrErrorProps {
  loading: boolean;
  error?: ApolloError;
}

const LoadingOrError: React.FC<LoadingOrErrorProps> = ({ loading, error }) => {
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner />
      </div>
    );
  }

  if (error) {
    return (
      <p className="flex justify-center items-center h-screen text-red-500">
        Error: {error.message}
      </p>
    );
  }

  return null;
};

export default LoadingOrError;
