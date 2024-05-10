import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import RateBar from "../../RateBar";
import RateBarProfile from "../../RateBarprofile";

function SidebarCustomer({ selectedIndex, reload }) {
  const navigate = useNavigate();
  const [company, setcompany] = useState({});

  function navigateTo(path) {
    navigate(path);
  }

  function loadData() {
    const url = process.env.REACT_APP_BASE_URL + "/job/company";

    const headers = new Headers({
      "Content-Type": "application/json",
    });

    const fetchOptions = {
      method: "GET",
      headers: headers,
    };

    // Making the fetch call
    fetch(url, fetchOptions)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.statusCode != 200) {
          return;
        }

        if (data.statusCode == 200) {
          console.log(data);
          setcompany(data.data ?? {});
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  useEffect(() => {
    loadData();
  }, [reload]);

  return (
    <div className="sidebar">
      <div className="company-container">
        <div className="company-img">
          <img src="/images/company.jpeg" alt="" />
        </div>
        <p className="company-name ">{company?.companyName}</p>
        <div className="">
          <RateBarProfile
            rating={company?.rating??0}
            setRating={() => {}}
          ></RateBarProfile>
        </div>

        <p className="feedback-total">Feedbacks : ( {company?.feedbackCount} )</p>
      </div>

      <div
        className={`sidebar-item  ${selectedIndex == 1 && "active"}`}
        onClick={() => navigateTo("/customer/home")}
      >
        My Jobs
      </div>

      <div
        className={`sidebar-item ${selectedIndex == 2 && "active"}`}
        onClick={() => navigateTo("/dashboard/profile")}
      >
        Profile
      </div>
    </div>
  );
}

export default SidebarCustomer;
