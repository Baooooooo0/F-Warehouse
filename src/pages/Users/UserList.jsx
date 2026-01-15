import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Table from '../../components/Table/Table';
import Button from '../../components/Button/Button';
import { userAPI } from '../../api/user.api';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const data = await userAPI.getAll();
      setUsers(data);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    { header: 'ID', accessor: 'id' },
    { header: 'Tên', accessor: 'name' },
    { header: 'Email', accessor: 'email' },
    { header: 'Vai trò', accessor: 'role' },
    {
      header: 'Thao tác',
      render: (row) => (
        <div className="flex gap-2">
          <Button size="sm" variant="outline">Chỉnh sửa</Button>
          <Button size="sm" variant="danger">Xóa</Button>
        </div>
      ),
    },
  ];

  if (loading) return <div>Đang tải...</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Người dùng</h1>
        <Button onClick={() => navigate('/users/create')}>Tạo tài khoản</Button>
      </div>
      
      <div className="bg-white rounded-lg shadow">
        <Table columns={columns} data={users} />
      </div>
    </div>
  );
};

export default UserList;
