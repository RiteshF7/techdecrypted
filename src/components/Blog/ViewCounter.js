"use client";

import { useEffect, useState } from "react";
import PropTypes from "prop-types";

const ViewCounter = ({ slug, className }) => {
  const [views, setViews] = useState(0);

  // Device detection utility
  const getDeviceInfo = () => {
    const userAgent = navigator.userAgent;
    let deviceType = 'desktop';
    let browser = 'Unknown';
    let os = 'Unknown';

    // Detect device type
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent)) {
      deviceType = 'mobile';
    } else if (/iPad|Android/.test(userAgent)) {
      deviceType = 'tablet';
    }

    // Detect browser
    if (userAgent.includes('Chrome')) browser = 'Chrome';
    else if (userAgent.includes('Firefox')) browser = 'Firefox';
    else if (userAgent.includes('Safari')) browser = 'Safari';
    else if (userAgent.includes('Edge')) browser = 'Edge';
    else if (userAgent.includes('Opera')) browser = 'Opera';

    // Detect OS
    if (userAgent.includes('Windows')) os = 'Windows';
    else if (userAgent.includes('Mac')) os = 'macOS';
    else if (userAgent.includes('Linux')) os = 'Linux';
    else if (userAgent.includes('Android')) os = 'Android';
    else if (userAgent.includes('iOS')) os = 'iOS';

    return { deviceType, browser, os };
  };

  // Generate or get session ID
  const getSessionId = () => {
    let sessionId = sessionStorage.getItem('sessionId');
    if (!sessionId) {
      sessionId = 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
      sessionStorage.setItem('sessionId', sessionId);
    }
    return sessionId;
  };

  useEffect(() => {
    const incrementAndFetchViews = async () => {
      try {
        const { deviceType, browser, os } = getDeviceInfo();
        const sessionId = getSessionId();

        const response = await fetch(`/api/views/${slug}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userAgent: navigator.userAgent,
            referrer: document.referrer,
            sessionId: sessionId,
            deviceType: deviceType,
            browser: browser,
            os: os,
          }),
        });
        
        const data = await response.json();
        if (response.ok) {
          setViews(data.count);
        } else {
          console.error("Error incrementing views:", data.error);
        }
      } catch (error) {
        console.error("Error incrementing views:", error);
        // Maybe fetch the current count as a fallback?
        try {
          const response = await fetch(`/api/views/${slug}`);
          const data = await response.json();
          setViews(data.count);
        } catch (fetchError) {
          console.error("Error fetching views:", fetchError);
        }
      }
    };
    incrementAndFetchViews();
  }, [slug]);

  return <span className={className}>{views.toLocaleString()} views</span>;
};

ViewCounter.propTypes = {
  slug: PropTypes.string.isRequired,
  className: PropTypes.string,
};

export default ViewCounter;
