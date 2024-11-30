import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const ChangePasswordPage = () => {
  const { employeeId } = useParams(); // Get the employeeId from the route
  const navigate = useNavigate(); // For navigation after password update
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

  const handlePasswordChange = () => {
    if (!newPassword.trim() || !confirmPassword.trim()) {
      alert('Please fill out all fields.');
      return;
    }
  
    if (newPassword !== confirmPassword) {
      alert('Passwords do not match.');
      return;
    }
  
    setLoading(true);
  
    // First API call for employeeId
    fetch(`${apiBaseUrl}/employee/update-password/${employeeId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ password: newPassword }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setLoading(false);
          alert('Password updated successfully.');
          navigate('/deleteprofiles'); // Navigate back to the employee list page
        } else {
          console.warn('First API failed, trying second API:', data.message);
          // If first API fails, fallback to second API
          updateCandidatePassword();
        }
      })
      .catch((error) => {
        console.error('Error with the first API:', error);
        // If first API fails completely, fallback to second API
        updateCandidatePassword();
      });
  };
  
  // Fallback to the second API for candidateID
  const updateCandidatePassword = () => {
    fetch(`${apiBaseUrl}/updatePassword/${employeeId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ password: newPassword }),
    })
      .then((response) => response.json())
      .then((data) => {
        setLoading(false);
        if (data.success) {
          alert('Password updated successfully.');
          navigate('/deleteprofiles'); // Navigate back to the employee list page
        } else {
          console.warn('Second API failed, trying third API:', data.message);
          // If second API fails, fallback to the third API
          updateStaffPassword();
        }
      })
      .catch((error) => {
        setLoading(false);
        console.error('Error with the second API:', error);
        // If second API fails completely, fallback to third API
        updateStaffPassword();
      });
  };
  
  // Fallback to the third API for staffId
  const updateStaffPassword = () => {
    fetch(`${apiBaseUrl}/updatestaffpassword`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        staffId: employeeId, // Use employeeId here to match the staffId in the backend
        password: newPassword,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setLoading(false);
        if (data.message) {
          alert(data.message); // Successfully updated password in the third system
          navigate('/enablestaff');
        } else {
          alert(data.error || 'Error updating password in staff system.');
        }
      })
      .catch((error) => {
        setLoading(false);
        console.error('Error with the third API:', error);
        alert('Failed to update password in staff system.');
      });
  };
  
  

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 font-display">Change Password</h2>
        <div className="mb-4">
          <label className="block text-gray-700 font-display">New Password</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="Enter new password"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-display">Confirm Password</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="Confirm new password"
          />
        </div>
        <button
          onClick={handlePasswordChange}
          disabled={loading}
          className={`w-full py-2 px-4 text-white rounded ${
            loading ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-700'
          }`}
        >
          {loading ? 'Updating...' : 'Update Password'}
        </button>
        <button
          onClick={() => navigate('/deleteprofiles')}
          className="w-full mt-4 py-2 px-4 text-gray-600 bg-gray-100 border rounded hover:bg-gray-200 font-display"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default ChangePasswordPage;
