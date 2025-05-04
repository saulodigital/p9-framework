import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";

const ReassessmentBanner: React.FC = () => {
  const { data: session } = useSession();
  const [due, setDue] = useState(false);

  useEffect(() => {
    if (!session) return;
    fetch("/api/user/last-assessed")
      .then((res) => res.json())
      .then((data) => setDue(data.due))
      .catch((err) =>
        console.error("Failed to fetch reassessment status:", err)
      );
  }, [session]);

  if (!session || !due) {
    return null;
  }

  return (
    <div className="bg-yellow-100 p-4 rounded mb-4 text-center">
      <p>
        It’s been a while since your last assessment.{" "}
        <Link href="/questionnaire">
          <a className="underline font-semibold">
            Re-take the P9 Assessment
          </a>
        </Link>{" "}
        to keep your profile up to date.
      </p>
    </div>
  );
};

export default ReassessmentBanner;
