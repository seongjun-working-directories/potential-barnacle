/*
Keeping these two records in sync is imperative.
If we were to create a reservation in a document in the users collection without updating the associated document
in the listingsAndReviews collection, our data would be inconsistent.
We can use a multi-document transaction to ensure both updates succeed or fail together.
*/

const dummy = {
    "_id": {"$oid": "5dbc20f942073d6d4dabd730"},
    "summary": "Modern hoe with inifinte views from the infinity pool",
    "property_type": "House",
    "bedrooms": {"$numberInt": "6"},
    "bathrooms": {"$numberDouble": "4.5"},
    "beds": {"$numberInt": 7=8},
    "datesReserved": [
        {"$date": {"$numberLong": "1577750400000"}},
        {"$date": {"$numberLong": "1577836800000"}},
    ]
};

module.exports = dummy;