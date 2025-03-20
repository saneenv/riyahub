import React, { useState, useEffect } from 'react';
import NavbarMob from '../components/NavbarMob';
import Navbar from '../components/Navbar';
import Navbar2 from '../components/Navbar2';
import Footer from '../components/Footer';
import Select from 'react-select';
import { useMediaQuery } from 'react-responsive';
import * as XLSX from 'xlsx';
import Navbar2Mob from '../components/Navbar2Mob';
import DatePicker from 'react-datepicker'; // Import DatePicker
import 'react-datepicker/dist/react-datepicker.css'; // Import DatePicker styles

function DateSearch() {
    const isMobile = useMediaQuery({ query: '(max-width: 768px)' });
    const [locationCategory, setLocationCategory] = useState('');
    const [locationOptions, setLocationOptions] = useState([]);
    const [locationData, setLocationData] = useState(null);
    const [startDate, setStartDate] = useState(null); // Start date for filtering
    const [endDate, setEndDate] = useState(null); // End date for filtering
    const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;
    const [companyName, setCompanyName] = useState(''); // New state for filtering by company name
    const [companyList, setCompanyList] = useState([]); // Store unique company names
    const [selectedCompany, setSelectedCompany] = useState(''); // Selected company name



    // Fetch location data from the backend API
    const fetchLocationData = async () => {
        try {
            const response = await fetch(`${apiBaseUrl}/data`); // API endpoint for location data
            if (response.ok) {
                const data = await response.json();
                setLocationData(data); // Set the fetched data
            } else {
                console.error('Failed to fetch location data:', response.statusText);
            }
        } catch (error) {
            console.error('Error fetching location data:', error);
        }
    };

    useEffect(() => {
        fetchLocationData(); // Fetch location data when the component mounts
    }, []);

    useEffect(() => {
        if (locationData) {
            window.scrollTo(0, 0);

            // Extract districts from location data for the select dropdown
            const locations = locationData.states[0].districts.map(district => ({
                value: district,
                label: district,
            }));
            setLocationOptions(locations); // Set the location options once data is available
        }
    }, [locationData]);

    const handleLocationChange = selectedOption => {
        setLocationCategory(selectedOption ? selectedOption.value : '');
    };

    const fetchCompanyNames = async () => {
        try {
            const response = await fetch(`${apiBaseUrl}/getAllPackageSelections`);
            if (response.ok) {
                const data = await response.json();

                if (data && data.data) {
                    const uniqueCompanies = [
                        ...new Set(data.data.map(item => item.additionalCompanyName).filter(Boolean))
                    ];
                    setCompanyList(uniqueCompanies);
                }
            } else {
                console.error('Error fetching data:', response.statusText);
            }
        } catch (error) {
            console.error('Error fetching company names:', error);
        }
    };

    // Fetch company names when component loads
    useEffect(() => {
        fetchCompanyNames();
    }, []);


    const exportHistoryDataToExcel = async () => {
        try {
            const response = await fetch(`${apiBaseUrl}/getAllPackageSelections`);

            if (response.ok) {
                const data = await response.json();

                if (data && data.data) {
                    let filteredData = data.data;

                    // Filter by Location
                    if (locationCategory) {
                        filteredData = filteredData.filter(
                            item =>
                                item.additionalLocation &&
                                item.additionalLocation.toLowerCase() === locationCategory.toLowerCase()
                        );
                    }

                    // Filter by Date Range
                    if (startDate && endDate) {
                        filteredData = filteredData.filter(item => {
                            const appliedDate = new Date(item.created_at);

                            if (startDate.getTime() === endDate.getTime()) {
                                return appliedDate.toDateString() === startDate.toDateString();
                            }

                            return appliedDate >= startDate && appliedDate <= endDate;
                        });
                    }

                    // Filter by Company Name
                    // Filter by Company Name
                    if (selectedCompany) {
                        filteredData = filteredData.filter(item =>
                            item.additionalCompanyName === selectedCompany
                        );
                    }


                    if (filteredData.length === 0) {
                        alert('No data found for the selected filters.');
                        return;
                    }

                    // Sort Data
                    const sortedData = filteredData.sort((a, b) => {
                        if (a.additionalCompanyName < b.additionalCompanyName) return -1;
                        if (a.additionalCompanyName > b.additionalCompanyName) return 1;
                        return new Date(b.created_at) - new Date(a.created_at);
                    });

                    // Format Data for Excel
                    const formattedData = sortedData.map(item => {
                        const { id, ...rest } = item;
                        return {
                            ...rest,
                            created_at: new Date(item.created_at).toLocaleDateString('en-GB'),
                        };
                    });

                    // Define Headers for Excel
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
                    const colWidths = [
                        { wch: 25 }, { wch: 25 }, { wch: 25 }, { wch: 25 },
                        { wch: 25 }, { wch: 25 }, { wch: 25 }, { wch: 25 }
                    ];
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
                <h2 className="text-2xl font-bold text-center mb-4">Applied Job History</h2>

                {/* Location Selector */}
                <Select
                    options={locationOptions}
                    onChange={handleLocationChange}
                    placeholder="Select Location"
                    className="w-full mb-4"
                    isClearable
                    value={locationCategory ? locationOptions.find(option => option.value === locationCategory) : null}
                />

                    <Select
                        options={companyList.map(company => ({ value: company, label: company }))}
                        value={selectedCompany ? { value: selectedCompany, label: selectedCompany } : null}
                        onChange={(selectedOption) => setSelectedCompany(selectedOption ? selectedOption.value : '')}
                        placeholder="Select Company Name"
                        isClearable
                        className="w-full mb-4"
                    />

                {/* Date Picker */}
                <div className="flex gap-4 justify-center">
                    <DatePicker
                        selected={startDate}
                        onChange={date => setStartDate(date)}
                        placeholderText="Start Date"
                        dateFormat="dd/MM/yyyy"
                        className="border px-4 py-2 rounded"
                    />
                    <DatePicker
                        selected={endDate}
                        onChange={date => setEndDate(date)}
                        placeholderText="End Date"
                        dateFormat="dd/MM/yyyy"
                        className="border px-4 py-2 rounded"
                    />
                </div>

               



                <div className="text-center mt-4">
                    <button
                        onClick={exportHistoryDataToExcel}
                        className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
                    >
                        To Excel
                    </button>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default DateSearch;
