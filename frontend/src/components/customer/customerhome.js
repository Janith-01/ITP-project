import React, { useState } from "react";
import { useUser } from "../provider/userprovider.js";
import "../component.css";
import Sidebar from "../dashboard/sidebar/sidebar.js";
import RateBar from "../RateBar.js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SidebarCustomer from "../dashboard/sidebar/sidebarcustomer.js";

var joblist = [
  {
    id: 1,
    date: "2024-04-05",
    description: "adskhdkjahskda",
    status: "Pending",
  },
  {
    id: 2,
    date: "2024-04-06",
    description: "adskhdkjahskda",
    status: "Complete",
  },
  {
    id: 3,
    date: "2024-04-07",
    description: "adskhdkjahskda",
    status: "Pending",
  },
  {
    id: 4,
    date: "2024-04-08",
    description: "adskhdkjahskda",
    status: "Complete",
  },
  {
    id: 5,
    date: "2024-04-09",
    description: "adskhdkjahskda",
    status: "Pending",
  },
  {
    id: 6,
    date: "2024-04-13",
    description: "adskhdkjahskda",
    status: "Pending",
  },
  {
    id: 7,
    date: "2024-04-15",
    description: "adskhdkjahskda",
    status: "Pending",
  },
];

function Customerhome() {
  const { logUser, loginUser } = useUser();
  const [jobList, setjobList] = useState(joblist);
  const [rating, setrating] = useState(0);
  const [feedback, setfeedback] = useState("");
  const [showmodel, setshowmodel] = useState(false);
  const [reload, setreload] = useState(false);

  function addFeedback() {
    const data = {
      feedback: feedback,
      rating: rating,
      jobId: "1",
    };

    const url = process.env.REACT_APP_BASE_URL + "/job/addfeedback";

    const headers = new Headers({
      "Content-Type": "application/json",
      Authorization: "Bearer " + logUser.token,
      //   "Custom-Header": "Value",
    });

    const fetchOptions = {
      method: "POST",
      headers: headers,
      body: JSON.stringify(data),
    };

    // Making the fetch call
    fetch(url, fetchOptions)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        if (data.error != null) {
          toast.error(data.error, {
            position: "bottom-right",
          });
          console.log(data.error);
        }
        if (data.statusCode != 200 && data.error == null) {
          toast.error(data.error, {
            position: "bottom-right",
          });
          return;
        }

        if (data.statusCode == 200) {
          console.log(data);
          toast.success("Feedback Added Success!", {
            position: "bottom-right",
          });
          setfeedback("");
          setrating(0);
          setshowmodel(false);

          setreload(!reload);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  return (
    <div>
      <div className="header"></div>
      <SidebarCustomer selectedIndex={1} reload={reload} />
      <div className="content flex justify-center items-center">
        <div className="w-full">
          <div className="w-80 flex items-center justify-center"></div>
          <div className="w-full flex">
            <table className="ubuntu-mono-regular ">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Job Date</th>
                  <th className="lastname-column">Description</th>
                  <th>Status</th>
                  <th className="table-btn-container-extend text-center">
                    View
                  </th>
                </tr>
              </thead>
              <tbody>
                {jobList.length == 0 && (
                  <tr>
                    <td colSpan={7} className="text-center">
                      No Record Found
                    </td>
                  </tr>
                )}
                {jobList.map((job, index) => {
                  return (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{job.date}</td>
                      <td>{job.description}</td>
                      <td>{job.status}</td>
                      <td className="w-fit">
                        {job.status == "Complete" ? (
                          <button
                            className="table-btn"
                            onClick={() => {
                              setshowmodel(true);
                            }}
                          >
                            Add Feedback
                          </button>
                        ) : (
                          <button className="table-btn" onClick={() => {}}>
                            View
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {showmodel && (
        <div id="myModal" className="modal">
          <div className="modal-content-feedback">
            <span
              className="close-button"
              onClick={() => {
                setshowmodel(false);
              }}
            >
              ×
            </span>
            <div className="flex justify-start items-center">
              <div className="flex justify-start items-start">
                <h2>Add Feedback </h2>
              </div>
            </div>

            <div className="flex w-full">
              <div className="w-full">
                <label htmlFor="" className="formlabel">
                  Feedback
                </label>
                <div className=" feedback-inputwrapper">
                  <textarea
                    rows={4}
                    type="text"
                    className=" font-medium text-start feedback-textarea"
                    value={feedback}
                    onChange={({ target }) => {
                      setfeedback(target.value);
                    }}
                  />
                </div>
                <div className="mt-30">
                  <RateBar rating={rating} setRating={setrating} />
                </div>

                <div className="flex mt-30 justify-center items-center">
                  <button
                    className="btn-primary font-medium mt-10"
                    onClick={() => {
                      addFeedback();
                    }}
                  >
                    Add Feedback
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <ToastContainer />
    </div>
  );
}

export default Customerhome;
