import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";

const NewsletterPopup = ({email}) => {
    const [showPopup, setShowPopup] = useState(false);
    const [neverShow, setNeverShow] = useState(false);

    useEffect(() => {
        const hidePopup = localStorage.getItem("hideNewsletterPopup");
        if (!hidePopup) {
            setShowPopup(true)
        }
    }, []);

    const handleClose = () => {
        if (neverShow) {
            localStorage.setItem("hideNewsletterPopup", "true");
        }
        setShowPopup(false);
    };

    const handleSubscribe = () => {
        toast.success(`Subscribed with ${email}`);
        localStorage.setItem("hideNewsletterPopup", "true");
        setShowPopup(false);
    };

    if(!showPopup) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-base-100 rounded-xl p-6 w-full max-w-md shadow-lg">
                <h2 className="text-2xl font-bold mb-4">Subscribe to our Newsletter with {email}</h2>
                <p className="mb-4 text-gray-600">
                    Get the latest updates straight to your inbox.
                </p>
                <div className="flex items-center gap-2 mb-4">
                    <input
                        type="checkbox"
                        id="neverShow"
                        checked={neverShow}
                        onChange={(e) => setNeverShow(e.target.checked)}
                        className="checkbox bg-base-300"
                    />
                    <label htmlFor="neverShow">Never show this popup again</label>
                </div>
                <div className="flex justify-end gap-4">
                    <button
                        onClick={handleClose}
                        className="btn btn-outline "
                    >
                        Close
                    </button>
                    <button
                        onClick={handleSubscribe}
                        className="btn btn-primary bg-base-300 px-3"
                    >
                        Subscribe
                    </button>
                </div>
            </div>
        </div>
    );
};

export default NewsletterPopup;
