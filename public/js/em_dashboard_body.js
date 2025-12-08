const EmDashboardVenteTables = window.EmDashboardVenteTables;

const EmDashboardBody = () => {
  return (
    <React.Fragment>
      <div className="row">
        {EmDashboardVenteTables ? <EmDashboardVenteTables /> : null}
      </div>
      <div className="row">
        <EmDashboardStocks />
        <EmDashboardEmployes />
      </div>
      <style>{`
        .row {
          display: flex;
          flex-wrap: wrap;
          margin-right: -15px;
          margin-left: -15px;
          align-items: flex-start;
        }
        .row > div[class*="col-"] {
          position: relative;
          width: 100%;
          padding-right: 15px;
          padding-left: 15px;
        }
        .stocks-card {
          display: flex;
          flex-direction: column;
          height: 100%;
        }
        .stocks-card .white_card_body {
          flex: 1;
          display: flex;
          flex-direction: column;
        }
        .row > div[class*="col-xl-9"],
        .row > div[class*="col-xl-3"] {
          display: flex;
          flex-direction: column;
        }
        @media (min-width: 992px) {
          .row > div[class*="col-lg-8"],
          .row > div[class*="col-lg-4"] {
            display: flex;
            flex-direction: column;
          }
        }
        @media (min-width: 768px) and (max-width: 991px) {
          .row > div[class*="col-md-7"],
          .row > div[class*="col-md-5"] {
            display: flex;
            flex-direction: column;
          }
          .row > div[class*="col-md-7"] {
            flex: 0 0 58.333333%;
            max-width: 58.333333%;
          }
          .row > div[class*="col-md-5"] {
            flex: 0 0 41.666667%;
            max-width: 41.666667%;
          }
        }
        @media (min-width: 992px) and (max-width: 1199px) {
          .row > div[class*="col-lg-8"] {
            flex: 0 0 66.666667%;
            max-width: 66.666667%;
          }
          .row > div[class*="col-lg-4"] {
            flex: 0 0 33.333333%;
            max-width: 33.333333%;
          }
        }
        @media (max-width: 992px) {
          .row > div[class*="col-"] {
            margin-bottom: 1.5rem;
          }
        }
        @media (max-width: 768px) {
          .row > div[class*="col-"] {
            margin-bottom: 1rem;
          }
          .row > div[class*="col-sm-12"] {
            width: 100%;
            flex: 0 0 100%;
            max-width: 100%;
          }
        }
      `}</style>
    </React.Fragment>
  );
};
