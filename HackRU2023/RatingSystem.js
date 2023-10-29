class RatingSystem {

    constructor() {
        this.organizationRatings() = {}; // store organization ratings
    }

    // where volunteers rate organizations
    rateOrganization(organizationID, rating) {
        if (!this.organizationRatings[organizationID]) {
            this.organizationRatings[organizationID] = [];
        }
        this.organizationRatings[organizationID].push(rating);
    }

    // calculates the average rating for an organization
    calculateAvgRating(organizationID) {
        const ratings = this.organizationRatings[organizationID]; // retrieves array of organization ratings using ID & stores in variable 'ratings'
        const totalRatings = 0;
        if (ratings != null && ratings.length > 0) {
            for (i = 0; i < ratings.length; i++) {
                totalRatings += ratings[i];
            }
            return totalRatings / ratings.length;
        }
        return 0;
    }

}