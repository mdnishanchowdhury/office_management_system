import React, { useState, useEffect } from "react";

const ViewMenu = () => {
    // Dummy menu data
    const [menuItems, setMenuItems] = useState([]);

    useEffect(() => {
        // In real app, fetch from API
        const dummyData = [
            { id: 1, name: "Burger", price: "$5", category: "Fast Food" },
            { id: 2, name: "Pizza", price: "$8", category: "Fast Food" },
            { id: 3, name: "Salad", price: "$4", category: "Healthy" },
            { id: 4, name: "Coffee", price: "$2", category: "Beverage" },
        ];
        setMenuItems(dummyData);
    }, []);

    return (
        <div className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Canteen Menu</h2>

            <div className="overflow-x-auto bg-gray-800 text-white rounded-lg shadow-md">
                <table className="min-w-full divide-y divide-gray-700">
                    <thead className="bg-gray-900">
                        <tr>
                            <th className="px-6 py-3 text-left text-sm font-medium text-gray-400 uppercase tracking-wider">
                                #
                            </th>
                            <th className="px-6 py-3 text-left text-sm font-medium text-gray-400 uppercase tracking-wider">
                                Name
                            </th>
                            <th className="px-6 py-3 text-left text-sm font-medium text-gray-400 uppercase tracking-wider">
                                Category
                            </th>
                            <th className="px-6 py-3 text-left text-sm font-medium text-gray-400 uppercase tracking-wider">
                                Price
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-700">
                        {menuItems.map((item, index) => (
                            <tr key={item.id} className="hover:bg-gray-700">
                                <td className="px-6 py-3 text-sm">{index + 1}</td>
                                <td className="px-6 py-3 text-sm">{item.name}</td>
                                <td className="px-6 py-3 text-sm">{item.category}</td>
                                <td className="px-6 py-3 text-sm">{item.price}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ViewMenu;
