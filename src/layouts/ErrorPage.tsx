import { useRouteError } from "react-router-dom";

interface RouteError {
  statusText?: string;
  message?: string;
}

export default function ErrorPage() {
  const error = useRouteError() as RouteError;

  const errorMsg = error?.statusText === "Not Found"
    ? "The page you are looking for might have been removed, had its name changed, or is temporarily unavailable."
    : error?.message || "An unexpected error occurred.";

  return (
    <section className="space-ptb">
      <div className="container">
        <div className="row align-items-center justify-content-center">
          <div className="col-lg-6 col-md-6 mt-4 mt-sm-0 text-center">
            <div id="notfound">
              <div className="notfound">
                <svg
                  id="fd59ce54-f850-4dfc-bc34-dd7d379d600e"
                  data-name="Layer 1"
                  xmlns="http://www.w3.org/2000/svg"
                  width="auto"
                  height="auto"
                  viewBox="0 0 1074.392 584.231"
                >
                  <title>page not found</title>
                  <path
                    d="M583.47969,324.89424c-85.94407,0-147.651,55.13938-147.651,183.79791,0,145.813,61.70691,184.41057,147.651,184.41057s151.327-42.27352,151.327-184.41057C734.80664,356.75255,669.42376,324.89424,583.47969,324.89424Zm.56495,319.80837c-59.52686,0-90.62592-34.92288-90.62592-135.9163,0-89.11185,32.37209-136.10461,91.899-136.10461s91.899,30.86774,91.899,136.10461C677.21663,607.23367,643.5715,644.70261,584.04464,644.70261Z"
                    transform="translate(-63.054 -157.8845)"
                    fill="#2f2e41"
                  />
                  <path
                    d="M384.36531,591.40121H348.831V486.76183A20.95585,20.95585,0,0,0,327.87517,465.806h-8.32638a20.95585,20.95585,0,0,0-20.95586,20.95585V591.40121H198.36285a11.96327,11.96327,0,0,1-10.57763-17.552l106.0824-200.78034A20.95585,20.95585,0,0,0,284.28724,344.33l-6.26231-2.9572a20.95585,20.95585,0,0,0-27.4293,9.07005L121.21416,592.4754a28.41578,28.41578,0,0,0-3.35584,13.39612v0a28.41583,28.41583,0,0,0,28.41584,28.41583H298.59293v66.16727a25.119,25.119,0,0,0,25.119,25.119h.00005a25.119,25.119,0,0,0,25.119-25.119V634.28739h35.53428a21.44307,21.44307,0,0,0,21.44307-21.44307v0A21.44307,21.44307,0,0,0,384.36531,591.40121Z"
                    transform="translate(-63.054 -157.8845)"
                    fill="#a61d37"
                  />
                  <path
                    d="M1042.36183,591.40121h-35.53428V486.76183A20.95585,20.95585,0,0,0,985.87169,465.806h-8.32638a20.95585,20.95585,0,0,0-20.95586,20.95585V591.40121H856.35937a11.96326,11.96326,0,0,1-10.57763-17.552L951.86413,373.06891A20.95586,20.95586,0,0,0,942.28376,344.33l-6.26231-2.9572a20.95586,20.95586,0,0,0-27.42931,9.07005L779.21068,592.4754a28.41578,28.41578,0,0,0-3.35584,13.39612v0a28.41583,28.41583,0,0,0,28.41583,28.41583H956.58945v66.16727a25.119,25.119,0,0,0,25.119,25.119h0a25.119,25.119,0,0,0,25.119-25.119V634.28739h35.53428a21.44307,21.44307,0,0,0,21.44307-21.44307v0A21.44307,21.44307,0,0,0,1042.36183,591.40121Z"
                    transform="translate(-63.054 -157.8845)"
                    fill="#a61d37"
                  />
                </svg>
                <div className="notfound-404">
                  <h2>Oops - no one seems to be home.</h2>
                </div>
                <p>{errorMsg}</p>
                <a className="btn btn-primary" href="/">Go To Homepage</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
