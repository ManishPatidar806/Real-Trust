import React from 'react';

const ClientCard = ({ client }) => {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md">
      <div className="flex items-start gap-4 mb-4">
        <div className="flex-shrink-0">
          <img src={client.image} alt={client.name} className="w-16 h-16 rounded-full object-cover border-2 border-gray-100" />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="text-base font-semibold text-gray-900">{client.name}</h4>
          <p className="text-sm text-gray-500 mt-0.5">{client.designation}</p>
        </div>
      </div>
      <p className="text-gray-700 text-sm leading-relaxed italic">"{client.description}"</p>
    </div>
  );
};

export default ClientCard;
