import React, { useState } from 'react';
import { FiEdit2, FiCheck, FiX, FiUser, FiMail, FiPhone } from 'react-icons/fi';
import { BsGenderAmbiguous } from 'react-icons/bs';

export default function PersonalInfo({ user = { username: 'John Doe', email: 'john@example.com', gender: 'Male', contact: '+1 234 567 8900' }, onSave }) {
    const [isEditing, setIsEditing] = useState(false);
    const [editedUser, setEditedUser] = useState({
        name: user.name || user.username || '',
        gender: user.gender || '',
        contact: user.contact || ''
    });

    const handleSave = () => {
        if (onSave) {
            onSave(editedUser);
        }
        setIsEditing(false);
    };

    const handleCancel = () => {
        setEditedUser({
            name: user.name || user.username || '',
            gender: user.gender || '',
            contact: user.contact || ''
        });
        setIsEditing(false);
    };

    return (
        <div className="bg-white md:rounded-lg md:border md:border-gray-200">
            {/* Header - Outside box on mobile, inside on desktop */}
            <div className="md:flex md:items-center md:justify-between md:p-6 md:border-b md:border-gray-100">
                <div className="md:text-left text-center">
                    <h2 className="text-2xl font-bold text-gray-800 tracking-tight mb-1 lg:mb-0 px-4 md:px-0">
                        Personal Information
                    </h2>
                    <p className="text-sm block md:hidden text-gray-500 tracking-tight px-4 lg:px-0 mb-4 lg:mb-0">
                        Update information for seamless checkout.
                    </p>
                </div>
                {!isEditing ? (
                    <button
                        onClick={() => setIsEditing(true)}
                        className="hidden lg:flex items-center gap-2 px-4 py-2 text-[#B88E2F] hover:bg-[#B88E2F] hover:text-white border border-[#B88E2F] rounded-lg transition-colors duration-200 font-medium"
                    >
                        <FiEdit2 size={16} />
                        <span>Edit</span>
                    </button>
                ) : (
                    <div className="hidden lg:flex gap-2">
                        <button
                            onClick={handleSave}
                            className="flex items-center gap-2 px-4 py-2 bg-[#B88E2F] text-white rounded-md hover:bg-[#9a7526] transition-colors duration-200 font-medium"
                        >
                            <FiCheck size={16} />
                            <span>Save</span>
                        </button>
                        <button
                            onClick={handleCancel}
                            className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:bg-gray-100 border border-gray-300 rounded-lg transition-colors duration-200 font-medium"
                        >
                            <FiX size={16} />
                            <span>Cancel</span>
                        </button>
                    </div>
                )}
            </div>

            {/* Mobile box wrapper */}
            <div className="border md:mt-0 mt-10 border-gray-200 rounded-lg md:border-0 md:rounded-none">
                {/* Content */}
                <div className="p-4 lg:p-6 space-y-5">
                    {/* Username */}
                    <div className="group">
                        <label className="flex items-center gap-2 text-sm font-medium text-gray-500 mb-2 tracking-tight">
                            <FiUser size={16} />
                            Full Name
                        </label>
                        {isEditing ? (
                            <input
                                type="text"
                                value={editedUser.name || user.username}
                                onChange={(e) => setEditedUser({ ...editedUser, name: e.target.value })}
                                className="w-full px-4 py-2 text-gray-800 font-medium border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#B88E2F] focus:border-transparent transition-all"
                                placeholder="Enter your full name"
                            />
                        ) : (
                            <p className="px-4 py-2 border border-[#B88E2F]/20 text-[#B88E2F] font-semibold tracking-tight bg-[#F9F1E7] rounded-md">
                                {user.name || user.username}
                            </p>
                        )}
                    </div>

                    {/* Email */}
                    <div className="group">
                        <label className="flex items-center gap-2 text-sm font-medium text-gray-500 mb-2 tracking-tight">
                            <FiMail size={16} />
                            Email Address
                        </label>
                        <div className="px-4 py-2 text-gray-600 font-medium bg-gray-50 rounded-md border border-gray-200 flex items-center justify-between">
                            <span className="truncate">{user.email}</span>
                            <span className="text-xs text-gray-400 bg-white px-2 py-1 rounded border border-gray-200 ml-2 shrink-0">Verified</span>
                        </div>
                    </div>

                    {/* Gender */}
                    <div className="group relative">
                        <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2 tracking-tight">
                            <BsGenderAmbiguous size={16} className="text-[#B88E2F]" />
                            Gender
                        </label>
                        {isEditing ? (
                            <div className="relative">
                                <select
                                    value={editedUser.gender}
                                    onChange={(e) => setEditedUser({ ...editedUser, gender: e.target.value })}
                                    className="w-full px-4 py-2 text-gray-800 font-medium bg-white border border-gray-200 rounded-md
                                    focus:outline-none focus:border-[#B88E2F] 
                                    hover:border-[#B88E2F]/50 transition-all duration-300 ease-in-out appearance-none cursor-pointer"
                                >
                                    <option value="">Select your gender</option>
                                    <option value="Male">👨 Male</option>
                                    <option value="Female">👩 Female</option>
                                    <option value="Other">⚧ Other</option>
                                    <option value="Prefer not to say">🔒 Prefer not to say</option>
                                </select>
                                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none transition-transform duration-300 group-hover:scale-110">
                                    <svg className="w-5 h-5 text-[#B88E2F]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </div>
                            </div>
                        ) : (
                            <div className="px-4 py-2 bg-gradient-to-br from-[#F9F1E7] to-[#FDF8F3] rounded-md border border-[#B88E2F]/20 transition-all duration-300">
                                {user.gender ? (
                                    <p className="text-[#B88E2F] font-semibold tracking-tight flex items-center gap-2">
                                        <span className="w-1.5 h-1.5 bg-[#B88E2F] rounded-full animate-pulse"></span>
                                        {user.gender}
                                    </p>
                                ) : (
                                    <p className="text-gray-400 font-normal italic">Not specified</p>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Contact */}
                    <div className="group">
                        <label className="flex items-center gap-2 text-sm font-medium text-gray-500 mb-2 tracking-tight">
                            <FiPhone size={16} />
                            Contact Number
                        </label>
                        {isEditing ? (
                            <input
                                type="tel"
                                value={editedUser.contact}
                                onChange={(e) => setEditedUser({ ...editedUser, contact: e.target.value })}
                                className="w-full px-4 py-2 text-gray-800 font-medium border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B88E2F] focus:border-transparent transition-all"
                                placeholder="Enter your contact number"
                            />
                        ) : (
                            <div className="px-4 py-2 border border-[#B88E2F]/20 text-[#B88E2F] font-semibold tracking-tight bg-[#F9F1E7] rounded-md">
                                {user.contact || <span className="text-gray-400 font-normal">Not specified</span>}
                            </div>
                        )}
                    </div>
                </div>

                {/* Mobile Edit Buttons - Inside the box */}
                {isEditing && (
                    <div className="flex gap-2 p-4 pt-0 lg:hidden">
                        <button
                            onClick={handleSave}
                            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-[#B88E2F] text-white rounded-md hover:bg-[#9a7526] transition-colors duration-200 font-medium"
                        >
                            <FiCheck size={16} />
                            <span>Save</span>
                        </button>
                        <button
                            onClick={handleCancel}
                            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 text-gray-600 hover:bg-gray-100 border border-gray-300 rounded-lg transition-colors duration-200 font-medium"
                        >
                            <FiX size={16} />
                            <span>Cancel</span>
                        </button>
                    </div>
                )}

                {/* Mobile Edit Button - Inside the box, bottom */}
                {!isEditing && (
                    <div className="p-4 pt-0 lg:hidden">
                        <button
                            onClick={() => setIsEditing(true)}
                            className="w-full flex items-center justify-center gap-2 px-4 py-2 text-[#B88E2F] hover:bg-[#B88E2F] hover:text-white border border-[#B88E2F] rounded-lg transition-colors duration-200 font-medium"
                        >
                            <FiEdit2 size={16} />
                            <span>Edit</span>
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}