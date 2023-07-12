import React from "react";

export default function Footer() {
  return (
    <footer >
      <div className="container-l border rounded p-3 mx-2 ">
        <div className="accordion" id="accordionExample">
          <div className="accordion-item">
            <h2 className="accordion-header">
              <button
                className="accordion-button"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseOne"
                aria-expanded="true"
                aria-controls="collapseOne"
              >
                Why WatchNowTV...?
              </button>
            </h2>
            <div
              id="collapseOne"
              className="accordion-collapse collapse show"
              data-bs-parent="#accordionExample"
            >
              <div className="accordion-body">...</div>
            </div>
          </div>
        </div>
        <div className="container-fluid border my-2 py-2 px-3 rounded">&copy; sachin chauhan</div>
      </div>
    </footer>
  );
}
