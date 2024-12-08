import React from 'react';

const EmptyState: React.FC = () => {
    return (<div className="flex flex-col items-center justify-center w-full h-screen bg-gray-100 text-gray-700 p-4 overflow-hidden">
        <img
            src="/gifs/empty.gif"
            alt="Empty State"
            className="w-full"
        />
    </div>);
};

export default EmptyState;
