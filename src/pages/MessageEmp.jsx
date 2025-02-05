import React, { useState, useEffect } from 'react';
import NavbarMob from '../components/NavbarMob';
import Navbar from '../components/Navbar';
import Navbar2 from '../components/Navbar2';
import Footer from '../components/Footer';
import Select from 'react-select';
import { useMediaQuery } from 'react-responsive';
import * as XLSX from 'xlsx';
import Navbar2Mob from '../components/Navbar2Mob';

function MessageEmp() {
    const isMobile = useMediaQuery({ query: '(max-width: 768px)' });
    const [locationCategory, setLocationCategory] = useState('');
    const [locationOptions, setLocationOptions] = useState([]);
    const [locationData, setLocationData] = useState(null);
    const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

    // Fetch location data from the backend API
    const fetchLocationData = async () => {
        try {
            const response = await fetch(`${apiBaseUrl}/data`);
            if (response.ok) {
                const data = await response.json();
                setLocationData(data);
            } else {
                console.error('Failed to fetch location data:', response.statusText);
            }
        } catch (error) {
            console.error('Error fetching location data:', error);
        }
    };

    useEffect(() => {
        fetchLocationData();
    }, []);

    useEffect(() => {
        if (locationData) {
            window.scrollTo(0, 0);
            const locations = locationData.states[0].districts.map(district => ({
                value: district,
                label: district,
            }));
            setLocationOptions(locations);
        }
    }, [locationData]);

    const handleLocationChange = selectedOption => {
        setLocationCategory(selectedOption ? selectedOption.value : '');
    };

    const exportHistoryDataToExcel = async () => {
        try {
            const response = await fetch(`${apiBaseUrl}/getAllPackageSelections`);
            if (response.ok) {
                const data = await response.json();
                if (data && data.data) {
                    let filteredData = data.data;

                    // Filter data based on selected location
                    if (locationCategory) {
                        filteredData = filteredData.filter(
                            item =>
                                item.additionalLocation &&
                                item.additionalLocation.toLowerCase() === locationCategory.toLowerCase()
                        );
                    }

                    if (filteredData.length === 0) {
                        alert('No data found for the selected location.');
                        return;
                    }

                    const sortedData = filteredData.sort((a, b) => {
                        if (a.additionalCompanyName < b.additionalCompanyName) return -1;
                        if (a.additionalCompanyName > b.additionalCompanyName) return 1;
                        return new Date(b.created_at) - new Date(a.created_at);
                    });

                    const formattedData = sortedData.map(item => {
                        const { id, ...rest } = item;
                        return {
                            ...rest,
                            created_at: new Date(item.created_at).toLocaleDateString('en-GB'),
                        };
                    });

                    const headers = [
                        'Company Name',
                        'Company Number',
                        'Company Location',
                        'Candidate Name',
                        'Candidate House Name',
                        'Candidate Experience',
                        'Applied Date',
                        'Candidate Mobile Number',
                    ];

                    const customData = formattedData.map(item => [
                        item.additionalCompanyName,
                        item.additionalMobileNumber,
                        item.additionalLocation,
                        item.customerName,
                        item.houseName,
                        item.experienced,
                        item.created_at,
                        item.mobileNumber,
                    ]);

                    customData.unshift(headers);

                    const ws = XLSX.utils.aoa_to_sheet(customData);
                    const colWidths = Array(headers.length).fill({ wch: 25 });
                    ws['!cols'] = colWidths;

                    const wb = XLSX.utils.book_new();
                    XLSX.utils.book_append_sheet(wb, ws, 'Package Selections');
                    XLSX.writeFile(wb, 'PackageSelections.xlsx');
                } else {
                    console.error('No data available in the response');
                }
            } else {
                console.error('Error fetching data:', response.statusText);
            }
        } catch (error) {
            console.error('Error fetching or exporting data:', error);
        }
    };

    return (
        <div className="min-h-screen flex flex-col bg-white text-gray-800">
            {isMobile ? <NavbarMob /> : <Navbar />}
            <div className="md:flex hidden">
                <Navbar2 />
            </div>
            <div className="md:hidden flex flex-col">
                <Navbar2Mob />
            </div>
            <div className="lg:px-12 px-3 lg:py-12 py-3 flex flex-col gap-8 bg-gray-100">
                <h2 className="text-2xl font-bold text-center mb-4">Message Employee</h2>

                {/* Location Selector */}
                <Select
                    options={locationOptions}
                    onChange={handleLocationChange}
                    placeholder="Select Location"
                    className="w-full mb-4"
                    isClearable
                    value={locationCategory ? locationOptions.find(option => option.value === locationCategory) : null}
                />

                <div className="text-center mt-4">
                    <button
                        onClick={exportHistoryDataToExcel}
                        className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
                    >
                        Message
                    </button>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default MessageEmp;
