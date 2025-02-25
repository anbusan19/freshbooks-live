import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminRedirect = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate('/freshbooksadmin');
  }, [navigate]);

  return null;
};

export default AdminRedirect;
