import { useState } from 'react';
import { Rating } from 'react-simple-star-rating'

export default function RatingBox({ store }) {
  var store_rating = 0;
  var total_ratings = 0;
  if (store.rating.length > 0) {
    store_rating = ((5 * store.rating[0].five + 4 * store.rating[0].four + 3 * store.rating[0].three + 2 * store.rating[0].two + 1 * store.rating[0].one) / (store.rating[0].five + store.rating[0].four + store.rating[0].three + store.rating[0].two + store.rating[0].one)).toFixed(1)
    total_ratings = store.rating[0].five + store.rating[0].four + store.rating[0].three + store.rating[0].two + store.rating[0].one
  }
  const [rating, setRating] = useState(store_rating)
  const [totalRatings, setTotalRatings] = useState(total_ratings)
  const [modalOpen, setModalOpen] = useState(false);

  if (process.browser)
    var user_rating = localStorage.getItem(store.id + "_rating") || 0
  else
    var user_rating = 0;

  //console.log("r",user_rating)
  const [userRating, setUserRating] = useState(user_rating)
  const [rateAlready, setRateAlready] = useState(user_rating == 0 ? false : true)

  // Catch Rating value
  const handleRating = (rate) => {
    setUserRating(rate)
  }

  const handleSubmit = async () => {
    if (userRating == 0) {
      alert("Please give rating first!")
      return false;
    }
    if (store.rating.length == 0) {
      setRating(userRating)
      setTotalRatings(1)
    } else {
      switch (userRating) {
        case 1:
          setTotalRatings(totalRatings + 1);
          setUserRating(((5 * store.rating[0].five + 4 * store.rating[0].four + 3 * store.rating[0].three + 2 * store.rating[0].two + 1 * (store.rating[0].one + 1)) / (store.rating[0].five + store.rating[0].four + store.rating[0].three + store.rating[0].two + store.rating[0].one + 1)).toFixed(1))
          break;
        case 2:
          setTotalRatings(totalRatings + 1);
          setUserRating(((5 * store.rating[0].five + 4 * store.rating[0].four + 3 * store.rating[0].three + 2 * (store.rating[0].two + 1) + 1 * store.rating[0].one) / (store.rating[0].five + store.rating[0].four + store.rating[0].three + store.rating[0].two + store.rating[0].one + 1)).toFixed(1))
          break;
        case 3:
          setTotalRatings(totalRatings + 1);
          setUserRating(((5 * store.rating[0].five + 4 * store.rating[0].four + 3 * (store.rating[0].three + 1) + 2 * store.rating[0].two + 1 * store.rating[0].one) / (store.rating[0].five + store.rating[0].four + store.rating[0].three + store.rating[0].two + store.rating[0].one + 1)).toFixed(1))
          break;
        case 4:
          setTotalRatings(totalRatings + 1);
          setUserRating(((5 * store.rating[0].five + 4 * (store.rating[0].four + 1) + 3 * store.rating[0].three + 2 * store.rating[0].two + 1 * store.rating[0].one) / (store.rating[0].five + store.rating[0].four + store.rating[0].three + store.rating[0].two + store.rating[0].one + 1)).toFixed(1))
          break;
        case 5:
          setTotalRatings(totalRatings + 1);
          setUserRating(((5 * (store.rating[0].five + 1) + 4 * store.rating[0].four + 3 * store.rating[0].three + 2 * store.rating[0].two + 1 * store.rating[0].one) / (store.rating[0].five + store.rating[0].four + store.rating[0].three + store.rating[0].two + store.rating[0].one + 1)).toFixed(1))
          break;

      }
    }
    try {
      //    console.log("store_id", store.id)
      const res = await fetch('/api/rating', {
        method: 'POST',
        body: JSON.stringify({ "rating": { "itemId": store.id, "values": [userRating] } }),
        headers: {
          'content-type': 'application/json'
        }
      })
      //   console.log(res)
      if (res.ok) {
        //  console.log("Yeai!")
      } else {
        //  console.log("Oops! Something is wrong.")
      }
    } catch (error) {
      console.log(error)
    }
    let modal = bootstrap.Modal.getInstance(document.getElementById('giveRating'));
    modal.hide();
    setModalOpen(false);
    localStorage.setItem(store.id + "_rating", userRating)
    setRateAlready(true)
  }

  const openRatingModal = async () => {
    await setModalOpen(true);
    new bootstrap.Modal(document.getElementById('giveRating')).show();
  };

  return (
    <>
      <div className="stars" onClick={async (e) => {
        console.log("test"); await setModalOpen(true);
        let modal = new bootstrap.Modal(document.getElementById('giveRating'));
        modal.show();
      }}>

        <Rating
          readonly={true}
          size={20}
          initialValue={rating}
          transition={true}
          allowFraction={true}

        />
      </div>

      <div className="ratings">
       
      </div>
      {(modalOpen) &&
        <div
          className="modal fade"
          id="giveRating"
          tabIndex={-1}
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content" >
              <div className="modal-header" style={{ justifyContent: "space-between" }}>
                <h5 className="modal-title" id="exampleModalLabel">
                  {rateAlready == true ? "Thanks For your Rating!!!" : `Rate ${store.title}`}
                </h5>
                <button
                  type="button"
                  className="btn btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  onClick={() => { setModalOpen(false); (rateAlready !== true && setUserRating(0)) }}

                />
              </div>
              <div className="modal-body text-center">
                <Rating
                  readonly={(rateAlready == true ? true : false)}
                  onClick={handleRating}
                  initialValue={userRating}
                  transition={true}
                  allowFraction={false}

                />
                <div class="storeBtn">
                  {rateAlready !== true &&
                    <a href="javascript:void(0)" onClick={() => handleSubmit()}>Submit</a>
                  }
                  <a href="javascript:void(0)" className='dismissBtn' data-bs-dismiss="modal"
                    aria-label="Close"
                    onClick={() => { setModalOpen(false); (rateAlready !== true && setUserRating(0)) }}> Cancel</a>
                </div>
              </div>
              <div className="modal-footer"></div>
            </div>
          </div>
        </div>
      }
    </>
  )

}
