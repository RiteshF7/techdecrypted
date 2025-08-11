"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/src/utils/supabase";
import PropTypes from "prop-types";

export default function ViewCounter({ slug, noCount = false }) {
  const [views, setViews] = useState(0);

  useEffect(() => {
    const incrementView = async () => {
      try {
        const { error } = await supabase.rpc("increment", {
          slug_text: slug,
        });
        if (error) {
          console.error("Error incrementing view count:", error);
        }
      } catch (error) {
        console.error(
          "An error occurred while incrementing the view count:",
          error
        );
      }
    };

    if (!noCount) {
      incrementView();
    }
  }, [slug, noCount]);

  useEffect(() => {
    const getViews = async () => {
      try {
        const { data, error } = await supabase
          .from("views")
          .select("count")
          .eq("slug", slug)
          .single();

        if (error && error.details.includes("0 rows")) {
          setViews(1);
        } else if (error) {
          console.error("Error getting view count:", error);
        } else {
          setViews(data.count);
        }
      } catch (error) {
        console.error(
          "An error occurred while getting the view count:",
          error
        );
      }
    };

    getViews();
  }, [slug]);

  if (views === 0) {
    return null;
  }

  return <span>{views.toLocaleString()} views</span>;
}

ViewCounter.propTypes = {
  slug: PropTypes.string.isRequired,
  noCount: PropTypes.bool,
};
