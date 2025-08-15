"use client";

import { useEffect, useState } from "react";
import PropTypes from "prop-types";

const ViewCounter = ({ slug, className }) => {
  const [views, setViews] = useState(0);

  useEffect(() => {
    const incrementAndFetchViews = async () => {
      try {
        const response = await fetch(`/api/views/${slug}`, {
          method: "POST",
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
