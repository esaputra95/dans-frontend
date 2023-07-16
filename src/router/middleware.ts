import React, { ReactNode, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const MidleWareAuth: React.FC<{ children: ReactNode }> = (props) => {
  const navigate = useNavigate();
  const token = sessionStorage.getItem('token');

  useEffect(() => {
    if (!token) {
      navigate('/login');
    }
  }, [navigate, token]);

  return props.children;
};

export default MidleWareAuth;