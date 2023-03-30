import {
    facebookLocations,
    linkedinLocations,
    tiktokLocations,
    facebookInterests,
    linkedinInterests,
    tiktokInterests
} from './fakeData';


const searchFacebookLocation = async (query) => {
    return facebookLocations.filter(
        element => {
            let text = `${element.name}, ${element.region}, ${element.country_name}`;
            return text.toLowerCase().search(query.toLowerCase()) > -1;
        }
    );
}


const searchFacebookInterest = async (query) => {
    return facebookInterests.filter(
        element => {
            return element.document.name.toLowerCase().search(query.toLowerCase()) > -1;
        }
    );
}


const searchLinkedinLocation = async (query) => {
    return linkedinLocations.filter(
        element => {
            return element.name.toLowerCase().search(query.toLowerCase()) > -1;
        }
    );
}


const searchLinkedinInterest = async (query) => {
    return linkedinInterests.filter(
        element => {
            return element.name.toLowerCase().search(query.toLowerCase()) > -1;
        }
    );
}


const searchTiktokLocation = async (query) => {
    return tiktokLocations.filter(
        element => {
            let text = `${element.document.name}, ${element.document.region_code}`
            return text.toLowerCase().search(query.toLowerCase()) > -1;
        }
    );
}


const searchTiktokInterest = async (query) => {
    return tiktokInterests.filter(
        element => {
            let text = element.document.interest_category_name
            return text.toLowerCase().search(query.toLowerCase()) > -1;
        }
    );
}


const searchService = {
    searchFacebookLocation,
    searchFacebookInterest,
    searchLinkedinLocation,
    searchLinkedinInterest,
    searchTiktokLocation,
    searchTiktokInterest
}

export default searchService;