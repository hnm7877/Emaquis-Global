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
    </React.Fragment>
  );
};
