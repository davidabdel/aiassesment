import React from 'react';
import { ArrowLeft } from 'lucide-react';

interface BookingPageProps {
    onBack: () => void;
}

const BookingPage: React.FC<BookingPageProps> = ({ onBack }) => {
    return (
        <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col">
            {/* Header */}
            <div className="max-w-6xl mx-auto w-full p-4 sm:p-8">
                <button
                    onClick={onBack}
                    className="flex items-center text-slate-500 hover:text-indigo-600 transition-colors font-medium mb-6"
                >
                    <ArrowLeft className="w-4 h-4 mr-2" /> Back to Results
                </button>

                <div className="bg-white border border-slate-200 rounded-2xl shadow-xl overflow-hidden flex flex-col h-[800px]">
                    <div className="bg-indigo-600 p-6 text-center">
                        <h1 className="text-2xl font-bold text-white">Book Your Implementation Call</h1>
                        <p className="text-indigo-100 mt-2">Select a time below to speak with our team.</p>
                    </div>

                    <div className="flex-1 w-full bg-white relative">
                        <iframe
                            src="https://api.uconnect.com.au/widget/booking/pb8doRop5EzwHZXUVx4t"
                            style={{ width: '100%', height: '100%', border: 'none' }}
                            scrolling="no"
                            id="booking-calendar"
                        ></iframe>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookingPage;
