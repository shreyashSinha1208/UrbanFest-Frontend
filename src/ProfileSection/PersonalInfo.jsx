import React from 'react';

export default function PersonalInfo({ user }) {

    console.log(user);
    
    return (
        <div className="bg-white rounded-lg p-6 border ml-5">
            <h2 className="text-2xl font-bold text-gray-800 tracking-tight mb-6">Personal Info</h2>
            <div className="space-y-4">
                <div>
                    <strong className="text-gray-600 tracking-tight">Username:</strong>
                    <p className="text-[#B88E2F] tracking-tight font-semibold">{user.name || user.username}</p>
                </div>
                <div>
                    <strong className="text-gray-600 tracking-tight">Email:</strong>
                    <p className="text-[#B88E2F] tracking-tight font-semibold">{user.email}</p>
                </div>
                <div>
                    <strong className="text-gray-600 tracking-tight">Gender:</strong>
                    <p className="text-[#B88E2F] tracking-tight font-semibold">{user.gender || 'Not specified'}</p>
                </div>
                <div>
                    <strong className="text-gray-600 tracking-tight">Contact:</strong>
                    <p className="text-[#B88E2F] tracking-tight font-semibold">{user.contact || 'Not specified'}</p>
                </div>
            </div>
        </div>
    );
};

