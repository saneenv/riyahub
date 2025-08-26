import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NavbarMob from '../components/NavbarMob';
import Navbar from '../components/Navbar';
import Navbar2 from '../components/Navbar2';
import Navbar2Mob from '../components/Navbar2Mob';
import { useMediaQuery } from 'react-responsive';
import Footer from '../components/Footer';


function PlansManagement() {
    const [plans, setPlans] = useState([]);
    const [newPlan, setNewPlan] = useState({
        planName: '',
        planCode: '',
        durationDays: '',
        description: ''
    });
    const [editingPlan, setEditingPlan] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);
    const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;
    const isMobile = useMediaQuery({ query: '(max-width: 768px)' });

    useEffect(() => {
        fetchPlans();
    }, []);

    const fetchPlans = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await fetch(`${apiBaseUrl}/plans`);
            const data = await response.json();
            if (data.success) {
                setPlans(data.plans);
            } else {
                setError(data.message || 'Failed to fetch plans');
            }
        } catch (error) {
            console.error("Error fetching plans:", error);
            setError('Failed to fetch plans. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (editingPlan) {
            setEditingPlan(prev => ({
                ...prev,
                // Convert the input names to match the API property names
                [name === 'planName' ? 'PlanName' :
                    name === 'planCode' ? 'PlanCode' :
                        name === 'durationDays' ? 'DurationDays' :
                            'Description']: value
            }));
        } else {
            setNewPlan(prev => ({
                ...prev,
                [name]: value
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);
        try {
            const url = editingPlan ? `${apiBaseUrl}/plans/${editingPlan.PlanID}` : `${apiBaseUrl}/plans`;
            const method = editingPlan ? 'PUT' : 'POST';

            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(editingPlan || newPlan),
            });

            const data = await response.json();
            if (data.success) {
                setSuccessMessage(editingPlan ? 'Plan updated successfully!' : 'Plan created successfully!');
                setNewPlan({
                    planName: '',
                    planCode: '',
                    durationDays: '',
                    description: ''
                });
                setEditingPlan(null);
                fetchPlans();
                setTimeout(() => setSuccessMessage(null), 3000);
            } else {
                setError(data.message || (editingPlan ? 'Failed to update plan' : 'Failed to create plan'));
            }
        } catch (error) {
            console.error("Error:", error);
            setError(editingPlan ? 'Failed to update plan. Please try again.' : 'Failed to create plan. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleEdit = (plan) => {
        setEditingPlan(plan);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleCancelEdit = () => {
        setEditingPlan(null);
    };

    const handleDelete = async (planId) => {
        if (!window.confirm('Are you sure you want to delete this plan? This action cannot be undone.')) {
            return;
        }

        setIsLoading(true);
        setError(null);
        try {
            const response = await fetch(`${apiBaseUrl}/plans/${planId}`, {
                method: 'DELETE',
            });

            const data = await response.json();
            if (data.success) {
                setSuccessMessage('Plan deleted successfully!');
                fetchPlans();
                setTimeout(() => setSuccessMessage(null), 3000);
            } else {
                setError(data.message || 'Failed to delete plan');
            }
        } catch (error) {
            console.error("Error deleting plan:", error);
            setError('Failed to delete plan. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 ">
            {isMobile ? <NavbarMob /> : <Navbar />}
            <div className='md:flex hidden'>
                <Navbar2 />
            </div>
            <div className='md:hidden flex flex-col'>
                <Navbar2Mob />
            </div>

            <div className="max-w-6xl mx-auto py-12">
                {/* Header */}
                <div className="mb-8">
                    <h2 className="text-3xl font-bold text-gray-800">Subscription Plans Management</h2>
                    <p className="text-gray-600 mt-2">Create and manage your subscription plans</p>
                </div>

                {/* Success Message */}
                {successMessage && (
                    <div className="mb-6 p-4 bg-green-100 border-l-4 border-green-500 text-green-700 rounded">
                        <p>{successMessage}</p>
                    </div>
                )}

                {/* Error Message */}
                {error && (
                    <div className="mb-6 p-4 bg-red-100 border-l-4 border-red-500 text-red-700 rounded">
                        <p>{error}</p>
                    </div>
                )}

                {/* Create/Edit Plan Card */}
                <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
                    <div className={`bg-gradient-to-r px-6 py-4 ${editingPlan ? 'from-yellow-600 to-yellow-500' : 'from-blue-600 to-blue-500'}`}>
                        <h3 className="text-xl font-semibold text-white">
                            {editingPlan ? `Edit Plan: ${editingPlan.PlanName}` : 'Create New Plan'}
                        </h3>
                    </div>
                    <div className="p-6">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Plan Name</label>
                                    <input
                                        type="text"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 transition duration-150"
                                        name="planName"
                                        value={editingPlan ? editingPlan.PlanName : newPlan.planName}
                                        onChange={handleInputChange}
                                        required
                                        placeholder="e.g., Premium Plan"   
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Plan Code</label>
                                    <input
                                        type="text"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 transition duration-150"
                                        name="planCode"
                                        value={editingPlan ? editingPlan.PlanCode : newPlan.planCode}
                                        onChange={handleInputChange}
                                        required
                                        placeholder="e.g., PREMIUM_30"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Duration (month)</label>
                                    <input
                                        type="number"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 transition duration-150"
                                        name="durationDays"
                                        value={editingPlan ? editingPlan.DurationDays : newPlan.durationDays}
                                        onChange={handleInputChange}
                                        required
                                        min="1"
                                        placeholder="e.g., 30"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                                <textarea
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 transition duration-150"
                                    name="description"
                                    rows="3"
                                    value={editingPlan ? editingPlan.Description : newPlan.description}
                                    onChange={handleInputChange}
                                    placeholder="Describe the plan features and benefits..."
                                />
                            </div>

                            <div className="flex justify-end space-x-4">
                                {editingPlan && (
                                    <button
                                        type="button"
                                        onClick={handleCancelEdit}
                                        className="px-6 py-2 bg-gray-500 text-white font-medium rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition duration-150"
                                    >
                                        Cancel
                                    </button>
                                )}
                                <button
                                    type="submit"
                                    className="px-6 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-150 disabled:opacity-50"
                                    disabled={isLoading}
                                >
                                    {isLoading ? (
                                        <>
                                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            {editingPlan ? 'Updating...' : 'Creating...'}
                                        </>
                                    ) : editingPlan ? 'Update Plan' : 'Create Plan'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

                {/* Existing Plans Card */}
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                    <div className="bg-gradient-to-r from-gray-700 to-gray-600 px-6 py-4">
                        <h3 className="text-xl font-semibold text-white">Existing Plans</h3>
                    </div>
                    <div className="p-6">
                        {isLoading ? (
                            <div className="flex justify-center items-center py-12">
                                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                            </div>
                        ) : plans.length === 0 ? (
                            <div className="text-center py-8">
                                <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <h3 className="mt-2 text-lg font-medium text-gray-900">No plans found</h3>
                                <p className="mt-1 text-sm text-gray-500">Create your first plan to get started.</p>
                            </div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Plan Name</th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Plan Code</th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Duration</th>
                                            {/* <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th> */}
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {plans.map((plan, index) => (
                                            <tr key={plan.PlanID} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50 hover:bg-gray-100'}>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm font-medium text-gray-900">{plan.PlanName}</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm text-gray-900 font-mono bg-gray-100 px-2 py-1 rounded inline-block">{plan.PlanCode}</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm text-gray-900">
                                                        {plan.DurationDays} days
                                                    </div>
                                                </td>
                                                {/* <td className="px-6 py-4">
                                                    <div className="text-sm text-gray-500">{plan.Description}</div>
                                                </td> */}
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                    {/* <button
                                                        onClick={() => handleEdit(plan)}
                                                        className="text-blue-600 hover:text-blue-900 mr-4"
                                                    >
                                                        Edit
                                                    </button> */}
                                                    <button
                                                        onClick={() => handleDelete(plan.PlanID)}
                                                        className="text-red-600 hover:text-red-900"
                                                    >
                                                        Delete
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <div className='mt-12'>
                <Footer />
            </div>
        </div>
    );
}

export default PlansManagement;