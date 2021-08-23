import axios from "axios";

export default async function globalFetch(url, authentication, data) {
    if (authentication) {
        await axios.post(url, data, {
            headers: {
                'Content-Type': 'application/json',
                'userauth': authentication
            },
        })
    }
}
