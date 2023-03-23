/*
When browsing Airbnb listings, users need to know
if the listing is already booked for their travel dates.
As a result we want to store the dates the listing is reserved
in the listingsAndReviews collection.
*/

// dummy data
const dummy = {
    "_id": {"$oid":"5dd589544f549efc1b0320a5"},
    "email": "leslie@example.com",
    "name": "Leslie Yepp",
    "reservations": [
        {
            "name": "Infinite Views",
            "dates": [
                {"$date": {"$numberLong": "1577750400000"}},
                {"$date": {"$numberLong": "1577836800000"}},
            ],
            "pricePerNight": {"$numberInt": "180"},
            "specialRequests": "Late checkout",
            "breakfastIncluded": true
        },
        {
            "name": "Lovely Loft",
            "dates": [
                {"$date": {"$numberLong": "1585958400000"}}
            ],
            "pricePerNight": {"$numberInt":"210"},
            "breakfastIncluded": false
        }
    ]
};

module.exports = dummy;